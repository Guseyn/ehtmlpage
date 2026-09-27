import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import ajax from '#ehtml/ajax.js'
import unwrappedChildrenOfParent from '#ehtml/unwrappedChildrenOfParent.js'
import evaluatedValueWithParamsFromState from '#ehtml/evaluatedValueWithParamsFromState.js'
import evaluatedStringWithParamsFromState from '#ehtml/evaluatedStringWithParamsFromState.js'
import evaluateActionsOnProgress from '#ehtml/evaluateActionsOnProgress.js'
import scrollToHash from '#ehtml/actions/scrollToHash.js'
import * as showdown from '#ehtml/showdown/showdown.js'

export default class EMarkdown extends HTMLElement {
  constructor() {
    super()
    this.ehtmlActivated = false
  }

  connectedCallback() {
    this.addEventListener(
      'ehtml:activated',
      this.#onEHTMLActivated,
      { once: true }
    )
  }

  #onEHTMLActivated() {
    if (this.ehtmlActivated) {
      return
    }
    this.ehtmlActivated = true
    this.#run()
  }

  #run() {
    const state = getNodeScopedState(this)
    const internalState = this.internalState || {}

    // --- Showdown extensions ---
    // Extensions are opt-in: import the extension module yourself and pass it
    // through data-internal-state, e.g.
    //
    //   <script type="module">
    //     import katexExtension from '#ehtml/showdown/extensions/katex.js'
    //     window.katexExtension = katexExtension
    //   </script>
    //
    //   <e-markdown data-internal-state="${{
    //     extensions: [ katexExtension({ throwOnError: false }) ]
    //   }}"></e-markdown>
    //
    // The import must run before '#ehtml/main' so the global is assigned by the
    // time data-internal-state is evaluated.
    const extensions = internalState.extensions
      ? (Array.isArray(internalState.extensions) ? internalState.extensions : [internalState.extensions])
      : []

    // Markdown may come from internal state instead of the network.
    if (internalState.markdown !== undefined) {
      this.renderMarkdown(internalState.markdown, extensions)
      return
    }

    // --- Progress start ---
    if (this.hasAttribute('data-actions-on-progress-start')) {
      evaluateActionsOnProgress(
        this.getAttribute('data-actions-on-progress-start'),
        this,
        state
      )
    }

    if (!this.hasAttribute('data-src')) {
      throw new Error('e-markdown must have "data-src" attribute')
    }

    // --- AJAX request ---
    const url = encodeURI(
      evaluatedStringWithParamsFromState(
        this.getAttribute('data-src'),
        state,
        this
      )
    )

    const headers = evaluatedValueWithParamsFromState(
      this.getAttribute('data-request-headers') || '${{}}',
      state,
      this
    )

    ajax(
      {
        url: url,
        method: 'GET',
        headers: headers
      },
      undefined,
      (err, resObj) => {
        if (err) {
          throw err
        }

        const markdown = resObj.body

        this.renderMarkdown(markdown, extensions)

        // --- Progress end ---
        if (this.hasAttribute('data-actions-on-progress-end')) {
          evaluateActionsOnProgress(
            this.getAttribute('data-actions-on-progress-end'),
            this,
            state
          )
        }

        scrollToHash()
      }
    )
  }

  renderMarkdown(markdown, extensions) {
    // --- Render markdown ---
    if (showdown) {
      showdown.setFlavor('github')
      const converter = new showdown.Converter({
        tables: true,
        tasklists: true,
        simpleLineBreaks: true,
        emoji: true,
        moreStyling: true,
        github: true,
        extensions: extensions
      })
      this.innerHTML = converter.makeHtml(markdown)
    } else {
      this.innerHTML = markdown
    }

    // Remove <e-markdown> wrapper
    unwrappedChildrenOfParent(this)
  }
}

customElements.define('e-markdown', EMarkdown)

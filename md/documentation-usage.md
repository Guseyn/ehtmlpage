# Usage
<p></p>

Since **v2.0.0** EHTML moved to [**\#NoBuild**](https://world.hey.com/dhh/you-can-t-get-faster-than-no-build-7a44131c). We believe, it will bring more consistency into our ecosystem and will improve the quality of the software itself drastically. It will also educate young software developers, because they can see real code that's running in their browsers.

**EHTML** is still very easy to include in your project. 

1) Pull EHTML from GitHub:

```bash
git clone git@github.com:Guseyn/EHTML.git
```

2) Copy EHTML src folder into your folder with JavaScript code:

```bash
cd your-project-folder
rm -rf js/ehtml && cp -r ../EHTML/src js/ehtml
```

3) Add [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) in your HTML file in `<head>` element:

</details><details><summary><b>&lt;script type="importmap"&gt;</b></summary>
```html
<script type="importmap">
{
  "imports": {
    "ehtml/E/e-for-each-template": "/js/ehtml/E/e-for-each-template.js",
    "ehtml/E/e-form-dynamic-value": "/js/ehtml/E/e-form-dynamic-value.js",
    "ehtml/E/e-form": "/js/ehtml/E/e-form.js",
    "ehtml/E/e-github-oauth-button": "/js/ehtml/E/e-github-oauth-button.js",
    "ehtml/E/e-html": "/js/ehtml/E/e-html.js",
    "ehtml/E/e-if-template": "/js/ehtml/E/e-if-template.js",
    "ehtml/E/e-json-template": "/js/ehtml/E/e-json-template.js",
    "ehtml/E/e-json-view": "/js/ehtml/E/e-json-view.js",
    "ehtml/E/e-json": "/js/ehtml/E/e-json.js",
    "ehtml/E/e-local-storage-value": "/js/ehtml/E/e-local-storage-value.js",
    "ehtml/E/e-markdown": "/js/ehtml/E/e-markdown.js",
    "ehtml/E/e-page-with-url-template": "/js/ehtml/E/e-page-with-url-template.js",
    "ehtml/E/e-reusable-template": "/js/ehtml/E/e-reusable-template.js",
    "ehtml/E/e-select": "/js/ehtml/E/e-select.js",
    "ehtml/E/e-session-storage-value": "/js/ehtml/E/e-session-storage-value.js",
    "ehtml/E/e-session-value": "/js/ehtml/E/e-session-value.js",
    "ehtml/E/e-svg": "/js/ehtml/E/e-svg.js",
    "ehtml/E/e-wrapper-template": "/js/ehtml/E/e-wrapper-template.js",
    "ehtml/E/e-ws-template": "/js/ehtml/E/e-ws-template.js",
    "ehtml/E/exports": "/js/ehtml/E/exports.js",
    "ehtml/actions/addHTMLInto": "/js/ehtml/actions/addHTMLInto.js",
    "ehtml/actions/addTextInto": "/js/ehtml/actions/addTextInto.js",
    "ehtml/actions/changeValueOf": "/js/ehtml/actions/changeValueOf.js",
    "ehtml/actions/disableElms": "/js/ehtml/actions/disableElms.js",
    "ehtml/actions/enableElms": "/js/ehtml/actions/enableElms.js",
    "ehtml/actions/hideElms": "/js/ehtml/actions/hideElms.js",
    "ehtml/actions/insertHTMLInto": "/js/ehtml/actions/insertHTMLInto.js",
    "ehtml/actions/insertTextInto": "/js/ehtml/actions/insertTextInto.js",
    "ehtml/actions/loadAndAddHTMLInto": "/js/ehtml/actions/loadAndAddHTMLInto.js",
    "ehtml/actions/loadAndAddTextInto": "/js/ehtml/actions/loadAndAddTextInto.js",
    "ehtml/actions/loadHTMLInto": "/js/ehtml/actions/loadHTMLInto.js",
    "ehtml/actions/loadTextInto": "/js/ehtml/actions/loadTextInto.js",
    "ehtml/actions/mapToTemplate": "/js/ehtml/actions/mapToTemplate.js",
    "ehtml/actions/redirect": "/js/ehtml/actions/redirect.js",
    "ehtml/actions/releaseTemplate": "/js/ehtml/actions/releaseTemplate.js",
    "ehtml/actions/reload": "/js/ehtml/actions/reload.js",
    "ehtml/actions/removeElms": "/js/ehtml/actions/removeElms.js",
    "ehtml/actions/scrollIntoViewOf": "/js/ehtml/actions/scrollIntoViewOf.js",
    "ehtml/actions/scrollToHash": "/js/ehtml/actions/scrollToHash.js",
    "ehtml/actions/showElms": "/js/ehtml/actions/showElms.js",
    "ehtml/actions/toggleElms": "/js/ehtml/actions/toggleElms.js",
    "ehtml/actions/updateAttributeOf": "/js/ehtml/actions/updateAttributeOf.js",
    "ehtml/actions/exports": "/js/ehtml/actions/exports.js",
    "ehtml/third-party/katex/auto-render": "/js/ehtml/third-party/katex/auto-render.js",
    "ehtml/third-party/katex/katex": "/js/ehtml/third-party/katex/katex.min.js",
    "ehtml/third-party/showdown-katex/showdown-katex": "/js/ehtml/third-party/showdown-katex/showdown-katex.js",
    "ehtml/third-party/showdown-katex/asciimath-to-tex": "/js/ehtml/third-party/showdown-katex/asciimath-to-tex.min.js",
    "ehtml/third-party/he": "/js/ehtml/third-party/he.js",
    "ehtml/third-party/highlight": "/js/ehtml/third-party/highlight.min.js",
    "ehtml/third-party/json-pretty-html": "/js/ehtml/third-party/json-pretty-html.js",
    "ehtml/third-party/showdown-highlight": "/js/ehtml/third-party/showdown-highlight.js",
    "ehtml/third-party/showdown": "/js/ehtml/third-party/showdown.min.js",
    "ehtml/elm": "/js/ehtml/elm.js",
    "ehtml/elms": "/js/ehtml/elms.js",
    "ehtml/evaluateStringWithActionsOnCloseConnection": "/js/ehtml/evaluateStringWithActionsOnCloseConnection.js",
    "ehtml/evaluateStringWithActionsOnOpenConnection": "/js/ehtml/evaluateStringWithActionsOnOpenConnection.js",
    "ehtml/evaluateStringWithActionsOnProgress": "/js/ehtml/evaluateStringWithActionsOnProgress.js",
    "ehtml/evaluateStringWithActionsOnResponse": "/js/ehtml/evaluateStringWithActionsOnResponse.js",
    "ehtml/evaluatedStringWithParams": "/js/ehtml/evaluatedStringWithParams.js",
    "ehtml/evaluatedStringWithParamsFromState": "/js/ehtml/evaluatedStringWithParamsFromState.js",
    "ehtml/isTemplate": "/js/ehtml/isTemplate.js",
    "ehtml/isTemplateWithType": "/js/ehtml/isTemplateWithType.js",
    "ehtml/isTemplateWithTypeExclusively": "/js/ehtml/isTemplateWithTypeExclusively.js",
    "ehtml/nodeIsNotForEHTML": "/js/ehtml/nodeIsNotForEHTML.js",
    "ehtml/nodeName": "/js/ehtml/nodeName.js",
    "ehtml/observeNodeAttributes": "/js/ehtml/observeNodeAttributes.js",
    "ehtml/observeNodeWithItsChildNodes": "/js/ehtml/observeNodeWithItsChildNodes.js",
    "ehtml/registerShowdownExtension": "/js/ehtml/registerShowdownExtension.js",
    "ehtml/releaseTemplateWithItsContent": "/js/ehtml/releaseTemplateWithItsContent.js",
    "ehtml/responseFromAjaxRequest": "/js/ehtml/responseFromAjaxRequest.js",
    "ehtml/turnEhtmlMutationObserverOff": "/js/ehtml/turnEhtmlMutationObserverOff.js",
    "ehtml/turnEhtmlMutationObserverOn": "/js/ehtml/turnEhtmlMutationObserverOn.js",
    "ehtml/unwrappedChildrenOfParent": "/js/ehtml/unwrappedChildrenOfParent.js",
    "ehtml/main": "/js/ehtml/main.js"
  }
}
</script>
```
</details>

You can adjust import map according with how your server stores JavaScript code.

4) Add following `<script>` after import map:

```html
<script type="module">import "ehtml/main"</script>
```

Once a page is loaded, the script creates a `MutationObserver` to observe any changes in the Document Object Model (DOM) on the page. This allows **EHTML** to process elements and apply the necessary manipulations.

You can dynamically turn it on/off:

```js
// turn on
window.turnEhtmlMutationObserverOn(
  window.ehtmlMutationObserver
)
// turn off
window.turnEhtmlMutationObserverOff(
  window.ehtmlMutationObserver
)
```

You can disable some elements for **EHTML** by adding attribute `data-no-ehtml="true"`. It would improve performance, by reducing the number of elements that **EHTML** needs to observe.

# EHTML Bundles

You still can use EHTML bundles. There are two versions: [regular](https://github.com/Guseyn/EHTML/blob/master/dist/ehtml.min.js), and [light](https://github.com/Guseyn/EHTML/blob/master/dist/ehtml.light.min.js) version without extra features like code highlighting and LaTeX support in markdown files.

```html
<script type="module" src="/../js/ehtml.min.js"></script>
<script type="module" src="/../js/ehtml.light.min.js"></script>
```

As you can see, you must specify: `type="module"` now in `<script>` tag.

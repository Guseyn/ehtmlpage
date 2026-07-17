# Attributes Reference

Complete reference for EHTML attributes: how common attributes are evaluated during activation, and which attributes each element supports.

Contents
==============

- [Common attributes](#common-attributes)
- [Native `<template>`](#native-template)
- [`<e-html>`](#e-html)
- [`<e-markdown>`](#e-markdown)
- [`<e-svg>`](#e-svg)
- [`<e-json>`](#e-json)
- [`<e-json-view>`](#e-json-view)
- [`<template is="e-json-map">`](#template-ise-json-map)
- [`<template is="e-if">`](#template-ise-if)
- [`<template is="e-for-each">`](#template-ise-for-each)
- [`<template is="e-reusable">`](#template-ise-reusable)
- [`<template is="e-page-with-url">`](#template-ise-page-with-url)
- [`<template is="e-wrapper">`](#template-ise-wrapper)
- [`<template is="e-ws">`](#template-ise-ws)
- [`<template is="e-sse">`](#template-ise-sse)
- [`<form is="e-form">`](#form-ise-form)
- [`<e-form-object>`](#e-form-object)
- [`<e-form-array>`](#e-form-array)
- [`<e-form-dynamic-value>`](#e-form-dynamic-value)
- [`<e-local-storage-value>`](#e-local-storage-value)
- [`<e-session-storage-value>`](#e-session-storage-value)
- [`<select is="e-select">`](#select-ise-select)

# Common attributes

These attributes can appear on **any** HTML element. When EHTML activates a node, it walks every attribute once and decides how to handle each one.

## How evaluation works

1. **Expression detection** — An attribute is evaluated only if its value contains `${…}`. Attributes without `${…}` are left unchanged.
2. **Scoped state** — `${…}` expressions are evaluated against the state available in the current scope (for example, from `e-for-each` or when a template is released with data).
3. **Three outcomes** — Each attribute falls into one of three groups below: **ignored**, **special transform**, or **default** (evaluate and write back to the DOM).

## Ignored attributes

These are **not** evaluated during the common attribute pass. The element or action that owns them resolves them later, in its own scope and at the right time:

- **`data-actions-on-response`**
- **`data-actions-on-progress-start`**
- **`data-actions-on-progress-end`**
- **`data-condition-to-display`**
- **`data-list-to-iterate`**
- **`data-item-name`**
- **`data-bound-to`**
- **`data-cache-from`**
- **`data-request-headers`**
- **`data-request-url`**
- **`data-socket`**
- **`data-prepend-to`**
- **`data-append-to`**
- **`data-insert-into`**
- **`data-place-instead`**
- **`data-src`** — Ignored on tags that do **not** have a native `src` attribute. On src-capable tags (`audio`, `embed`, `iframe`, `img`, `input`, `script`, `source`, `track`, `video`, `midi-player`) it is processed as a special case (see below).
- **Native `on*` event attributes** — `onclick`, `onchange`, `onload`, etc.
- **Any name listed in `data-attributes-to-ignore`** — Comma-separated list on the same node.

## Special-case attributes

These are handled differently from a plain `${…}` evaluation — they update the DOM in a specific way and usually remove themselves afterward:

- **`data-enter-on-click`** — Adds keyboard activation: pressing a key triggers a click on the element.
- **`data-internal-state`** — Evaluates the expression and stores the result as internal state on the element (accessible to custom elements and elements like `<e-markdown>` that can render from it instead of fetching).
- **`data-text`** — Evaluates to a string, inserts it as the first text child of the element, removes the attribute.
- **`data-value`** — Evaluates to a string or number, sets the element's `value` property (numbers are coerced for `input[type="number"]`), removes the attribute.
- **`data-src`** — On src-capable tags only: evaluates, sets native `src`, removes `data-src`.
- **`data-inner-html`** — Evaluates, sets `innerHTML`, removes the attribute.
- **`data-disabled`** — On `input`, `select`, `textarea`, `button`: if the evaluated value is `'true'`, sets native `disabled`.
- **`data-checked`** — On `input[type="checkbox"]`: if `'true'`, sets `checked="checked"`, removes the attribute.
- **`disabled`** — If the evaluated value is `'false'`, removes native `disabled`.
- **`data-attributes-to-ignore`** — Comma-separated attribute names to exclude from processing on this node.

## Default behavior

**Any other attribute** whose value contains `${…}` is evaluated against scoped state and written back to the DOM with the same attribute name — for example `class`, `style`, `href`, `data-*` attributes not listed above, and so on. The `${…}` placeholders are replaced with their evaluated values; the attribute stays on the element.

Attributes without `${…}` that are not in the ignored or special-case lists are left as-is.

## Opt-out

- **`data-no-ehtml="true"`** — Skips EHTML activation for this node and all its descendants.

---

# Native `<template>`

Plain `<template>` elements (without `is`) support template release and placement.

- **`data-release-on-load`** — If present, auto-releases the template on activation. Requires `data-object-name`. The template is removed from the DOM after release (not reusable).
- **`data-object-name`** — State key used when releasing the template with data. Required with `data-release-on-load`.
- **`data-prepend-to`** — CSS selector (or `${…}` expression resolving to an element). Clones template content and prepends it into the target.
- **`data-append-to`** — Same as above, but appends cloned content.
- **`data-insert-into`** — Clears the target's `innerHTML`, then appends cloned content.
- **`data-place-instead`** — Replaces the target element with cloned template content.

If none of the placement attributes are set, content is inserted **before** the template on trigger.

---

# `<e-html>`

Fetches an HTML fragment and inserts it into the page.

- **`data-src`** *(required)* — GET URL for the HTML fragment. Supports `${…}`.
- **`data-request-headers`** — Request headers object expression. Default: `'${{}}'`.
- **`data-actions-on-progress-start`** — Actions to run before the fetch starts.
- **`data-actions-on-progress-end`** — Actions to run after the HTML is inserted and the element is unwrapped.

---

# `<e-markdown>`

Fetches markdown, converts it to HTML, and inserts it into the page.

- **`data-src`** *(required unless internal state is provided via `data-internal-state`)* — GET URL for the markdown source. Supports `${…}`.
- **`data-headers`** — Request headers object expression. Default: `'${{}}'`.
- **`data-apply-code-highlighting`** — Enables syntax highlighting for fenced code blocks.
- **`data-apply-latex`** — Enables KaTeX/LaTeX rendering via showdown-katex.
- **`data-actions-on-progress-start`** — Actions to run before the fetch starts.
- **`data-actions-on-progress-end`** — Actions to run after rendering completes.
- **`data-internal-state`** — *(common attribute)* If set, skips the fetch and renders markdown from the element's internal state.

---

# `<e-svg>`

Fetches SVG markup and inserts it into the page.

- **`data-src`** *(required)* — GET URL for the SVG file. Supports `${…}`.
- **`data-headers`** — Request headers object expression. Default: `'${{}}'`.
- **`data-actions-on-progress-start`** — Actions to run before the fetch starts.
- **`data-actions-on-progress-end`** — Actions to run after the SVG is inserted and the element is unwrapped.

---

# `<e-json>`

Fetches JSON (or receives it via WebSocket/SSE/cache) and runs response actions.

- **`data-src`** *(required for AJAX mode)* — GET URL. Supports `${…}`.
- **`data-socket`** — WebSocket mode: listen on a named WebSocket connection for incoming messages.
- **`data-event-source`** — SSE mode: listen on a named Server-Sent Events connection.
- **`data-event`** — SSE: specific event name to listen for (default: `onmessage`).
- **`data-cache-from`** — Skip network; evaluate expression to get a cached response object and run actions immediately.
- **`data-request-headers`** — GET request headers. Default: `'${{}}'`.
- **`data-actions-on-response`** — Actions to run when a response arrives (AJAX, socket, SSE, or cache).
- **`data-response-name`** — Variable name under which the response is passed to actions.
- **`data-actions-on-progress-start`** — Actions before an AJAX request starts.
- **`data-actions-on-progress-end`** — Actions after an AJAX response completes.
- **`data-progress-bar`** — CSS selector for a download `<progress>` element.
- **`data-ajax-icon`** — CSS selector for a loading icon shown during the request.
- **`data-do-not-run-on-activation`** — Do not fetch automatically when the element is activated.
- **`data-reusable`** — Keep the element in the DOM after response (do not unwrap children). Required with session cache (unless only-update mode).
- **`data-use-session-cache`** — Append a `sessionCacheKey` query param; manage keys in `localStorage`.
- **`data-only-update-session-cache-on-visibility-change`** — With session cache: refresh the cache key when the tab becomes visible, without re-fetching.

---

# `<e-json-view>`

Fetches JSON and pretty-prints it inside the element.

- **`data-src`** *(required)* — GET URL for JSON data. Supports `${…}`.
- **`data-headers`** — Request headers object expression. Default: `'{}'`.
- **`data-actions-on-progress-start`** — Actions before the fetch starts.
- **`data-actions-on-progress-end`** — Actions after the JSON is rendered.

---

# `<template is="e-json-map">`

Fetches JSON (or listens on a socket), then releases the template with the response as state.

- **`data-src`** *(required for AJAX mode)* — GET URL. Supports `${…}`.
- **`data-socket`** — Socket mode: incoming messages release the template with the message as state.
- **`data-request-headers`** — GET request headers. Default: `'${{}}'`.
- **`data-object-name`** *(required)* — State key for the response object when the template is released.
- **`data-ajax-icon`** — CSS selector for a loading icon.
- **`data-progress-bar`** — CSS selector for a download progress element.
- **`data-actions-on-progress-start`** — Actions before the AJAX fetch starts.
- **`data-actions-on-progress-end`** — Actions after the template is mapped.

Also supports template placement attributes: `data-prepend-to`, `data-append-to`, `data-insert-into`, `data-place-instead`.

---

# `<template is="e-if">`

Conditionally inserts template content based on an expression.

- **`data-condition-to-display`** *(required)* — Expression evaluated against scoped state. If truthy or `'true'`, template content is inserted; otherwise the template is removed.

---

# `<template is="e-for-each">`

Loops over an array and releases the template once per item.

- **`data-list-to-iterate`** *(required)* — Expression evaluating to an array.
- **`data-item-name`** *(required)* — State variable name for each item in the loop body.
- **`data-index-name`** — State variable for the 1-based index. Default: `'index'`.

---

# `<template is="e-reusable">`

Stays in the DOM and can be released repeatedly with new state.

- **`data-release-on-load`** — If `'true'`, auto-releases on activation.
- **`data-object-name`** — State key populated from internal state (or an empty object) on auto-release.
- **`data-prepend-to`** — Placement target on trigger (CSS selector or `${…}` expression).
- **`data-append-to`** — Same.
- **`data-insert-into`** — Same.
- **`data-place-instead`** — Same.

---

# `<template is="e-page-with-url">`

URL-aware page template: matches the current URL against a pattern and releases content with extracted params.

- **`data-url-pattern`** *(required)* — URL pattern with `{param}` placeholders. Extracts params from the current location into `urlParams`, then replaces the template with its content.

---

# `<template is="e-wrapper">`

Fetches an outer HTML layout and places template content into a slot inside it.

- **`data-src`** *(required)* — GET URL for the outer HTML fragment. Supports `${…}`.
- **`data-headers`** — Request headers. Default: `'${{}}'`.
- **`data-where-to-place`** *(required)* — CSS selector for the placeholder element inside the fetched HTML.
- **`data-how-to-place`** — Placement mode: `'before'`, `'after'`, `'inside'`, or `'instead'` (replace placeholder). Default: `'instead'`.
- **`data-actions-on-progress-start`** — Actions before the fetch starts.
- **`data-actions-on-progress-end`** — Actions after insertion completes.

---

# `<template is="e-ws">`

Opens a WebSocket connection and registers it globally.

- **`data-src`** *(required)* — WebSocket URL. Supports `${…}`.
- **`data-socket-name`** *(required)* — Name under which the connection is registered for use by other elements (for example, `<e-json>` or `<form is="e-form">`).
- **`data-connection-icon`** — CSS selector; shown while connecting, hidden on open.
- **`data-actions-on-progress-start`** — Actions when the connection attempt starts.
- **`data-actions-on-progress-end`** — Actions when the connection opens (after content is replaced).
- **`data-actions-on-open-connection`** — Actions on the WebSocket `open` event.
- **`data-actions-on-close-connection`** — Actions on the WebSocket `close` event.

---

# `<template is="e-sse">`

Opens a Server-Sent Events connection and registers it globally.

- **`data-src`** *(required)* — EventSource URL. Supports `${…}`.
- **`data-event-source-name`** *(required)* — Name under which the connection is registered for use by other elements (for example, `<e-json>`).
- **`data-with-credentials`** — If `'true'`, sends credentials with the EventSource request.
- **`data-connection-icon`** — CSS selector; shown while connecting, hidden on open.
- **`data-actions-on-open-connection`** — Actions on the `open` event (before template content replaces the element).

---

# `<form is="e-form">`

Extends native `<form>` with JSON serialization, validation, and AJAX/WebSocket submit.

## Form-level attributes

- **`data-do-not-trigger-on-enter`** — Prevents Enter key in inputs from auto-submitting via the first `[data-request-url]` element.
- **`data-request-url`** — If present on the form, auto-submits on load. Also required on the submit trigger. Supports `${…}`. Special value `echo/request/body` echoes the request body back as the response.
- **`data-socket`** — Submit via a named WebSocket connection instead of HTTP.
- **`data-request-method`** — HTTP method. Default: `'POST'`.
- **`data-request-headers`** — Request headers object expression. Default: `'${{}}'`.
- **`data-actions-on-response`** — Actions to run when the response arrives.
- **`data-response-name`** — Name under which the response is passed to actions.
- **`data-actions-on-progress`** — Actions during upload/download progress.
- **`data-progress-bar`** — CSS selector for a download progress `<progress>` element.
- **`data-upload-progress-bar`** — CSS selector for an upload progress bar.
- **`data-ajax-icon`** — CSS selector for a loading icon shown during the request.
- **`data-button-ajax-class`** — CSS class added to the submit button during the request.
- **`data-button-ajax-text`** — Text swapped onto the submit button during the request.
- **`data-download-response-body-as-file-with-name`** — Triggers a file download of the response body with the given filename.
- **`data-validation-error-message`** — Form-level error message when any field fails validation.
- **`data-validation-error-class-for-element`** — CSS class applied to invalid elements (also used on the form).
- **`data-validation-error-class-for-message-box`** — CSS class for the validation error `<span>`.

## Child field attributes

These apply to inputs, selects, textareas, buttons, and EHTML form helper elements inside the form:

- **`data-ignore`** — Excludes the element from form collection and validation.
- **`data-is-query-param`** — Sends the value as a URL query parameter instead of in the request body.
- **`data-validation-pattern`** — Built-in name (`email`, `url`, `date`, etc.) or custom regex string.
- **`data-validation-absence-error-message`** — Error message when a required field is empty.
- **`data-validation-bad-format-error-message`** — Error message when the pattern fails.
- **`data-validation-min-files-number`** — Minimum file count for `input[type="file"]`. Default: `1`.
- **`data-validation-error-class-for-element`** — Per-element CSS class for invalid state.
- **`data-validation-error-class-for-message-box`** — Per-element CSS class for the error message box.
- **`data-unchecked-value`** — Value pushed for unchecked checkboxes (checkbox groups become arrays).
- **`data-read-progress-bar`** — CSS selector for a file-read progress bar on `input[type="file"]`.
- **`data-ajax-icon`** — Per-element ajax icon selector (hidden on setup).
- **`required`** — Native required validation.
- **`value`** — Native; required on checkboxes for validation.
- **`name`** — Native; required unless the element is a direct child of `<e-form-array>`.

---

# `<e-form-object>`

Groups nested form fields into a named object in the request body.

- **`name`** — Property name in the nested request body object.

---

# `<e-form-array>`

Groups nested form fields into a named array in the request body.

- **`name`** — Array property name. Child index is determined by DOM position among top-level siblings.

---

# `<e-form-dynamic-value>`

Hidden element that contributes an evaluated value to the request body at submit time.

- **`name`** — Request body property name.
- **`data-bound-to`** *(required)* — Expression evaluated at submit time to produce the value.
- **`data-is-query-param`** — Sends the value as a query parameter instead of in the body.

---

# `<e-local-storage-value>`

Contributes a value from `localStorage` to the request body.

- **`name`** — Request body property name.
- **`data-key`** — `localStorage` key. Supports `${…}`.
- **`data-is-query-param`** — Sends the value as a query parameter instead of in the body.

---

# `<e-session-storage-value>`

Contributes a value from `sessionStorage` to the request body.

- **`name`** — Request body property name.
- **`data-key`** — `sessionStorage` key. Supports `${…}`.
- **`data-is-query-param`** — Sends the value as a query parameter instead of in the body.

---

# `<select is="e-select">`

Extends native `<select>` with declarative initial value binding.

- **`data-value`** — Initial selected value. Applied to the matching `<option>`, then the attribute is removed and native `value` is set. Also a common attribute (see above).

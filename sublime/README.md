# Sublime Text — EHTML / e-ui syntax & completions

Syntax highlighting and autocompletion for EHTML and [e-ui](https://github.com/Guseyn/e-ui) HTML attributes.

## Install

### Completions (User package)

Copy into Sublime **User** package:

```bash
cp sublime/ehtml.sublime-completions \
  "$HOME/Library/Application Support/Sublime Text/Packages/User/"
```

Restart Sublime or run **Developer → Reload Syntax Definitions**.

### HTML syntax override (optional)

`HTML.sublime-syntax` extends the built-in HTML package and adds a dedicated context for attributes whose values are JavaScript (EHTML action hooks, `${...}` expressions, e-ui `data-action`, etc.).

```bash
mkdir -p "$HOME/Library/Application Support/Sublime Text/Packages/HTML"
cp sublime/HTML.sublime-syntax \
  "$HOME/Library/Application Support/Sublime Text/Packages/HTML/"
```

## What gets JS highlighting

Attributes are sourced from `js/ehtml/processAttributes.js`, EHTML docs, and e-ui components:

| Category | Attributes |
|----------|------------|
| EHTML actions | `data-actions-on-response`, `data-actions-on-progress-start/end`, `data-actions-on-progress`, `data-actions-on-open-connection`, `data-actions-on-close-connection` |
| EHTML expressions | `data-internal-state`, `data-request-headers`, `data-headers`, `data-bound-to`, `data-cache-from`, `data-condition-to-display`, `data-list-to-iterate`, `data-text`, `data-value`, `data-inner-html`, `data-checked`, `data-disabled` |
| EHTML placement | `data-append-to`, `data-prepend-to`, `data-insert-into`, `data-place-instead` |
| EHTML dynamic URLs | `data-request-url`, `data-socket`, `data-src` (on non-media elements) |
| e-ui actions | `data-onopen`, `data-onclose`, `data-action`, `data-prev-click`, `data-next-click`, `data-on-week-change`, `data-condition-to-click` |
| Native events | `onclick`, `oninput`, etc. (unchanged — still `source.js` embedded) |

Scope for EHTML JS attributes: `entity.other.attribute-name.ehtml.js.html` / `source.js.embedded.ehtml.html`.

## Completions

Type a trigger (e.g. `e-json`, `data-actions-on-response`, `e-multiselect-dropdown`) and press **Tab**.

Includes all EHTML custom elements, e-ui components, JS action attributes, and common config attributes with placeholder values.

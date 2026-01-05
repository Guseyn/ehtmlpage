# Defining Custom Elements in EHTML v3

EHTML v3 makes it extremely simple to define your own custom HTML elements.  
A custom element is just a class that extends `HTMLElement`(or other native element), and EHTML automatically activates it by dispatching the `"ehtml:activated"` event during its activation pipeline. This means your element will behave consistently across all browsers—including those where native customized built-in elements fail—because EHTML manually guarantees element activation.

Custom elements work beautifully with EHTML features such as:

- **`${...}` expressions**  
- **`data-internal-state`** for attaching component state  
- **template mapping**  
- **the EHTML activation sequence**

Once defined, your custom element participates in the same lifecycle as all other EHTML elements.

---

# Defining Custom Elements in EHTML v3 (Customized Built-Ins)

EHTML v3 fully supports **customized built-in elements**, such as:

```html
<button is="my-counter">
```

This is possible because EHTML includes a polyfill that guarantees activation across all browsers (even iOS Safari, which normally blocks this feature).  
Your component participates in the EHTML activation cycle, receives the `ehtml:activated` event, supports `data-internal-state`, and works seamlessly with EHTML expressions.

---

## Example — A Counter Button `<button is="my-counter">`

### **my-counter.js**

```js
export default class MyCounter extends HTMLButtonElement {
  constructor() {
    super();
    this.count = 0
  }

  connectedCallback() {
    this.addEventListener("ehtml:activated", () => {
      // Initial render using internalState (if provided)
      this.count = this.internalState?.start ?? 0
      this.step  = this.internalState?.step ?? 1

      this.render()

      // Clicking increments the counter
      this.onclick = () => {
        this.count += this.step
        this.render()
      };
    }, { once: true })
  }

  render() {
    this.textContent = `Count: ${this.count}`
  }
}
```

#### Registering the element

```js
import MyCounter from './my-counter.js'

// Note the 3rd parameter — required for customized built-in elements
customElements.define('my-counter', MyCounter, { extends: 'button' })
```

#### Using the Custom Counter in HTML

```html
<button is="my-counter"></button>
```

EHTML activation process:

1. Button enters the DOM  
2. EHTML activates the node and dispatches `"ehtml:activated"`  
3. Your element initializes and renders (because it listens for `"ehtml:activated"`)  
4. Clicking increments the counter

Rendered behavior:  
```html
Count: 0  →  Count: 1  →  Count: 2  → ...
```

---

## Customizing Behavior with `data-internal-state`

You can pass structured state directly through HTML:

```html
<button
  is="my-counter"
  data-internal-state="${{
    start: 10,
    step: 5
  }}"
></button>
```

Updated JavaScript already reads:

```js
this.count = this.internalState?.start ?? 0;
this.step  = this.internalState?.step ?? 1;
```

Resulting behavior:

```js
Count: 10  → 15 → 20 → 25 …
```

Each button instance can have different state.

---

## Using EHTML Expressions Inside Custom Elements

Any `${...}` expressions inside attributes of your custom element are evaluated during activation.  
This works because EHTML activates *all* elements—native, custom, and customized built-ins.

Example:

```html
<button
  is="my-counter"
  data-text="Initial: ${5 + 5}"
></button>
```

EHTML evaluates `${5 + 5}` and sets `"Initial: 10"`.

---

You can also use attribute `data-attributes-to-ignore="data-some-attribute-1, data-some-attribute-2"`, where you can tell ETHML to not process attributes on start and evaluate those attributes inside of custom elements, or just ignore them entirely if you want.

You can evaluate those expressions yourself via `evaluatedValueWithParamsFromState(expression, state, node)` or `evaluatedStringWithParamsFromState(string, state, node)`. You can also use `evaluateActionsOnResponse(string, resName, resObj, node, state)` - if your logic requires it. It's more advance usage of this framework, and it's recommended you to see how those things works inside of existing elements, like `e-json` and others.

## Why `<button is="my-counter">` is Powerful in EHTML v3

- **Safari/iOS compatibility** via EHTML's polyfill  
- Fully participates in the **EHTML activation pipeline**  
- Auto-evaluates EHTML expressions inside its markup  
- Supports `data-internal-state` out of the box  
- State, configuration, and behavior live directly in HTML  

Customized built-ins allow you to progressively “enhance” real HTML elements without inventing new tags.

---

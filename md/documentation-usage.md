# Usage
<p></p>

**EHTML** is very easy to include in your project. Save [this file](https://github.com/Guseyn/EHTML/blob/master/ehtml.bundle.min.js) locally and use it:

```html
<head>
  <script src="/js/ehtml.bundle.min.js" type="text/javascript"></script>
</head>
```

There is also [light version of EHTML](https://github.com/Guseyn/EHTML/blob/master/ehtml.light.bundle.min.js) (if you don't need highlighting for markdown and LaTeX support):

```html
<head>
  <script src="/js/ehtml.light.bundle.min.js" type="text/javascript"></script>
</head>
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

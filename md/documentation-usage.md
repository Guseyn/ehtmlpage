# EHTML is built on a simple idea: the browser is already the framework.

Instead of inventing virtual DOMs, reactive engines, or build pipelines, EHTML activates plain HTML once and then reacts only to real DOM insertions—doing the minimum work needed, exactly when it’s needed. Its event-based activation model gives every node, template, and custom element a predictable lifecycle, independent of browser quirks and without hidden reactivity. The result is a UI framework that stays invisible, fast, and fully aligned with the platform you’re already using.

Contents
==============

- [Usage](#usage)
- [Supported Elements](#supported-elements)
    - [`this` in elements](#this-in-elements)
- [Provided Actions On AJAX Response](#provided-actions-on-ajax-response)
    - [Using `this` in `data-actions-on-response`](#using-c0c-in-data-actions-on-response)
- [Defining Custom Elements in EHTML v3](#defining-custom-elements-in-ehtml-v3)
- [Defining Custom Elements in EHTML v3 (Customized Built-Ins)](#defining-custom-elements-in-ehtml-v3-customized-built-ins)
- [Some Tips To Improve Performance](#some-tips-to-improve-performance)

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
yes | cp -rf ../EHTML/src/ js/ehtml
```

3) Add [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) in your HTML file in `<head>` element:

</details><details><summary><b>&lt;script type="importmap"&gt;</b></summary>
```html
<script type="importmap">
{
  "imports": {
    "#ehtml/": "/js/ehtml/",
    "#ehtml/main": "/js/ehtml/main.js"
  }
}
</script>
```
</details>You can adjust the import map according to how your server serves JavaScript files.

In the example above, it assumes that you cloned the `ehtml` directory inside the `js` folder of your static files.

4) Add following `<script>` after import map:

```html
<script type="module">import "#ehtml/main"</script>
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

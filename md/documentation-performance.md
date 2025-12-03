# Some Tips To Improve Performance

1) As it's been mentioned, you can turn on/off the `MutationObserver` in **EHTML** whenever needed:

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

2) You can disable some elements for **EHTML** by adding attribute `data-no-ehtml="true"`. It would improve performance, by reducing the number of elements that **EHTML** needs to observe.

3) You can preload resources in the **&lt;head&gt;**, which you can fetch by attribute `data-src`:

```html
<head>
  <link rel="preload" href="/md/md-from-server.md" as="fetch" crossorigin="anonymous" />
</head>

<body>
  <e-markdown data-src="/md/md-from-server.md"></e-markdown>
</body>

```

It's quite useful for the resources in elements like: **&lt;e-html&gt;**, **&lt;e-json&gt;**, **&lt;e-svg&gt;**
, **&lt;e-markdown&gt;**, **&lt;template is="e-wrapper"&gt;** and **&lt;e-json-view&gt;**.

4) Don't forget about general practices like response caching and compression.

5) If the sources for **&lt;e-html&gt;** or **&lt;e-markdown&gt;** are too large, you can split them into smaller chunks. As they are loaded asynchronously, rendering will be faster.

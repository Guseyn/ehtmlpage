## Simple &lt;e-page-with-url&gt;

<details><summary><b>demo</b></summary>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=LtEeJy4cB54" target="_blank">
	<img class="youtube-video" src="http://img.youtube.com/vi/LtEeJy4cB54/0.jpg" width="450" border="10" />
</a>
  
</details>

```html
<body class="main">
  <template is="e-page-with-url" data-url-pattern="/e-page-url.html/{one}/{two}/{three}?{query}">
    <input data-value="${urlParams.one}"/>
    <input data-value="${urlParams.two}"/>
    <input data-value="${urlParams.three}"/>
    <input data-value="${urlParams.query}"/>
  </template>
</body>
```

[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/src/e-page-with-url.html)

[Next Example: &lt;e-page-with-url&gt; and &lt;e-json&gt;](/html/examples/e-page-with-url-and-e-json.html)

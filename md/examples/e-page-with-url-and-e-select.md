# &lt;e-page-with-url&gt; and &lt;e-select&gt;

<details><summary><b>demo</b></summary>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=OxyhTnkAM-o" target="_blank">
  <img class="youtube-video" src="http://img.youtube.com/vi/OxyhTnkAM-o/0.jpg" width="450"/>
</a>
  
</details>

```html
<body class="main">
  <template is="e-page-with-url" data-url-pattern="/turbo-actions.html?{color}">
    <div class="base">
      <e-select
        class="big-select"
        name="color" 
        value="${urlParams.color}"
        onchange="
          const nextColor = this.value
          // let's change it back to original color, 
          // so we can return to it when we bress back button
          this.value = urlParams.color
          window.location.search = '?color=' + nextColor
        "
      >
        <option value="red" name="color">Red</option>
        <option value="green" name="color">Green</option>
        <option value="blue" name="color">Blue</option>
      </e-select>
      <div id="color" width="100px;">
        <div class="circle" style="background: ${urlParams.color};"></div>
      </div>
    </div>
  </template>
</body>
```

[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/static/html/e-page-with-url-and-e-select-with-redirect.html)

[Next Example: &lt;e-github-oauth-button&gt;](/html/examples/simple-e-google-oauth-button.html)

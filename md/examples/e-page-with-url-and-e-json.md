# &lt;e-page-with-url&gt; and &lt;e-json&gt;

<details><summary><b>demo</b></summary>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=DXOgaIR_d_g" target="_blank">
	<img class="youtube-video" src="http://img.youtube.com/vi/DXOgaIR_d_g/0.jpg" width="450" border="10" />
</a>
  
</details>

```html
<body class="main">
  <template is="e-page-with-url" data-url-pattern="/e-page-url-with-e-json.html?{name}">
    <div class="base">
      <e-json
        data-src="/../profile?name=${urlParams.name}"
        data-response-name="profileResponse"
        data-actions-on-response="
          mapToTemplate('#profile-template', profileResponse)
        "
        data-ajax-icon="#ajax-icon"
      >
        <div class="profile-box">
          <img class="ajax-icon" id="ajax-icon" src="/../images/ajax-icon.svg"/>
          <template id="profile-template" data-object-name="profileResponse">
            <template is="e-if" data-condition-to-display="${profileResponse.statusCode === 200}">
              <img class="photo" src="${profileResponse.body.photo}"/>
              <div class="user-info">
                <div class="name" data-text="${profileResponse.body.name}"></div>
                <div class="email" data-text="${profileResponse.body.email}"></div>
                <div class="other-details">
                  <div data-text="Age: ${profileResponse.body.age}"></div>
                  <div data-text="Country: ${profileResponse.body.country}"></div>
                  <div data-text="Profession: ${profileResponse.body.profession}"></div>
                </div>
              </div>
            </template>
            <template is="e-if" data-condition-to-display="${profileResponse.statusCode === 404}">
              <div class="error-box">
                User Not Found
              </div>
            </template>
          </template>
        </div>
      </e-json>
    </div> 
  </template>
</body>
```
[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/static/html/e-page-with-url-and-e-json.html)

[Next example: &lt;e-page-with-url&gt; and &lt;e-select&gt;](/html/examples/e-page-with-url-and-e-select.html)

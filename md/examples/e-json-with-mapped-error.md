## &lt;e-json&gt; with mapped error

<details><summary><b>demo</b></summary>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=0g9BkW8Imbk" target="_blank">
  <img class="youtube-video" src="http://img.youtube.com/vi/0g9BkW8Imbk/0.jpg" width="450"/>
</a>
  
</details><details><summary><b>response</b></summary>

```bash
Request URL: http://localhost:8000/profile?name=Unknown
Request Method: GET
-------------------------------------------------------
Status Code: 404 profile is not found
Content-Type: application/json
```
```json
{
  "error": "profile is not found"
}
```

</details>

```html
<body>
  <div class="base">
    <e-json
      data-src="/../profile?name=Unknown"
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
</body>
```
[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/static/html/e-json-with-mapped-error-message.html)

[Next Example: &lt;e-json&gt; as template](/html/examples/e-json-with-mapped-error.html)

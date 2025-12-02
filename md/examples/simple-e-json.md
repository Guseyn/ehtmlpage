## Simple &lt;e-json&gt;

<details><summary><b>demo</b></summary>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=5TSKXw9YOrk" target="_blank">
  <img class="youtube-video" src="http://img.youtube.com/vi/5TSKXw9YOrk/0.jpg" width="450"/>
</a>

</details><details><summary><b>response</b></summary>

```bash
Request URL: http://localhost:8000/profile?name=John
Request Method: GET
-----------------------------------------------------
Status Code: 200 ok
Content-Type: application/json
```
```json
{
  "age": 27,
  "country": "Canada",
  "email": "john@email.com",
  "name": "John",
  "photo": "/../images/John.svg",
  "profession": "dentist",
}
```

</details>

```html
<body>
  <div class="base">
    <e-json
      data-src="/../profile?name=John"
      data-response-name="profileResponse"
      data-actions-on-response="
        mapToTemplate('#profile-template', profileResponse.body)
      "
      data-ajax-icon="#ajax-icon"
    >
      <div class="profile-box">
        <img class="ajax-icon" id="ajax-icon" src="/../images/red-ajax-loader.gif"/>
        <template id="profile-template" data-object-name="profile">
          <img class="photo" src="${profile.photo}"/>
          <div class="user-info">
            <div class="name" data-text="${profile.name}"></div>
            <div class="email" data-text="${profile.email}"></div>
            <div class="other-details">
              <div data-text="Age: ${profile.age}"></div>
              <div data-text="Country: ${profile.country}"></div>
              <div data-text="Profession: ${profile.profession}"></div>
            </div>
          </div>
        </template>
      </div>
    </e-json>
  </div> 
</body>
```
[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/static/html/simple-ejson-page.html)

[Next Example: &lt;e-json&gt; with progress bar](/html/examples/e-json-with-progress-bar.html)

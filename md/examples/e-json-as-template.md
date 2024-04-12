## &lt;e-json&gt; as template

<details><summary><b>demo</b></summary>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=yFi5nDo_QVU" target="_blank">
	<img class="youtube-video" src="http://img.youtube.com/vi/yFi5nDo_QVU/0.jpg" width="450"/>
</a>
  
</details><details><summary><b>response</b></summary>

```bash
Request URL: http://localhost:8000/profile?name=Amanda
Request Method: GET
-----------------------------------------------------
Status Code: 200 ok
Content-Type: application/json
```
```json
{
	"photo": "/../images/Amanda.svg",
	"name": "Amanda",
	"email": "amanda@email.com",
	"age": 24,
	"country": "Australia",
	"profession": "race driver"
}
```

</details>

```html
<body class="main">
  <div class="base">
    <div class="profile-box">
      <img class="ajax-icon" id="ajax-icon" src="/../images/ajax-icon.svg"/>
      <template
        is="e-json"
        data-src="/../profile?name=Amanda"
        data-ajax-icon="#ajax-icon"
        data-object-name="profileResponse"
      >
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
    </div>
  </div> 
</body>
```
[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/static/html/e-json-template.html)

[Next Example: Simple &lt;e-for-each&gt;](/html/examples/simple-e-for-each.html)

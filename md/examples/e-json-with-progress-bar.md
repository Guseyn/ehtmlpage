## &lt;e-json&gt; with progress bar

<details><summary><b>demo</b></summary>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=VKoiCNrETng" target="_blank">
  <img class="youtube-video" src="http://img.youtube.com/vi/VKoiCNrETng/0.jpg" width="450" height="263" />
</a>
  
</details><details><summary><b>response</b></summary>

```bash
Request URL: https://guseyn.com/bigjson
Request Method: GET
---------------------------------------
Status Code: 200 ok
Content-Length: 1853154
Content-Type: application/json
```

</details>

```html
<body class="main">
  <div class="base">
    <e-json
      data-src="/json/bigjson"
      data-response-name="response"
      data-progress-bar="#progress-bar"
      data-actions-on-response="
        mapToTemplate('#response-template', response)
      "
    >
      <div class="response-box">
        <progress id="progress-bar"></progress>
        <template id="response-template" data-object-name="response">
          <div class="response-info">
            <div>
              Big JSON file has been fetched with status: <b data-text="${response.statusCode}"></b>
            </div>
            <div>
              Content-Length is: <b data-text="${response.headers['content-length']} bytes"></b>
            </div>
            <div>
              Name and email of the first user in the response: <br>
              <b data-text="name: ${response.body.items[0].name}, email: ${response.body.items[0].email}"></b>
            </div>
          </div>
        </template>
      </div>
    </e-json>
  </div> 
</body>
```

[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/static/html/e-json-with-progress.html)

[Next Example: &lt;e-json&gt; with mapped error](/html/examples/e-json-as-template.html)

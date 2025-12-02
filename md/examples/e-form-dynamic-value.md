## &lt;e-form-dynamic-value&gt;

<details><summary><b>response</b></summary>

```bash
Request URL: http://localhost:8000/echo
Request Method: GET
Request Body: {"date": "new Date()" }
-------------------------------------------
Status Code: 200 ok
Content-Type: application/json
```
```json
{
	"date": "new Date()"
}
  ```

</details>

```html
<body>
<div class="base">
  <e-form
    class="form"
    id="form">

    <div id="form-content">
      <div class="form-label">Item name:</div>
      <e-form-dynamic-value name="date" data-bound-to="${new Date()}">
      </e-form-dynamic-value>

      <button
        data-request-url="http://localhost:8000/echo"
        data-request-method="POST"
        data-ajax-icon="#ajax-icon"
        data-response-name="response"
        onclick="this.form.submit(this)"
        data-actions-on-response="
          mapToTemplate('#response-template', response)
        ">
        Submit
      </button>

      <img id="ajax-icon" class="ajax-icon" src="/../images/ajax-icon.svg"/>
    </div>

    <div class="applying-response-box">
      <template id="response-template" is="e-reusable" data-object-name="response">
        <div class="response-info">
          <span>Response with submitted date: <b data-text="${response.body.date}"></b></span>
        </div>
      </template>
    </div>

  </e-form>
</div> 
</body>
```
[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/static/html/e-form-dynamic-value.html)

[Next example: &lt;e-reusable&gt; with &lt;e-form&gt;](/html/examples/e-reusable-with-e-form.html)

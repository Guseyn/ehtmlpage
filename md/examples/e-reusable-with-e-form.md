# &lt;e-reusable&gt; with &lt;e-form&gt;

<details><summary><b>demo</b></summary>
  
<a href="http://www.youtube.com/watch?feature=player_embedded&v=YvHDR3Dr1SU" target="_blank">
	<img class="youtube-video" src="http://img.youtube.com/vi/YvHDR3Dr1SU/0.jpg" width="450"/>
</a>

</details><details><summary><b>response</b></summary>

```bash
Request URL: http://localhost:8000/echo
Request Method: GET
Request Body: {"name": "some name"}
-------------------------------------------
Status Code: 200 ok
Content-Type: application/json
```
```json
{
"name": "some name"
}
```

</details>

```html
<body class="main">
	<div class="base">
	  <e-form
	    class="form"
	    id="form"
	    data-validation-error-message="Enter correct data into the form, please"
	    data-validation-error-class-for-message-box="form-message-error">

	    <div id="form-content">
	      <div class="form-label">Item name:</div>
	      <input
	        type="text"
	        name="name"
	        class="form-input"
	        required
	        data-validation-pattern="^[a-z ,.'-]+$"
	        data-validation-bad-format-error-message="Item name can contain only alphabetic characters"
	        data-validation-absence-error-message="Item name is required"
	        data-validation-error-class-for-element="elm-error"
	        data-validation-error-class-for-message-box="message-error">

	      <button
	        data-request-url="https://guseyn.com/echo"
	        data-request-method="POST"
	        data-ajax-icon="#ajax-icon"
	        data-response-name="response"
	        onclick="this.form.submit(this)"
	        data-actions-on-response="
	          mapToTemplate('#response-template', response)
	        ">
	        Add Item
	      </button>

	      <img id="ajax-icon" class="ajax-icon" src="/../images/ajax-icon.svg"/>
	    </div>

	    <div class="applying-response-box">
	      <div class="name">
	        Items:
	      </div>
	      <div class="response-info">
	        <span>item with name: <b>default</b></span>
	      </div>
	      <template id="response-template" is="e-reusable" data-object-name="response">
	        <div class="response-info">
	          <span>item with name <b data-text="${response.body.name}"></b></span>
	        </div>
	      </template>
	    </div>

	  </e-form>
	</div> 
</body>
```
[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/src/e-reusable-with-e-form.html)

[Next Example: Simple &lt;e-page-with-url&gt;](/html/examples/simple-e-page-with-url.html)

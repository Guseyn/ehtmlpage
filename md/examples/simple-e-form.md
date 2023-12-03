## Simple E-FORM

<details><summary><b>demo</b></summary>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=AwWIe8TK_3U" target="_blank">
  <img class="youtube-video" src="http://img.youtube.com/vi/AwWIe8TK_3U/0.jpg" width="450"/>
</a>

</details><details><summary><b>response</b></summary>

```bash
Request URL: http://localhost:8000/echo
Request Method: POST
Request Body: {"name":"Guseyn Ismayylov","email":"guseynism@gmail.com","github":"https://github.com/Guseyn","langs":["php","js"],"resume":[{"name":"resume.pdf","size":151153,"type":"application/pdf","content":"data:application/pdf;base64,JVBERi0x...}]}
-------------------------------------------
Status Code: 200 ok
Content-Type: application/json
```
```json
{
  "name": "Guseyn Ismayylov",
  "email": "guseynism@gmail.com",
  "github": "https://github.com/Guseyn",
  "langs": [ "php", "js"],
  "resume": [ 
    {
      "name":"resume.pdf",
      "size":151153,
      "type":"application/pdf",
      "content":"data:application/pdf;base64,JVBERi0x.."
    }
  ]
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
        <div class="name">
          Simple Job Application Form
        </div>
        <div class="form-label">Your Name:</div>
        <input
          type="text"
          name="name"
          class="form-input"
          required
          data-validation-pattern="^[a-z ,.'-]+$"
          data-validation-bad-format-error-message="Name can contain only alphabetic characters"
          data-validation-absence-error-message="Name is required"
          data-validation-error-class-for-element="elm-error"
          data-validation-error-class-for-message-box="message-error">
        
        <div class="form-label">Your Email:</div>
        <input
          type="email"
          name="email"
          class="form-input"
          required
          data-validation-pattern="email"
          data-validation-bad-format-error-message="This is not proper email address"
          data-validation-absence-error-message="Email is required"
          data-validation-error-class-for-element="elm-error"
          data-validation-error-class-for-message-box="message-error">  
        <div class="form-label">Your GitHub:</div>
        <input
          type="url"
          name="github"
          class="form-input"
          required
          pattern="url"
          data-validation-absence-error-message="GitHub is required"
          data-validation-error-class-for-element="elm-error"
          data-validation-error-class-for-message-box="message-error">

        <div class="form-label">Choose languages you know:</div>
        <span class="lang-option">PHP</span>
        <input
          type="checkbox"
          name="langs"
          value="php">
        <span class="lang-option">JS</span>
        <input
          type="checkbox"
          name="langs"
          value="js">
        <span class="lang-option">Ruby</span>
        <input
          type="checkbox"
          name="langs"
          value="ruby">
        <span class="lang-option">Python</span>
        <input
          type="checkbox"
          name="langs"
          value="python">
        <span class="lang-option">C++</span>
        <input
          type="checkbox"
          name="langs"
          value="c++">

        <div class="form-label">Your Resume:</div>
        <input
          type="file"
          name="resume"
          class="form-input"
          data-read-progress-bar="#read-progress-bar"
          multiple required
          data-validation-absence-error-message="Resume is required"
          data-validation-min-files-number="1"
          data-validation-error-class-for-element="elm-error"
          data-validation-error-class-for-message-box="message-error">
        <progress id="read-progress-bar"></progress>

        <button
          data-request-url="https://guseyn.com/echo"
          data-request-method="POST"
          data-request-headers="{}"
          data-upload-progress-bar="#upload-progress-bar"
          data-progress-bar="#progress-bar"
          data-ajax-icon="#ajax-icon"
          data-response-name="response"
          onclick="this.form.submit(this)"
          data-actions-on-response="
            hideElms('#form-content')
            showElms('.applying-response-box')
            mapToTemplate('#response-template', response)
          ">
          Apply
        </button>

        <img id="ajax-icon" class="ajax-icon" src="/../images/ajax-icon.svg"/>
        <progress id="upload-progress-bar"></progress>
        <progress id="progress-bar"></progress>
      </div>

      <div class="applying-response-box" style="display: none;">
        <template id="response-template" data-object-name="response">
          <div class="response-info">
            <div data-text="Thank you for your application, ${response.body.name}!"></div>
          </div>
        </template>
      </div>

    </e-form>
  </div>
</body>
```
```css
.elm-error {
  border: 1px solid red;
}

.message-error {
  color: red;
}

.form-message-error {
  text-align: center;
  color: red;
  font-family: sans-serif;
}
```

[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/src/simple-e-form.html)

[Next Example: &lt;e-form-dynamic-value&gt;](/html/examples/e-form-dynamic-value.html)

# Simple &lt;e-github-oauth-button&gt;

<details><summary><b>demo</b></summary><br>
  
<a href="http://www.youtube.com/watch?feature=player_embedded&v=PzEPLgav6vQ" target="_blank">
	<img class="youtube-video" src="http://img.youtube.com/vi/PzEPLgav6vQ/0.jpg" width="450"/>
</a>
  
</details><details><summary><b>response</b></summary>

```bash
# request is made on redirect URL page
Request URL: /../github
Request Method: GET
Request Body: {"code": "<some retrieved code from redirect uri page>"}
-------------------------------------------
Status Code: 200 ok
Content-Type: application/json
```
```json
{
  "jwt": "<some jwt token from your endpoint>"
}
```

</details>

```html
<body class="main">
  <div class="base">
    
    <template is="e-if" data-condition-to-display="${localStorage.getItem('jwt') != null}">
      <div class="response-box">
        <div class="response-info">
          <b>Welcome!</b>
        </div>
      </div>
    </template>

    <template is="e-if" data-condition-to-display="${localStorage.getItem('jwt') == null}">
      <div class="login-form">
        <input id="email" type="text" name="email" placeholder="My email" class="login-input">
        <input id="password" type="password" name="password" placeholder="My password" class="login-input">
        <div id="error" class="error"></div>
        <input id="go-button" type="button" value="Sign in" class="login-input">
        <div class="mode">
          <span id="sign-up" class="as-link">Sign up</span>
          /
          <span id="sign-in" class="as-link">Sign in</span>
        </div>
      </div>

      <div style="text-align: center; font-family: sans-serif;">or</div>

      <e-github-oauth-button
        class="customSignIn"
        data-client-id="9740bb12713949b1c23d"
        data-redirect-uri="http://localhost:8000/html/github.html/"
        data-scope="user,repo">
        <span id="github-icon" class="icon"></span>
        <span class="buttonText">Sign in with Github</span>
      </e-github-oauth-button>
    </template>
  </div>
</body>
```
```css
.customSignIn {
    margin: 10px auto;
    background: white;
    color: #444;
    width: 200px;
    border-radius: 5px;
    border: thin solid #888;
    box-shadow: 1px 1px 1px grey;
    white-space: nowrap;
    display: block;
}

.customSignIn:hover {
  cursor: pointer;
}

#github-icon {
  background: url('/../images/github-logo.png') transparent 5px 50% no-repeat;
}

span.icon {
  display: inline-block;
  vertical-align: middle;
  width: 48px;
  height: 48px;
}

span.buttonText {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
  font-family: 'Roboto', sans-serif;
}
```

**Page on redirect URL:**

```html
<body class="main">
  <template is="e-page-with-url" data-url-pattern="/html/github.html?{code}">
    <div class="base">
      <e-form
        data-request-url="/../github"
        data-request-method="POST"
        data-request-headers="{}"
        data-ajax-icon="#ajax-icon"
        data-response-name="responseWithToken"
        data-actions-on-response="
          localStorage.setItem('jwt', responseWithToken.body.jwt);
          redirect('/../e-github-oauth-button.html');
      ">
        <input type="hidden" name="code" value="${urlParams.code}">
        <img id="ajax-icon" class="ajax-icon" src="/../images/ajax-icon.svg"/>
      </e-form>
    </div> 
  </template>
</body>
```

[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/static/html/e-github-oauth-button.html)

[Next Example: Simple &lt;e-markdown&gt;](/html/examples/simple-e-markdown.html)

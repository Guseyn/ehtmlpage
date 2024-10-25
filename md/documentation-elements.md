# Supported Elements

<details><summary><b>&lt;e-html&gt;</b></summary>

Sometimes html files can be very big, so why not just split them into different smaller html files and put sort of links to them in the main html file? `e-html` allows you to do that by introducing a module system in HTML.

  So, let's say we have main `articles.html` file

```html
<body>
  <e-html data-src="/html/first.html"></e-html>
  <e-html data-src="/html/second.html"></e-html>
  <e-html data-src="/html/third.html"></e-html>
</body>
```

and as you can see, we have three `e-html` tags here. And each of them refers to a separate article. This tag has only one custom attribute `data-src`, which tells us where exactly the file that we want to include is served.

And for example, `first.html` would look something like this

```html
<div class="article">
  <!-- some content of the first article -->
</div>
```

And when you open `articles.html` in a browser, it will be rendered as if you included all the parts in a single file:

```html
<body>
  <div class="article">
    <!-- content of the first article -->
  </div>
  <div class="article">
    <!-- content of the second article -->
  </div>
  <div class="article">
    <!-- content of the third article -->
  </div>
</body>
```

The main benefit of using this element is that you can much more easily modify your big html files. So, instead of having one big html file where you have to find a specific part of it to modify, you can just find a file, which contains this specific part and make changes there.

Of course, this element makes an additional http(s) request for fetching a specific part, but you can always cache the files, so it would not cause any performance issues.

Actually, the ability to cache your html files is an incredible boost for loading your pages.

You can also add attributes `data-actions-on-progress-start` and `data-actions-on-progress-end`, where you can do some actions while waiting for response:
```html
data-actions-on-progress-start="
  console.log('waiting for progress')
"
data-actions-on-progress-end="
  console.log('progress finished')
"
```
</details><details><summary><b>&lt;e-json&gt;</b></summary>

`e-json` allows you to fetch **JSON** resource by **GET** request from the server and apply some actions on the response. So, for example, let's say you have an endpoint `/album/{title}`, which returns following response:

```json
title = 'Humbug'
{
  "title": "Humbug",
  "artist": "Arctic Monkeys",
  "type": "studio album",
  "releaseDate": "19 August 2009",
  "genre": "psychedelic rock, hard rock, stoner rock, desert rock",
  "length": "39:20",
  "label": "Domino",
  "producer": "James Ford, Joshua Homme"
}
```

Then you can fetch it via `e-json` like in following html code:

```html
<e-json
  data-src="/album/Humbug"
  data-response-name="albumResponse"
  data-actions-on-response="
    mapToTemplate('#album-info', albumResponse.body)
  ">

	<template id="album-info" data-object-name="album">
	  <div data-text="Title: ${album.title}"></div>
	  <div data-text="Artist: ${album.artist}"></div>
	  <div data-text="Type: ${album.type}"></div>
	  <div data-text="Release date: ${album.releaseDate}"></div>
	  <div data-text="Genre: ${album.genre}"></div>
	  <div data-text="Length: ${album.length}"></div>
	  <div data-text="Label: ${album.label}"></div>
	  <div data-text="Producer: ${album.producer}"></div>
	</template>
</e-json>
```

So, `e-json` has attributes `data-src` which tells us where from we can fetch **JSON** response. Attribute `data-response-name` specifies the name that we want to use for the response. It contains `body`, `statusCode` and `headers` properties, so you can use them in the attribute `data-actions-on-response`.

In this case we just decided to map `body` of our response to the element with id `album-info`, which also must have the attribute `data-object-name`. This attribute specifies the name of the object that we want to map. It's important to mention that you can map object only to `<template>`, which is in `e-json` that provides the object for mapping.

As you see, we are using predefined `mapToTemplate` function in `data-actions-on-response`. There are few more such functions or actions on response, we will discuss them later.

If you need some request headers, you can specify them in the attribute `data-request-headers` with format `{ "headerName": "headerValue", ... }`.

The attribute `data-src` can also contain dynamic data which is being evalutated right before the request:
```html
data-src="/album/${getAlbumNameSomehow()}"
```

You can also add attributes `data-ajax-icon` and `data-progress-bar` as element selectors for presenting progress of fetching data from the server. You can see how to use them in the [examples](/html/examples.html).

Also, it is worth mentioning that in `data-actions-on-response`, you can run any JavaScript code without using curly brackets ${someVariable}. On the other hand, in other attributes like `data-text` or `data-value` (for input fields), you must use curly brackets for parameters, as everything must be evaluated back to the string.  You can see how to use them in this [example](/html/examples/simple-e-json.html).

You can also add attributes `data-actions-on-progress-start` and `data-actions-on-progress-end`, where you can do some actions while waiting for response:
```html
data-actions-on-progress-start="
  console.log('waiting for progress')
"
data-actions-on-progress-end="
  console.log('progress finished')
"
```

There is an option to use cache in `e-json`(it's supported only for this particular element). By using `data-cache-from="${someGlobalObjectFromMemoryOrStorage}"`, you can just get the response from the cache. For single-page applications, you can use some memory storage, for multiple-page it can be **localStorage** or **sessionStorage**. It's important that in `data-cache-from` you must specify an object that represents real response, otherwise your actions on response would behave unpredictably. You must initialize cache in `data-actions-on-response`, for example:


```html
data-actions-on-response="
  sessionStorage.setItem('cacheKey', JSON.stringify(response))
"
```

And then you can use it:

```html
data-cache-from="${window.getObjectFromSessionStorage('cacheKey')}"
```

where `getObjectFromSessionStorage` is something like:

```js
window.getObjectFromSessionStorage = (key) => {
  const item = sessionStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }
  return null
}
```

If `window.getObjectFromSessionStorage` returns **null**, `e-json` will make a request, otherwise it will use cached response.

To invalidate cache, all you need to is just to assign cache object to **null** or **undefined**.
</details><details><summary><b>&lt;template is="e-json"&gt;</b></summary>

You can use `e-json` as a `<template>` element, if you just need to map response. 

```json
title = 'Humbug'
{
  "title": "Humbug",
  "artist": "Arctic Monkeys",
  "type": "studio album",
  "releaseDate": "19 August 2009",
  "genre": "psychedelic rock, hard rock, stoner rock, desert rock",
  "length": "39:20",
  "label": "Domino",
  "producer": "James Ford, Joshua Homme"
}
```

```html
<template is="e-json" data-src="/album/Humbug" data-object-name="albumResponse">
  <div data-text="Title: ${albumResponse.body.title}"></div>
  <div data-text="Artist: ${albumResponse.body.artist}"></div>
  <div data-text="Type: ${albumResponse.body.type}"></div>
  <div data-text="Release date: ${albumResponse.body.releaseDate}"></div>
  <div data-text="Genre: ${albumResponse.body.genre}"></div>
  <div data-text="Length: ${albumResponse.body.length}"></div>
  <div data-text="Label: ${albumResponse.body.label}"></div>
  <div data-text="Producer: ${albumResponse.body.producer}"></div>
</template>
```

Here you don't use `data-response-name` attribute as you don't need to apply actions on response via `data-actions-on-response` attribute. But you still have to specify `data-object-name` to define a variable for the response, so you can use it as a mapping object inside of `e-json` template.

And as for simple `e-json` you can also add attributes `data-ajax-icon` and `data-progress-bar` as element selectors for presenting progress of fetching data from the server. You can see how to use them in this [example](/html/examples/e-json-as-template.html).

You can also add attributes `data-actions-on-progress-start` and `data-actions-on-progress-end`, where you can do some actions while waiting for response:
```html
data-actions-on-progress-start="
  console.log('waiting for progress')
"
data-actions-on-progress-end="
  console.log('progress finished')
"
```
</details><details><summary><b>&lt;template is="e-for-each"&gt;</b></summary>

You can use standard `template` html element with attribute `is="e-for-each"` for iterating some object for mapping to an element. So, let's say you have an endpoint `/album/{title}/songs`, which returns following response:

```json
title = 'Humbug'
{
  "title": "Humbug",
  "artist": "Arctic Monkeys",
  "songs": [
    { "title": "My Propeller", "length": "3:27" },
    { "title": "Crying Lightning", "length": "3:43" },
    { "title": "Dangerous Animals", "length": "3:30" },
    { "title": "Secret Door", "length": "3:43" },
    { "title": "Potion Approaching", "length": "3:32" },
    { "title": "Fire and the Thud", "length": "3:57" },
    { "title": "Cornerstone", "length": "3:18" },
    { "title": "Dance Little Liar", "length": "4:43" },
    { "title": "Pretty Visitors", "length": "3:40" },
    { "title": "The Jeweller's Hands", "length": "5:42" }
  ]
}
  ```

Then your html code would be something like this:

```html
<e-json
  data-src="/album/Humbug/songs"
  data-response-name="albumResponse"
  data-actions-on-response="
    mapToTemplate('#album-info', albumResponse.body)
  ">

  <template id="album-info" data-object-name="album">

    <div data-text="Title: ${album.title}"></div>
    <div data-text="Artist: ${album.artist}"></div>

    <div><b data-text="${album.songs.length} songs:"></b></div>
    <template is="e-for-each" data-list-to-iterate="${album.songs}" data-item-name="song">
      <div data-text="No. ${song.index}/${album.songs.length}"></div>
      <div data-text="Title: ${song.title}"></div>
      <div data-text="Length: ${song.length}"></div>
    </template>

  </template>
</e-json>
  ```

So, as you can see it's pretty straightforward: `e-for-each template` has attribute `data-list-to-iterate` where you can specify the list from the mapped object that you want to iterate. And attribute `data-item-name` specifies the name of the item that you want to map to the `template`. You can also use `index` property of the item in the mapping which starts from 1.

When you open the page, `template` will be replaced with its `n` times duplicated inner content for each item, where `n` is the length of the list that has been iterated:

```html
<div>Title: Humbug</div>
<div>Artist: Arctic Monkeys</div>

<div><b>10 songs:</b></div>
<div class="song-box">
  <div>No. 1/10</div>
  <div>Title: My Propeller</div>
  <div>Length: 3:27</div>
</div>
<div class="song-box">
  <div>No. 2/10</div>
  <div>Title: Crying Lightning</div>
  <div>Length: 3:43</div>
</div>
<div class="song-box">
  <div>No. 3/10</div>
  <div>Title: Dangerous Animals</div>
  <div>Length: 3:30</div>
</div>
<div class="song-box">
  <div>No. 4/10</div>
  <div>Title: Secret Door</div>
  <div>Length: 3:43</div>
</div>
<div class="song-box">
  <div>No. 5/10</div>
  <div>Title: Potion Approaching</div>
  <div>Length: 3:32</div>
</div>
<div class="song-box">
  <div>No. 6/10</div>
  <div>Title: Fire and the Thud</div>
  <div>Length: 3:57</div>
</div>
<div class="song-box">
  <div>No. 7/10</div>
  <div>Title: Cornerstone</div>
  <div>Length: 3:18</div>
</div>
<div class="song-box">
  <div>No. 8/10</div>
  <div>Title: Dance Little Liar</div>
  <div>Length: 4:43</div>
</div>
<div class="song-box">
  <div>No. 9/10</div>
  <div>Title: Pretty Visitors</div>
  <div>Length: 3:40</div>
</div>
<div class="song-box">
  <div>No. 10/10</div>
  <div>Title: The Jeweller's Hands</div>
  <div>Length: 5:42</div>
</div>
```
</details><details><summary><b>&lt;template is="e-if"&gt;</b></summary>

This standard `template` html element with attribute `is="e-if"` decides if some particular part of html needs to be displayed or not while mapping some object to an element. So, let's say you have an endpoint `/album/{title}/songs`, which returns following response:

```json
title = 'Humbug'
{
  "title": "Humbug",
  "artist": "Arctic Monkeys",
  "songs": [
    { "title": "My Propeller", "length": "3:27" },
    { "title": "Crying Lightning", "length": "3:43" },
    { "title": "Dangerous Animals", "length": "3:30" },
    { "title": "Secret Door", "length": "3:43" },
    { "title": "Potion Approaching", "length": "3:32" },
    { "title": "Fire and the Thud", "length": "3:57" },
    { "title": "Cornerstone", "length": "3:18" },
    { "title": "Dance Little Liar", "length": "4:43" },
    { "title": "Pretty Visitors", "length": "3:40" },
    { "title": "The Jeweller's Hands", "length": "5:42" }
  ]
}
```

And you would like to display only songs that shorter than '3:30' in length. Then your html code would be something like this:

```html
<e-json
  data-src="/album/Humbug/songs"
  data-response-name="albumResponse"
  data-actions-on-response="
    mapToTemplate(#album-info, albumResponse.body)
  ">

  <template id="album-info" data-object-name="album">
    <div data-text="Title: ${album.title}"></div>
    <div data-text="Artist: ${album.artist}"></div>
    <div><b>Songs that shorter than 3:30:</b></div>
    <template is="e-for-each" data-list-to-iterate="${album.songs}" data-item-name="song">
      <template is="e-if"
        data-condition-to-display="${(song.length.split(':')[0] * 60 + song.length.split(':')[1] * 1) <= 210}"
      >
        <div data-text="No. ${song.index}/${album.songs.length}"></div>
        <div data-text="Title: ${song.title}"></div>
        <div data-text="Length: ${song.length}"></div>
      </template>
    </template>
  </template>
</e-json>
```

This element has only one attribute `data-condition-to-display` that specifies a condition whether inner content of the template has to be displayed.

When you open a browser, you will see:

```html
<div>Title: Humbug</div>
<div>Artist: Arctic Monkeys</div>

<div><b>Songs that shorter than 3:30:</b></div>
<div class="song-box">
  <div>No. 1/10</div>
  <div>Title: My Propeller</div>
  <div>Length: 3:27</div>
</div>
<div class="song-box">
  <div>No. 3/10</div>
  <div>Title: Dangerous Animals</div>
  <div>Length: 3:30</div>
</div>
<div class="song-box">
  <div>No. 7/10</div>
  <div>Title: Cornerstone</div>
  <div>Length: 3:18</div>
</div>
```
</details><details><summary><b>&lt;e-form&gt;</b></summary>

Custom element `e-form` is a great solution, if you want to send data from your form in JSON format. So, let's say you have an endpoint `/artist/{name}/albums/add` with method 'POST' and expected request body is something like:

```json
name = 'Arctic Monkeys'
{
  "title": "Humbug",
  "type": "studio album",
  "releaseDate": "19 August 2009",
  "genre": ["psychedelic rock", "hard rock", "stoner rock", "desert rock"],
  "length": "39:20",
  "label": "Domino",
  "producer": "James Ford, Joshua Homme"
}
```

Then you can make this request with following html code:

```html
<e-form>
  
  Title:
  <input type="text" name="title">
  
  Type:
  <input type="radio" name="type" value="studio album" checked>
  <label for="one">One</label>

  <input type="radio" name="type" value="live album" checked>
  <label for="one">One</label>

  Release date:
  <input type="date" name="releaseDate">

  Genre:
  <input type="checkbox" name="genre" value="psychedelic rock">
  <input type="checkbox" name="genre" value="hard rock">
  <input type="checkbox" name="genre" value="stoner rock">
  <input type="checkbox" name="genre" value="desert rock">

  Total length:
  <input type="time" name="totalLength">

  Producer:
  <input type="text" name="producer">

  <button
    id="send"
    data-request-url="/artist/Arctic_Monkeys/albums/add"
    data-request-method="POST"
    data-request-headers="{}"
    data-ajax-icon="#ajax-icon"
    data-response-name="savedAlbum"
    onclick="this.form.submit(this)"
    data-actions-on-response="
      console.log(savedAlbum)
    "
  />

  <img id="ajax-icon" src="/images/ajax-loader.gif"/>
  
</e-form>
```

So, like standard `form` element `e-form` can have inputs with different types, selects, radio buttons, checkboxes and textareas. Every item in `e-form` mast have `name` attribute, which will be used as a key in the request body. And `value` of every item is used as a value for corresponding name in the request body.

This element will be rendered as a standard `form` element with attribute `data-e-form="true"`, but it will send its data as json object. You can do it by attaching events on buttons or other active elements with function: `this.form.submit(this)`, which constructs a request body by the form's items and submits it. Such approach is much better than standard `action` attribute in the `form` tag because you can attach different requests on several active elements using the same form. 

Also you have to add other information about the request you want to make in the attributes: `data-request-url`, `data-request-method`, `data-request-headers`. You can even add attributes like `data-ajax-icon`, `data-progress-bar` and `data-upload-progress-bar` which can display progress of the request.

The attribute `data-request-url` can contain dynamic data which is evaluated right before form is being sent:
```html
data-request-url="/artist/${getArtistNameSomehow()}/albums/add"
```

You can change button text and add class to it while you're waiting for ajax request to be completed. You can do it via `data-button-ajax-text` and `data-button-ajax-class`.

Like for `e-json`, you can do actions on response with the name that you specify in `data-response-name` attribute. In this case, we just log the response from the request. 

You can also do validation of your e-forms by attributes: `required`, `data-validation-pattern`, `data-validation-error-class-for-element`, `data-validation-error-class-for-message-box`, `data-validation-bad-format-error-message` and `data-validation-min-files-number`. More details you can find in this [example](/html/examples/simple-e-form.html).

You can treat response body as something that you want to download as a file. All you need is to specify the name of your file in submit button:

```html
  data-download-response-body-as-file-with-name="file.zip"
```

You can still apply actions on response body, status code and headers.

You can use `data-is-query-param` attribute in an input element in `e-form`, and it will be attached no to request body, but rather will be presented in url as a query param.

You can set values for unchecked `checkboxes` via `unchecked-value` attribute.

You can also add attributes `data-actions-on-progress-start` and `data-actions-on-progress-end`, where you can do some actions while waiting for response:
```html
data-actions-on-progress-start="
  console.log('waiting for progress')
"
data-actions-on-progress-end="
  console.log('progress finished')
"
```
</details><details><summary><b>&lt;e-form-dynamic-value&gt;</b></summary>

Generally **EHTML** has static binding for elements (unless it's input fields that can change value by the user interaction). In order to bind value in memory (and also local/session storages and other global variables) and send this value in the `e-form`, you can use `e-form-dynamic-value`. By using `e-form-dynamic-value` attribute, you can be sure that its value is calculated only when you submit a form.

```html
<e-form>
  ...
  <e-form-dynamic-value name="current-date" data-bound-to="${new Date()}"></e-form-dynamic-value>
  ...
</e-form>
```

More details you can find in this [example](/html/examples/e-form-dynamic-value.html).

</details><details><summary><b>&lt;template is="e-reusable"&gt;</b></summary>

You use action `mapToTemplate` on a template with attribute `is="e-reusable"`, so you can map response object multiple times. Also you can specify attribute `data-append-to="#someSelector"` or `data-prepend-to="#someSelector"` to decide where and how mapped content of the template should be placed. If you don't specify one of these attributes, then mapped content of the template will be placed right before the template.

So, the main difference between "reusable" template and other types of templates is that "reusable" template is not getting removed from the DOM, so you can use it several times.

More details you can find in this [example](/html/examples/e-reusable-with-e-form.html).

You can use `data-insert-into="#someSelector"` attribute in reusable template. This allows you to replace content of released template from previuos mapping with new mapped content of template.

</details><details><summary><b>&lt;e-local-storage-value&gt; and &lt;e-session-storage-value&gt;</b></summary>

For retrieving values from local storage you can use `e-local-storage-value` and use it in a form:

```html
<e-form>
  <e-local-storage-value name="jwt" data-key="jwtToken"></e-local-storage-value>
  <button
    id="send"
    data-request-url="/verify"
    data-request-method="POST"
    data-request-headers="{}"
    data-ajax-icon="#ajaxIcon"
    data-response-name="response"
    onclick="this.form.submit(this)"
    data-actions-on-response="
      console.log('response: ', response);
    "
  />
  <img id="ajaxIcon" src="/images/ajax-loader.gif"/>
</e-form>
```

Element `e-local-storage-value` behaves like any input element in the `e-form`: it has attribute `name` which will be used as a key in request body, and value of the `e-local-storage-value` is a value that is stored in the local storage with the key that you specify in the `data-key` attribute.

So, in this case `e-form` will construct following request body:

```json
{
  "jwt": "some value from local storage with key 'jwtToken' (it's like localStorage.getItem('jwtToken'))" 
}
```

Element `e-session-storage-value` works in the same way as `e-local-storage-value` but with session storage:

```html
<e-form>
  <e-local-session-value name="sessionToken" data-key="token"></e-local-storage-value>
  <button
    id="send"
    data-request-url="/verify/"
    data-request-method="POST"
    data-request-headers="{}"
    data-ajax-icon="#ajaxIcon"
    data-response-name="response"
    onclick="this.form.submit(this)"
    data-actions-on-response="
      console.log('response: ', response)
    "
  />
  <img id="ajaxIcon" src="/images/ajax-loader.gif"/>
</e-form>
```

```json
{
  "sessionToken": "some value from session storage with key 'token' (it's like sessionStorage.getItem('token'))"
}
```

You can also get items from local and session storages in the attributes of any elements: `some-attr="${localStorage.getItem('itemName')}"` or `some-attr="${sessionStorage.getItem('itemName')}"`.

</details><details><summary><b>&lt;e-github-oauth-button&gt;</b></summary>

You can integrate GitHub Sign-In into your web app just by adding one button:

```html
<e-github-oauth-button
  class="customSignIn"
  data-client-id="9740bb12713949b1c23d"
  data-redirect-uri="http://localhost:8000/html/github.html/"
  data-scope="user,repo">
  <span id="github-icon" class="icon"></span>
  <span class="buttonText">Sign in with Github</span>
</e-github-oauth-button>
```

It will be rendered as a simple button with attribute `data-e-github-oauth-button="true"`. You can configure github oauth with custom attributes: `data-client-id`, `data-redirect-uri` and `data-scope`.

And your page which is in `redirect-uri` can look like:

```html
<!-- html/github.html -->
<body class="main">
  <template is="e-page-with-url" data-url-pattern="/html/github.html?{code}">
    <e-form
      data-request-url="/github"
      data-request-method="POST"
      data-request-headers="{}"
      data-ajax-icon="#ajax-icon"
      data-response-name="responseWithToken"
      data-actions-on-response="
        localStorage.setItem('jwt', responseWithToken.body.jwt);
        redirect('/e-github-oauth-button.html');
    ">
      <input type="hidden" name="code" value="${urlParams.code}">
      <img id="ajax-icon" class="ajax-icon" src="/images/ajax-icon.svg"/>
    </e-form>
  </template>
</body>
```

In the redirect uri we expect `code` param, which we want to retrieve via `e-page-with-url` template. And then using simple `e-form` with `<input type="hidden">` we send the code in the request to our endpoint `/github`, which is supposed to return response with some jwt token.

After we get the **JWT** token, we save it into local storage and make turbo redirect to the original page where we have been redirected from. And you can notice that we use all `data-request-*` attributes right in the `e-form`. That allows us to send the form on rendering page, so we don't have to click on some button, for example.

Demo of `e-google-oauth-button` you can find in this [example](/html/examples/simple-e-github-oauth-button.html).


</details><details><summary><b>&lt;template is="e-page-with-url"&gt;</b></summary>

You can define url parameters via template with attribute `is="e-page-with-url"`:

```html
<body>
  <template is="e-page-with-url" data-url-pattern="/album/{title}">
    <!-- content -->
  </template>
</body>
```

Or for example:

```html
<body>
  <template is="e-page-with-url" data-url-pattern="/artists?{search}">
    <!-- content -->
  </e-page-with-url>
</body>
```

You can get url parameters in any attributes of any elements via `urlParams` object: `some-attr="${urlParams.someValue}"`. It's important to place `e-page-with-url` in the beginning of `<body>` with all elements that use `urlParams` inside of it:

```html
<body>
  <template is="e-page-with-url" data-url-pattern="/album/{title}">
    
    <div data-text="Album title: ${urlParams.title}"></div>

  </template>
</body>
```

So, for example, when you open url `http://0.0.0.0:8000/album/Humbug` in a browser, you would see:

```html
<body>
    
  <div>Album title: Humbug</div>

</body>
```

Element `e-page-with-url` is a template because we have to initialize `urlParams` before we render all elements that use those parameters. 

More details you can find in this [example](/html/examples/simple-e-page-with-url.html).

</details><details><summary><b>&lt;e-select&gt;</b></summary>

Standard `select` can be better. For example, it would be great if we could set a value to it, so it would be selected automatically on render. `e-select` does such thing:

```html
<e-select
  name="color" 
  value="green">
  <option value="red" name="color">Red</option>
  <option value="green" name="color">Green</option>
  <option value="blue" name="color">Blue</option>
</e-select>
```

It will be rendered as a simple select with attribute `data-e-select="true"` with automatically selected value that you specify in attribute `value`.

More details you can find in this [example](/html/examples/e-page-with-url-and-e-select.html).

</details><details><summary><b>&lt;e-svg&gt;</b></summary>

With element `e-svg` you can load svg code right into your html page:

```html
<body>
  <e-svg data-src="/images/svg-from-server.svg"></e-svg>
</body>
```

And let's say your svg image on `/images/svg-from-server.svg` is something like

```html
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
  <circle id="background_45_" style="fill:#ECF0F0;" cx="256" cy="256" r="256"></circle>
  <path style="fill:#E27C3E;" d="...."></path>
  <polygon style="fill:#4C738A;" points="..."></polygon>
</svg>
```

Then once you load your page it would look like:

```html
<body class="main">
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <circle id="background_45_" style="fill:#ECF0F0;" cx="256" cy="256" r="256"></circle>
    <path style="fill:#E27C3E;" d="...."></path>
    <polygon style="fill:#4C738A;" points="..."></polygon>
  </svg>
</body>
```

You can also add attributes `data-actions-on-progress-start` and `data-actions-on-progress-end`, where you can do some actions while waiting for response:
```html
data-actions-on-progress-start="
  console.log('waiting for progress')
"
data-actions-on-progress-end="
  console.log('progress finished')
"
```
</details><details><summary><b>&lt;e-markdown&gt;</b></summary>
  
With element `e-markdown` you can load markdown right into your html page:

```html
<body>
  <e-markdown data-src="/md/md-from-server.md"></e-markdown>
</body>
```

And let's say your markdown on `/md/md-from-server.md` is something like

```md
# Title
```

Then once you load your page it would look like:

```html
<body>
  <h1>Title</h1>
</body>
```

Use attrbiute `data-apply-code-highlighting="true"`, if you want to use code highligher in your markdowns.

Use attribute `data-apply-latex="true"` to use LaTeX in your markdowns. In order to display LaTeX correctly in all browsers, please add following styles and scripts into `<head>`:

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" crossorigin="anonymous">
  <script>
    window.WebFontConfig = {
      custom: {
        families: [
          'KaTeX_AMS', 'KaTeX_Caligraphic:n4,n7', 'KaTeX_Fraktur:n4,n7',
          'KaTeX_Main:n4,n7,i4,i7', 'KaTeX_Math:i4,i7', 'KaTeX_Script',
          'KaTeX_SansSerif:n4,n7,i4', 'KaTeX_Size1', 'KaTeX_Size2', 'KaTeX_Size3',
          'KaTeX_Size4', 'KaTeX_Typewriter'
        ],
      },
    };
  </script>
  <script defer src="https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.js" integrity="sha256-4O4pS1SH31ZqrSO2A/2QJTVjTPqVe+jnYgOWUVr7EEc=" crossorigin="anonymous"></script>
</head>
```

Another important detail about LaTex, make sure that you don't have conflicting css classes like `.base`.

You can also add attributes `data-actions-on-progress-start` and `data-actions-on-progress-end`, where you can do some actions while waiting for response:
```html
data-actions-on-progress-start="
  console.log('waiting for progress')
"
data-actions-on-progress-end="
  console.log('progress finished')
"
```
</details><details><summary><b>&lt;template is="e-wrapper"&gt;</b></summary>
  
Template with `is="e-wrapper"` attribute is very powerful element which you can use for wrapping your dynamic content with some base static template.

So, let's say you have basic static template in your app:

```html
<div>
  <p>
    Header content
  </p>
  <p id="dynamic-content">
    <span>Default content</span>
  </p>
  <p>
    Footer content
  </p>
</div> 
```

Then you can use this static template as a warapper in other pages

```html
<body>
  <template 
    is="e-wrapper" 
    data-src="/html/wrapper.html" 
    data-where-to-place="#dynamic-content" 
    data-how-to-place="instead">
    <p>
      Variation of content
    </p>
  </template>
</body>
```

Attribute `data-src` specifies a path where base static template is served. By attribute `data-where-to-place` you specify which element from the template you want to wrap or replace with the content inside of `e-wrapper` template.

You can aso specify the way how it can be wrapped via `data-how-to-place` attribute with one of the possible values: 'instead', 'before' and 'after'. If you use option 'instead', element by selector in attribute `data-where-to-place` will be just replaced with content in your template `e-wrapper`. By using 'before' option, content in `e-wrapper` will be placed before the first element with selector in the attribute `data-where-to-place`. By using 'after' option, the content will be placed after the element. And by using 'inside' option, the content will be placed inside the element.

So, your page with `e-wrapper` in this case will be rendered like

```html
<body>
  <div>
    <p>
      Header content
    </p>
    <p>
      Variation of content
    </p>
    <p>
      Footer content
    </p>
  </div>
</body>
```

You can also use `data-headers` attribute, if needed.

You can also add attributes `data-actions-on-progress-start` and `data-actions-on-progress-end`, where you can do some actions while waiting for response:
```html
data-actions-on-progress-start="
  console.log('waiting for progress')
"
data-actions-on-progress-end="
  console.log('progress finished')
"
```
</details><details><summary><b>&lt;e-json-view&gt;</b></summary>
  
If you just want to display **JSON** in pretty html format, then use `e-json-view` tag. You can find example [here](https://github.com/Guseyn/EHTML/tree/master/examples/static/html/e-json-view.html).

You can also add attributes `data-actions-on-progress-start` and `data-actions-on-progress-end`, where you can do some actions while waiting for response:
```html
data-actions-on-progress-start="
  console.log('waiting for progress')
"
data-actions-on-progress-end="
  console.log('progress finished')
"
```
</details><details><summary><b>&lt;template is="e-ws"&gt;</b></summary>
  
**EHTML** provides a very convenient way to manage Web Sockets in your HTML code. **&lt;template is="e-ws"&gt;** allows you to define a client for a socket connection and save it with a certain name. Then you can use **&lt;e-json&gt;**(or **&lt;template is="e-json"&gt;**) to fetch messages in **JSON** format as if you were working with simple **GET** requests. And finally, by using **&lt;e-form&gt;** you can send message to your web socket.

Let's take a look at very simple example:

```html
<img src="/images/ajax-icon" id="connection-icon"/>
<span id="connection-open-message" style="display">You are connected</span>
<template 
   is="e-ws" 
   data-src="ws://localhost:3000" 
   data-socket-name="mySocket"
   data-connection-icon="#connection-icon"
   data-actions-on-open-connection="
      showElms('#connetion-open-message')
   ">

  <!-- get messages (also possible to use <template is="e-json">) -->
  <e-json
    data-socket="mySocket"
    data-response-name="socketMessage"
    data-actions-on-response="
     mapToTemplate('#someTemplate', socketMessage)
    "
  >
    <template
      is="e-reusable"
      id="someTemplate"
      data-object-name="message">
       <span data-text="${message.user}"></span>
       <span data-text="${message.text}"></span>
    </template>
  </e-json>
  
   <!-- send messages -->
  <e-form>
    <input type="text" name="userName"></input>
    <textarea name="messageText"></textarea>
    <button
      data-socket="mySocket"
      onclick="this.form.submit(this)">
    </button>
  </e-form>
 
</template>

```

We start by declaring **&lt;template is="e-ws"&gt;**. The reason for using a template instead of just **&lt;e-ws&gt;** is crucial for determining other elements like**&lt;e-json&gt;** and **&lt;e-form&gt;** that must be rendered. Therefore, we enforce this by using **&lt;template&gt;**. You can use the attribute `data-connection-icon` to specify the progress icon while connections are being established. You can also run additional actions in `data-actions-on-open-connection` and `data-actions-on-close-connection`. The most important attribute in this element is `data-socket-name`. You will be able to refer to this socket name as the source of your incoming messages and also as the destination where you can send messages to.

Inside of **&lt;template is="e-ws"&gt;** we declare **&lt;e-json&gt;**(also possible with **&lt;template is="e-json"&gt;**), where we are using attribute `data-socket`. This informs **&lt;e-json&gt;** that, instead of the usual `data-src` attribute used for regular HTTP requests, we expect incoming messages in **JSON** format from the specified socket. Other things remain the same, such as `data-response-name` where you declare a variable for your response that you can use in `data-actions-on-response`.

Additionally, as shown, we can declare **&lt;e-form&gt;** for sending messages to the socket in **JSON**. All that's needed is to declare the attribute `data-socket` where we refer to our socket. Also, there is a property `isValid` in the form that you can use in event listeners:

```html
<button
  data-socket="mySocket"
  onclick="
    // no need to check on isValid, since form can be submitted only if it's valid
    this.form.submit(this)
    if (this.form.isValid) {
      // do some other actions
    }
  ">
</button>
```

You can declare as many clients for the socket as you wish on one page. [In this example](/html/examples/simple-ws.html), you can see a very simple chat app.

You have access to `event` variable in `data-actions-on-open-connection` and `data-actions-on-close-connection`:

```html
data-actions-on-open-connection="
  console.log('connection is opened', event)
"
data-actions-on-close-connection="
  console.log('connection is closed', event.code, event.reason)
"
```

You can also add attributes `data-actions-on-progress-start` and `data-actions-on-progress-end`, where you can do some actions while waiting for response:
```html
data-actions-on-progress-start="
  console.log('waiting for progress')
"
data-actions-on-progress-end="
  console.log('progress finished')
"
```
</details>

# thisElement in elements

You can use `thisElement` in attributes of any element to easily access information about other attributes:

```html
<div data-count="2" data-text="Count: ${thisElement.getAttribute('data-count')}"></div>
```

It will be rendered like:

```html
<div data-count="2">Count: 2</div>
```

<!-- <details><summary><b>&lt;e-a&gt;</b></summary>

You can turn your links into turbo-links:

```html
<e-a
  data-href="/some/url"
  data-actions-on-progress-start="
    document.body.classList.toggle('progress-opacity')
  "
  data-actions-on-progress-end="
    document.body.classList.toggle('progress-opacity')
  ">
  Text Link
</e-a>
```

The element above will be rendered as link `a` with `is="e-a"`:

```html
<a
  is="e-a"
  href="/some/url"
  data-actions-on-progress-start="
    document.body.classList.toggle('progress-opacity')
  "
  data-actions-on-progress-end="
    document.body.classList.toggle('progress-opacity')
  ">
  Text Link
</a>
```

Each time you click on `e-a`, it will create an AJAX request to load your page instead of redirecting to it. It will merge current `head` with the `head` from the linked page, and it will replace the `body` with a new one. You can also add some loading effects in `data-actions-on-progress-start` and `data-actions-on-progress-end`. The History API (with scroll positions) is also handled automatically by `e-a`, as if were regular links.

</details> -->

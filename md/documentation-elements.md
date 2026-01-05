# Supported Elements

<details><summary><b>&lt;e-html&gt;</b></summary>

`<e-html>` lets you break large HTML pages into smaller, maintainable modules and load them directly into the DOM with no bundler, no build step, and no preprocessing. It works like an HTML-native “import” statement: the browser fetches the file, EHTML activates it, and your UI grows organically from simple pieces.

### Example: Splitting one page into multiple HTML modules

```html
<body>
  <e-html data-src="/html/intro.html"></e-html>
  <e-html data-src="/html/chapters.html"></e-html>
  <e-html data-src="/html/footer.html"></e-html>
</body>
```

Each `<e-html>` references a standalone HTML file:

**intro.html**
```html
<section>
  <h1>Welcome to My Book</h1>
  <p>A simple intro loaded on demand.</p>
</section>
```

When rendered, the modules appear exactly as if they were written inline:

```html
<body>
  <section>
    <h1>Welcome to My Book</h1>
    <p>A simple intro loaded on demand.</p>
  </section>

  <!-- chapters.html content -->
  <!-- footer.html content -->
</body>
```

This keeps large projects readable: instead of scrolling through one giant file, you edit only the module responsible for the content you want to change.

### Performance Notes

Yes, `<e-html>` makes one HTTP request per module — but you can make browsers cache these files. Once cached, modules load instantly, which can actually make very large pages feel faster.

### Optional: Progress Actions

You can attach actions that run while the file is loading:

```html
<e-html
  data-src="/html/intro.html"
  data-actions-on-progress-start="console.log('loading...')"
  data-actions-on-progress-end="console.log('loaded')"
></e-html>
```

</details><details><summary><b>&lt;template is="e-wrapper"&gt;</b></summary>

`<template is="e-wrapper">` lets you take a static HTML template and “wrap” dynamic content into it. It’s useful when multiple pages share the same structure but differ in only one or two places.

### Example: A base layout

```html
<div>
  <p>Header</p>
  <p data-slot>Default content</p>
  <p>Footer</p>
</div>
```

### Using the wrapper

```html
<body>
  <template
    is="e-wrapper"
    data-src="/html/wrapper.html"
    data-where-to-place="[data-slot]"
    data-how-to-place="instead">
    <p>Dynamic content</p>
  </template>
</body>
```

When rendered, the wrapper replaces the slot with your custom content:

```html
<body>
  <div>
    <p>Header</p>
    <p>Dynamic content</p>
    <p>Footer</p>
  </div>
</body>
```

### How it works

- `data-src` — path to the static wrapper HTML.  
- `data-where-to-place` — a selector pointing to the element inside the wrapper you want to target.  
- `data-how-to-place` — how your content is inserted. Options:
  - **instead** — replace the target element  
  - **inside** — insert your content *inside* the target  
  - **before** — place content before the target  
  - **after** — place content after the target  

### Optional: progress actions

```html
data-actions-on-progress-start="console.log('loading')"
data-actions-on-progress-end="console.log('done')"
```

</details><details><summary><b>&lt;e-json&gt;</b></summary>

`<e-json>` fetches a **JSON** resource with a **GET** request and lets you run actions on the response.

### Basic example

Assume `/album/Humbug` returns:

```json
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

You can fetch it like this:

```html
<e-json
  data-src="/album/Humbug"
  data-response-name="albumResponse"
  data-actions-on-response="
    mapToTemplate('#album-info', albumResponse.body)
  ">

  <template id="album-info" data-object-name="album">
    <p data-text="Title: ${album.title}"></p>
    <p data-text="Artist: ${album.artist}"></p>
    <p data-text="Type: ${album.type}"></p>
    <p data-text="Release date: ${album.releaseDate}"></p>
    <p data-text="Genre: ${album.genre}"></p>
    <p data-text="Length: ${album.length}"></p>
    <p data-text="Label: ${album.label}"></p>
    <p data-text="Producer: ${album.producer}"></p>
  </template>
</e-json>
```

- `data-src` — where the JSON is fetched from.  
- `data-response-name` — name of the response object, which contains `body`, `statusCode`, and `headers`.  
- `data-actions-on-response` — JavaScript code that runs after the response is received.  
- `data-object-name` — name of the object used inside the template.  

Here we call `mapToTemplate('#album-info', albumResponse.body)` to map `albumResponse.body` into the `<template>` with `id="album-info"`. `mapToTemplate` is a built-in EHTML function used inside `data-actions-on-response` to insert template content based on provided data; it is one of several built-in actions that will be covered in a dedicated section later.

---

### Dynamic URL

`data-src` supports expressions which are evaluated right before the request:

```html
<e-json
  data-src="/album/${currentAlbumTitle}"
  data-response-name="albumResponse"
  data-actions-on-response="
    mapToTemplate('#album-info', albumResponse.body)
  ">

  <template id="album-info" data-object-name="album">
    <p data-text="${album.title}"></p>
  </template>
</e-json>
```

---

### Request headers

In EHTML v3, `data-request-headers` must use the `${{ ... }}` format.

Example:

```html
<e-json
  data-src="/private/profile"
  data-request-headers="${{
    'authorization': `Bearer ${token}`,
    'x-client': 'ehtml'
  }}"
  data-response-name="profileResponse"
  data-actions-on-response="
    mapToTemplate('#profile', profileResponse.body)
  ">

  <template id="profile" data-object-name="user">
    <p data-text="${user.name}"></p>
  </template>
</e-json>
```

Notes:

- It must always be `${{ ... }}` — not plain JSON.  
- Keys must be strings.  
- Values can contain expressions like `` `Bearer ${token}` ``.  
- The final evaluated result must be a JavaScript object.

This ensures headers are constructed dynamically at evaluation time.

---

### Progress hooks

You can run actions while waiting for the response:

```html
<e-json
  data-src="/api/message"
  data-response-name="messageResponse"
  data-actions-on-progress-start="
    console.log('waiting for progress')
  "
  data-actions-on-progress-end="
    console.log('progress finished')
  "
  data-actions-on-response="
    mapToTemplate('#message', messageResponse.body)
  ">

  <template id="message" data-object-name="m">
    <p data-text="${m.text}"></p>
  </template>
</e-json>
```

You can also use `data-ajax-icon` and `data-progress-bar` as selectors for visual progress; see the examples page for concrete patterns.

---

### JavaScript in actions

In `data-actions-on-response` you can run any JavaScript directly, without `${...}`.  
In other attributes like `data-text` or `data-value`, you must use `${...}` because their content is evaluated back into a string.

---

### Caching

`<e-json>` can use a cached response instead of making a request.  
You define the cache **and** the source of the cache **in the same element**.

```html
<e-json
  data-src="/album/Humbug"
  data-cache-from="${window.getObjectFromSessionStorage('albumCache')}"
  data-response-name="albumResponse"
  data-actions-on-response="
    sessionStorage.setItem('albumCache', JSON.stringify(albumResponse));
    mapToTemplate('#album-info', albumResponse.body);
  ">

  <template id="album-info" data-object-name="album">
    <p data-text="${album.title}"></p>
  </template>
</e-json>
```

How it works:

- `data-cache-from` supplies a previously stored response object.  
- If it returns **null**, a real request is made.  
- If it returns a valid response object, `<e-json>` skips the request and uses the cached data.  
- In `data-actions-on-response`, you update the cache so the next evaluation of the same element can reuse it.

A helper for reading cache:

```js
window.getObjectFromSessionStorage = (key) => {
  const item = sessionStorage.getItem(key)
  return item ? JSON.parse(item) : null
}
```

To invalidate cache:

```js
sessionStorage.setItem('albumCache', null)
```

This keeps caching fully contained in a **single `<e-json>` element**.

---

### Internal State (`data-internal-state`)

`data-internal-state` lets you attach evaluated state directly to an element.  
EHTML evaluates the expression, assigns the result to `node.internalState`, and replaces the attribute value with a short message so the original code isn’t exposed in the DOM.

This is especially useful for custom elements and templates that need structured data without relying on global variables or extra attributes.

Example:

```html
<template
  is="user-card"
  data-internal-state="${{
    id: user.id,
    name: user.name,
    age: user.age
  }}">
</template>
```

Inside your custom element, you can now access:

```js
this.internalState.id
this.internalState.name
this.internalState.age
```

We will cover how custom elements consume `internalState` in a dedicated section later.

</details><details><summary><b>&lt;template is="e-json-map"&gt;</b></summary>

`<template is="e-json-map">` is a simplified version of `e-json` used when you only need to fetch JSON and map it directly into the template, without running actions.

Example response:

```json
{
  "title": "Humbug",
  "artist": "Arctic Monkeys"
}
```

Example usage:

```html
<template
  is="e-json-map"
  data-src="/album/Humbug"
  data-object-name="albumResponse">

  <p data-text="Title: ${albumResponse.body.title}"></p>
  <p data-text="Artist: ${albumResponse.body.artist}"></p>
</template>
```

Notes:

- You do **not** use `data-response-name` because this element does not expose `data-actions-on-response`.  
- You **must** define `data-object-name` so the response object can be used inside the template.  
- Progress attributes (`data-ajax-icon`, `data-progress-bar`, `data-actions-on-progress-start`, `data-actions-on-progress-end`) work the same way as in `<e-json>`.
- You can still use `data-cache-from` as in `e-json`
- You can attach attribute `data-reusable` to map the same e-json-map template multiple time by `mapToTemplate` function.

</details><details><summary><b>&lt;template is="e-for-each"&gt;</b></summary>

`<template is="e-for-each">` repeats its inner content for each item in a list you provide.  
It is used **inside another mapped template**, where the list already exists.

Example response:

```json
{
  "title": "Humbug",
  "artist": "Arctic Monkeys",
  "songs": [
    { "title": "My Propeller", "length": "3:27" },
    { "title": "Crying Lightning", "length": "3:43" }
  ]
}
```

Example usage:

```html
<e-json
  data-src="/album/Humbug/songs"
  data-response-name="res"
  data-actions-on-response="
    mapToTemplate('#album', res.body)
  ">

  <template id="album" data-object-name="album">

    <p data-text="${album.title}"></p>
    <p data-text="${album.artist}"></p>

    <p data-text="${album.songs.length} songs:"></p>

    <template
      is="e-for-each"
      data-list-to-iterate="${album.songs}"
      data-item-name="song">

      <p data-text="No. ${song.index}/${album.songs.length}"></p>
      <p data-text="${song.title}"></p>
      <p data-text="${song.length}"></p>

    </template>

  </template>
</e-json>
```

How it works:

- `data-list-to-iterate` — the list you want to loop through.  
- `data-item-name` — variable name for each item.  
- Each item also has an automatic `index` property (starting at 1).  
- The `<template>` is duplicated once per list item, replacing its own tag.

The output is the template repeated for each song.
</details><details><summary><b>&lt;template is="e-if"&gt;</b></summary>

`<template is="e-if">` conditionally displays its inner content while mapping an object.  
If the condition is **true**, the template is released; if **false**, nothing appears.

Example response:

```json
{
  "title": "Humbug",
  "artist": "Arctic Monkeys",
  "songs": [
    { "title": "My Propeller", "length": "3:27" },
    { "title": "Crying Lightning", "length": "3:43" },
    { "title": "Cornerstone", "length": "3:18" }
  ]
}
```

Example usage (show songs shorter than 3:30):

```html
<e-json
  data-src="/album/Humbug/songs"
  data-response-name="res"
  data-actions-on-response="
    mapToTemplate('#album', res.body)
  ">

  <template id="album" data-object-name="a">
    <p data-text="${a.title}"></p>
    <p data-text="${a.artist}"></p>

    <p>Songs shorter than 3:30:</p>

    <template
      is="e-for-each"
      data-list-to-iterate="${a.songs}"
      data-item-name="song">

      <template
        is="e-if"
        data-condition-to-display="${
          (song.length.split(':')[0] * 60 + song.length.split(':')[1] * 1) < 210
        }">

        <p data-text="No. ${song.index}/${a.songs.length}"></p>
        <p data-text="${song.title}"></p>
        <p data-text="${song.length}"></p>

      </template>

    </template>
  </template>
</e-json>
```

The element uses a single attribute:

- `data-condition-to-display` — expression evaluated to determine whether the template should render.

Only the items matching the condition appear in the output.

</details><details><summary><b>&lt;form is="e-form"&gt;</b></summary>

`<form is="e-form">` behaves like a normal HTML form but sends its data as a JSON object.  
All request information is defined on the submit button (or any other element), and the form fields produce a clean, structured request body automatically.

### Example

```html
<form is="e-form">

  <label>
    Title:
    <input type="text" name="title">
  </label>

  <fieldset>
    <legend>Type:</legend>

    <label>
      <input type="radio" name="type" value="studio album" checked>
      Studio album
    </label>

    <label>
      <input type="radio" name="type" value="live album">
      Live album
    </label>
  </fieldset>

  <label>
    Release date:
    <input type="date" name="releaseDate">
  </label>

  <fieldset>
    <legend>Genre:</legend>

    <label><input type="checkbox" name="genre" value="psychedelic rock"> Psychedelic rock</label>
    <label><input type="checkbox" name="genre" value="hard rock"> Hard rock</label>
    <label><input type="checkbox" name="genre" value="stoner rock"> Stoner rock</label>
    <label><input type="checkbox" name="genre" value="desert rock"> Desert rock</label>
  </fieldset>

  <label>
    Length:
    <input type="time" name="length">
  </label>

  <label>
    Producer:
    <input type="text" name="producer">
  </label>

  <button
    data-request-url="/artist/Arctic_Monkeys/albums/add"
    data-request-method="POST"
    data-request-headers="${{
      'authorization': `Bearer ${token}`
    }}"
    data-response-name="savedAlbum"
    data-ajax-icon="#ajax-icon"
    data-button-ajax-text="Saving…"
    data-button-ajax-class="loading"
    onclick="this.form.submit(this)"
    data-actions-on-response="console.log(savedAlbum)"
  >
    Submit
  </button>

  <img id="ajax-icon" src="/images/ajax-loader.gif" alt="loading" hidden>

  <div id="progress-bar" hidden></div>
  <div id="upload-progress-bar" hidden></div>

</form>
```

---

### Key ideas

- Each field must have a **name** — it becomes a key in the JSON body.
- The submit button defines:
  - `data-request-url`
  - `data-request-method`
  - `data-request-headers="${{ ... }}"`
  - `data-response-name`
  - all optional UX helpers (see below)
- The request is sent with:  
  `onclick="this.form.submit(this)"`

The resulting JSON body is constructed from form fields automatically.

---

### Dynamic URL example

```html
data-request-url="/artist/${selectedArtist}/albums/add"
```

---

### Validation

Supported attributes include:

- `required`
- `data-validation-pattern`
- `data-validation-error-class-for-element`
- `data-validation-error-class-for-message-box`
- `data-validation-bad-format-error-message`
- `data-validation-min-files-number`

A dedicated validation section will explain these in detail.

---

### Optional features

- **`unchecked-value`** — value to assign when a checkbox is not checked.  
- **`data-is-query-param`** — moves a field into the URL query string instead of the JSON body.  
- **`data-download-response-body-as-file-with-name="file.zip"`** — treats the server response body as a downloadable file.

---

### Optional UX helpers

All apply to the submit element:

- **`data-ajax-icon`** — selector for an element that becomes visible during the request.
- **`data-progress-bar`** — selector for a progress bar showing overall request progress.
- **`data-upload-progress-bar`** — selector for a progress bar showing upload progress only.
- **`data-button-ajax-text`** — temporary button text while the request is running.
- **`data-button-ajax-class`** — temporary CSS class applied during request.

These let you show loading states, disable UI, display progress, or change button appearance.

---

### Progress hooks

```html
data-actions-on-progress-start="console.log('waiting…')"
data-actions-on-progress-end="console.log('done')"
```

These run at the start and end of the request respectively.

---

### Echo endpoint

You can POST to:

```html
data-request-url="echo/request/body"
```

This returns exactly the JSON body sent by the form — useful for debugging, previewing payload structure, or validating form logic without needing a server.
</details><details><summary><b>&lt;e-form-dynamic-value&gt;</b></summary>

`<e-form-dynamic-value>` lets you include values in an `e-form` that must be evaluated **only at the moment the form is submitted**.  
EHTML normally binds values statically, but this element allows you to bind data stored in memory, global variables, or `localStorage`/`sessionStorage` dynamically.

Example:

```html
<form is="e-form">
  …
  <e-form-dynamic-value
    name="currentDate"
    data-bound-to="${new Date().toISOString()}"
  ></e-form-dynamic-value>
  …
</form>
```

When the user submits the form, the expression inside `data-bound-to` is evaluated and included in the JSON request body under the given `name`.

A dedicated section with more examples will be provided later.

</details><details><summary><b>&lt;e-form-object&gt; and &lt;e-form-array&gt;</b></summary>

Custom elements `e-form-object` and `e-form-array` extend the power of `e-form` by allowing you to build complex and nested JSON structures directly from your HTML form.

**e-form-object**

The `e-form-object` element lets you group multiple related inputs into a single JSON object.  
Every input, select, checkbox, or textarea inside the object will contribute to a key–value pair in that nested object.

For example, imagine you want to send the following JSON:

```json
{
  "artist": {
    "name": "Arctic Monkeys",
    "genre": "indie rock",
    "yearStarted": 2002
  }
}
```

You can achieve this with:

```html
<e-form>
  <e-form-object name="artist">
    <label>
      Name:
      <input type="text" name="name" value="Arctic Monkeys">
    </label>
    <label>
      Genre:
      <input type="text" name="genre" value="indie rock">
    </label>
    <label>
      Year Started:
      <input type="number" name="yearStarted" value="2002">
    </label>
  </e-form-object>

  <button
    data-request-url="/artist/add"
    data-request-method="POST"
    data-response-name="createdArtist"
    onclick="this.form.submit(this)"
    data-actions-on-response="console.log(createdArtist)"
  >
    Add Artist
  </button>
</e-form>
```

When submitted, the `e-form-object` will automatically be serialized into a nested JSON object under its name attribute.

You can nest `e-form-object` elements inside each other as deeply as you like.
Each nesting level will correspond to another nested object in the resulting JSON structure.

**e-form-array**

The e-form-array element allows you to define an array of objects or values within your form.
Each e-form-object inside the array becomes one item of that array.

For example, if your expected request body looks like this:

```json
{
  "albums": [
    {
      "title": "AM",
      "year": 2013
    },
    {
      "title": "Tranquility Base Hotel & Casino",
      "year": 2018
    }
  ]
}
```

You can write:

```html
<e-form>
  <e-form-array name="albums">
    <e-form-object>
      <label>
        Title:
        <input type="text" name="title" value="AM">
      </label>
      <label>
        Year:
        <input type="number" name="year" value="2013">
      </label>
    </e-form-object>

    <e-form-object>
      <label>
        Title:
        <input type="text" name="title" value="Tranquility Base Hotel & Casino">
      </label>
      <label>
        Year:
        <input type="number" name="year" value="2018">
      </label>
    </e-form-object>
  </e-form-array>

  <button
    data-request-url="/artist/Arctic_Monkeys/albums/add"
    data-request-method="POST"
    data-response-name="addedAlbums"
    onclick="this.form.submit(this)"
    data-actions-on-response="console.log(addedAlbums)"
  >
    Add Albums
  </button>
</e-form>
```

When submitted, the e-form-array will serialize its contents into a JSON array under the key specified in its name attribute.

**Note:**  
The main `e-form` does **not** include the input fields from nested `e-form` elements inside it when constructing its request body.  
Each `e-form` works independently — meaning if you have multiple `e-form` elements on the same page (or one inside another), each will only serialize and submit its **own** inputs, selects, and textareas.  
  
This separation ensures that every `e-form` can handle its own request, validation, and response actions without interfering with other forms or nested data structures on the page.

</details><details><summary><b>&lt;template is="e-reusable"&gt;</b></summary>

You use action `mapToTemplate` on a template with attribute `is="e-reusable"`, so you can map response object multiple times. Also you can specify attribute `data-append-to="#someSelector"` or `data-prepend-to="#someSelector"` to decide where and how mapped content of the template should be placed. If you don't specify one of these attributes, then mapped content of the template will be placed right before the template.

So, the main difference between "reusable" template and other types of templates is that "reusable" template is not getting removed from the DOM, so you can use it several times.

More details you can find in this [example](/html/examples/e-reusable-with-e-form.html).

You can use `data-insert-into="#someSelector"` attribute in reusable template. This allows you to replace content of released template from previuos mapping with new mapped content of template.

</details><details><summary><b>&lt;e-local-storage-value&gt; and &lt;e-session-storage-value&gt;</b></summary>

`<e-local-storage-value>` and `<e-session-storage-value>` allow you to automatically inject values from `localStorage` or `sessionStorage` into an `e-form` request body.  
They behave like input fields: each has a **name** and a **value**, but instead of user input, the value is retrieved directly from storage using the key provided in `data-key`.

Example using **localStorage**:

```html
<form is="e-form">
  
  <e-local-storage-value
    name="jwt"
    data-key="jwtToken"
  ></e-local-storage-value>

  <button
    data-request-url="/verify"
    data-request-method="POST"
    data-request-headers="${{}}"
    data-ajax-icon="#ajaxIcon"
    data-response-name="response"
    onclick="this.form.submit(this)"
    data-actions-on-response="console.log('response:', response)"
  >
    Verify
  </button>

  <img id="ajaxIcon" src="/images/ajax-loader.gif" alt="loading" hidden>

</form>
```

Resulting request body:

```json
{
  "jwt": "value stored under localStorage key 'jwtToken'"
}
```

It behaves as if EHTML did this internally:

```js
localStorage.getItem('jwtToken')
```

---

### Session storage equivalent

```html
<form is="e-form">
  
  <e-session-storage-value
    name="sessionToken"
    data-key="token"
  ></e-session-storage-value>

  <button
    data-request-url="/verify"
    data-request-method="POST"
    data-request-headers="${{}}"
    data-ajax-icon="#ajaxIcon"
    data-response-name="response"
    onclick="this.form.submit(this)"
    data-actions-on-response="console.log('response:', response)"
  >
    Verify
  </button>

  <img id="ajaxIcon" src="/images/ajax-loader.gif" alt="loading" hidden>

</form>
```

Request body:

```json
{
  "sessionToken": "value stored under sessionStorage key 'token'"
}
```

---

You can also access storage values directly inside attributes anywhere in EHTML:

```html
<div data-text="Token: ${localStorage.getItem('jwtToken')}"></div>
<div data-text="Session: ${sessionStorage.getItem('sessionId')}"></div>
```

These storage-value elements help keep forms clean and eliminate hidden input fields that would normally be needed for passing tokens or other cached values.

</details><details><summary><b>&lt;template is="e-page-with-url"&gt;</b></summary>

`<template is="e-page-with-url">` lets you extract URL parameters and use them anywhere inside the template through the `urlParams` object.  
It activates first, initializes `urlParams`, and then renders everything inside it with the correct dynamic values.

### Basic example

```html
<body>
  <template is="e-page-with-url" data-url-pattern="/album/{title}">
    <!-- content -->
  </template>
</body>
```

### Query-parameter example

```html
<body>
  <template is="e-page-with-url" data-url-pattern="/artists?{search}">
    <!-- content -->
  </template>
</body>
```

### Using URL parameters inside attributes

Any element inside the template can access URL parameters via:

```html
some-attr="${urlParams.paramName}"
```

Example:

```html
<body>
  <template is="e-page-with-url" data-url-pattern="/album/{title}">
    <div data-text="Album title: ${urlParams.title}"></div>
  </template>
</body>
```

If the user opens:

```
http://0.0.0.0:8000/album/Humbug
```

This will render:

```html
<body>
  <div>Album title: Humbug</div>
</body>
```

### Placement requirement

`e-page-with-url` **should be placed at the beginning of `<body>`**, and everything that depends on `urlParams` must be inside it.  
This is because EHTML needs to initialize `urlParams` *before* activating any elements that use them.
</details><details><summary><b>&lt;select is="e-select"&gt;</b></summary>

`<select is="e-select">` behaves like a normal `<select>`, but with one important improvement:  
it can automatically select a value on render based on its `value` attribute.

### Example

```html
<select is="e-select" name="color" value="green">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</select>
```

On render, EHTML finds the option matching the `value` attribute (`"green"`) and marks it as selected.  
The element is transformed into a normal `<select>` with `data-e-select="true"` added internally, but you write it declaratively and cleanly.

This is especially useful when:

- you pre-fill forms with data loaded from the server,  
- you restore form state from storage,  
- you want predictable default selections without manually setting `selected`.

More details will be shown in a dedicated example.

</details><details><summary><b>&lt;e-svg&gt;</b></summary>

`<e-svg>` lets you load external SVG files directly into the DOM as **inline SVG**, not as an `<img>`.  
This means the SVG becomes fully styleable and scriptable—just like if you had pasted it manually.

### Basic example

```html
<body>
  <e-svg data-src="/images/logo.svg"></e-svg>
</body>
```

If `/images/logo.svg` contains:

```html
<svg width="200" height="200">
  <circle cx="100" cy="100" r="80" fill="gold"></circle>
</svg>
```

Then after loading, your page will render:

```html
<body>
  <svg width="200" height="200">
    <circle cx="100" cy="100" r="80" fill="gold"></circle>
  </svg>
</body>
```

The contents are inserted **as real DOM nodes**, not as text, giving you full control:

- You can style the SVG with CSS.
- You can modify parts of it with JavaScript.
- You can animate elements inside the SVG.
- You can attach event listeners to inner shapes.

---

### Progress hooks

As with `e-json` and `e-form`, you can add:

```html
data-actions-on-progress-start="console.log('loading…')"
data-actions-on-progress-end="console.log('done')"
```

These let you show spinners, dim UI, or animate transitions while the SVG loads.

More details will be provided in a dedicated example.

</details><details><summary><b>&lt;e-markdown&gt;</b></summary>

`<e-markdown>` lets you load a Markdown file from the server and render it directly as HTML.

### Basic example

```html
<body>
  <e-markdown data-src="/md/article.md"></e-markdown>
</body>
```

If `/md/article.md` contains:

```md
# Title
```

Then after loading, your page will render:

```html
<body>
  <h1>Title</h1>
</body>
```

The Markdown is converted into proper HTML nodes, not injected as text.

---

### Syntax highlighting

Enable code highlighting for fenced code blocks:

```html
<e-markdown
  data-src="/md/tutorial.md"
  data-apply-code-highlighting="true"
></e-markdown>
```

This applies syntax highlighting using the built-in integration with your selected highlighter.

---

### LaTeX support

To enable LaTeX rendering inside Markdown:

```html
<e-markdown
  data-src="/md/math.md"
  data-apply-latex="true"
></e-markdown>
```

To ensure correct display across browsers, add the following in `<head>`:

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" crossorigin="anonymous">

  <script>
    window.WebFontConfig = {
      custom: {
        families: [
          'KaTeX_AMS', 'KaTeX_Caligraphic:n4,n7', 'KaTeX_Fraktur:n4,n7',
          'KaTeX_Main:n4,n7,i4,i7', 'KaTeX_Math:i4,i7', 'KaTeX_Script',
          'KaTeX_SansSerif:n4,n7,i4', 'KaTeX_Size1', 'KaTeX_Size2',
          'KaTeX_Size3', 'KaTeX_Size4', 'KaTeX_Typewriter'
        ],
      },
    };
  </script>

  <script
    defer
    src="https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.js"
    crossorigin="anonymous">
  </script>
</head>
```

**Important:** Ensure you don’t have conflicting CSS class names such as `.base`, which may interfere with KaTeX.

---

### Progress hooks

```html
data-actions-on-progress-start="console.log('loading…')"
data-actions-on-progress-end="console.log('markdown loaded')"
```

These allow you to show spinners, apply dimming, or implement any loading UI while the Markdown is fetched and converted.

More examples will be included in a dedicated section.

### Using data-internal-state

If you just set markdown text in `data-internal-state` attribute by `mapToTemplate`, it will render that markdown as HTML.

</details><details><summary><b>&lt;e-json-view&gt;</b></summary>

`<e-json-view>` lets you fetch a JSON resource and display it in a clean, formatted, human-readable way—perfect for debugging, admin pages, or API inspection tools.  
It automatically renders objects and arrays into expandable HTML blocks.

### Basic example

```html
<e-json-view data-src="/api/debug/info"></e-json-view>
```

If the endpoint returns JSON, the element will display it as structured, pretty HTML without requiring templates or actions.

This is ideal when you simply want to *view* JSON, not map it to templates or extract fields.

---

### Progress hooks

```html
data-actions-on-progress-start="console.log('loading…')"
data-actions-on-progress-end="console.log('done')"
```

These allow you to show loaders or update the UI while the JSON is being fetched.

A full example will be included in the documentation.

</details><details><summary><b>&lt;template is="e-ws"&gt;</b></summary>

`<template is="e-ws">` provides a complete WebSocket workflow inside HTML.  
It establishes a WebSocket connection, gives it a name, and allows other EHTML elements inside it—such as `<e-json>` and `<form is="e-form">`—to **receive** and **send** JSON messages through that socket.

Using a `<template>` is required because `e-ws` must initialize **before** the inner elements are activated.

---

### Full example

```html
<img src="/images/ajax-icon" id="connection-icon" alt="connecting">

<span id="connection-open-message" style="display:none">
  You are connected
</span>

<template
  is="e-ws"
  data-src="ws://localhost:3000"
  data-socket-name="mySocket"
  data-connection-icon="#connection-icon"
  data-actions-on-open-connection="
    showElms('#connection-open-message')
  "
>

  <!-- Receive messages -->
  <e-json
    data-socket="mySocket"
    data-response-name="socketMessage"
    data-actions-on-response="
      mapToTemplate('#msg', socketMessage)
    "
  >
    <template
      is="e-reusable"
      id="msg"
      data-object-name="message"
    >
      <span data-text="${message.user}"></span>
      <span data-text="${message.text}"></span>
    </template>
  </e-json>

  <!-- Send messages -->
  <form is="e-form">
    <label>
      User:
      <input type="text" name="userName">
    </label>

    <label>
      Message:
      <textarea name="messageText"></textarea>
    </label>

    <button
      data-socket="mySocket"
      onclick="this.form.submit(this)"
    >
      Send
    </button>
  </form>

</template>
```

---

### How it works

#### **1. Declaring the WebSocket client**
```html
<template is="e-ws" data-src="ws://..." data-socket-name="mySocket">
```

- `data-src` — WebSocket URL  
- `data-socket-name` — unique name under which EHTML stores this socket  
- Other EHTML components refer to this socket by name

You can create *multiple* WebSocket clients on the same page by giving them different names.

---

### **2. Optional UI helpers**

- `data-connection-icon` — show/hide icon while connecting  
- `data-actions-on-open-connection` — runs when socket opens  
- `data-actions-on-close-connection` — runs when socket closes  

You have access to the WebSocket event as `event`:

```html
data-actions-on-open-connection="
  console.log('opened', event)
"
data-actions-on-close-connection="
  console.log('closed', event.code, event.reason)
"
```

---

### **3. Receiving messages with `<e-json>`**

Inside the WebSocket template, you can use:

```html
<e-json
  data-socket="mySocket"
  data-actions-on-response="...">
```

This means:

- Instead of fetching via HTTP (`data-src`),  
- It listens for incoming WebSocket messages,  
- Parses them as JSON,  
- And triggers `data-actions-on-response` exactly like an HTTP response.

You can use `<template is="e-json-map">` as well.

---

### **4. Sending messages with `<form is="e-form">`**

To send JSON through the socket:

```html
<button data-socket="mySocket" onclick="this.form.submit(this)">
```

The form’s JSON body becomes the WebSocket message.

You can also check form validity:

```html
if (this.form.isValid) {
  // safe to do more actions
}
```

---

### Notes

- You can define multiple independent WebSocket clients on a single page.  
- `<template is="e-ws">` must wrap everything that needs access to the socket.  

</details><details><summary><b>&lt;template is="e-sse"&gt;</b></summary>

`<template is="e-sse">` provides a complete Server-Sent Events workflow inside HTML.  
It establishes a EventSource instance, gives it a name, and allows other EHTML elements inside it—such as `<e-json>` or `<template is="e-json-map">`—to **receive** JSON structured events through that event source.

Using a `<template>` is required because `e-sse` must initialize **before** the inner elements are activated.

---

### Full example

```html
<img src="/images/ajax-icon" id="connection-icon" alt="connecting">

<span id="connection-open-message" style="display:none">
  You are connected
</span>

<template
  is="e-sse"
  data-src="http://localhost:3000"
  data-event-source-name="myEventSource"
  data-with-credentials="true"
  data-connection-icon="#connection-icon"
  data-actions-on-open-connection="
    showElms('#connection-open-message')
  "
>

  <!-- Receive messages on `specificEventType` (event: specificEventType) -->
  <e-json
    data-event-source="myEventSource"
    data-response-name="eventWithJSONData"
    data-event="specifictEventType"
    data-actions-on-response="
      mapToTemplate('#msg', eventWithJSONData)
    "
  >
    <template
      is="e-reusable"
      id="msg"
      data-object-name="message"
    >
      <span data-text="${message.user}"></span>
      <span data-text="${message.text}"></span>
    </template>
  </e-json>

  <!-- Receive messages on any event (no event: specified) -->
  <e-json
    data-event-source="myEventSource"
    data-response-name="eventWithJSONData"
    data-actions-on-response="
      mapToTemplate('#msg', eventWithJSONData)
    "
  >
    <template
      is="e-reusable"
      id="msg"
      data-object-name="message"
    >
      <span data-text="${message.user}"></span>
      <span data-text="${message.text}"></span>
    </template>
  </e-json>

</template>
```

---

### How it works

#### **1. Declaring the EventSource instance**
```html
<template is="e-ess" data-src="ws://..." data-event-source-name="myEventSource">
```

- `data-src` — EventSource URL  
- `data-event-source-name` — unique name under which EHTML stores this event source  
- Other EHTML components refer to this event source by name

You can create *multiple* EventSource instances on the same page by giving them different names.

---

### **2. Optional UI helpers**

- `data-connection-icon` — show/hide icon while connecting  
- `data-actions-on-open-connection` — runs event source opens  

You have access to the WebSocket event as `event`:

```html
data-actions-on-open-connection="
  console.log('opened', event)
"
```

---

### **3. Receiving events with `<e-json>`**

Inside the WebSocket template, you can use:

```html
<e-json 
  data-event-source="myEventSource"
  data-event="someSpecificEvent"
  data-actions-on-respons="...">
```

This means:

- Instead of fetching via HTTP (`data-src`),  
- It listens for incoming events, if you specify `data-event` attribute, then it will listen only to certain events, otherwise it will listen to all messages without event field 
- Parses them as JSON,  
- And triggers `data-actions-on-response` exactly like an HTTP response.

You can use `<template is="e-json-map">` as well.

---

### Notes

- You can define multiple independent EventSource instances on a single page.  
- `<template is="e-sse">` must wrap everything that needs access to the event source.

</details>

# `this` in elements

You can use `this` inside any EHTML-evaluated attribute to reference the element itself.  
This makes it easy to read or modify your own attributes without duplication.

# Using EHTML Expressions Inside Elements and Templates

Most of `${...}`` expressions inside attributes are evaluated during activation. Some others are evaulated under certain conditions depending on the logic of a certain element.

Most common attributes:
- `data-text` attribute inserts evaluated text inside of an element (in the beginning)
- `data-value` attaches evaluated value to input fields
- `data-src` evaluates src attribute of such elements as img, but you can also just use `src` attribute although it may result not in the best UX, since it src with `${...}` is not valid src
- `data-internal-state` allows you to set a state inside of your element, which you can access by `elm.internalState`
- `data-*` - you can use any custom attribute, but those will be just evaluated and inserted as attributes, unless there is any logic you may want to run inside of your [custom elements](#defining-custom-elements-in-ehtml-v3)

There are some other data attributes the different elements in EHTML utilize like `data-headers`, `data-actions-on-response`, etc. Action attributes are not really expressions but rather JS code where you can directly use state from the node scope.

Expressions in attributes can be evaluated on page load, but also when you call `mapToTemplate()`, `releaseTemplate()` functions.

You can also use attribute `data-attributes-to-ignore="data-some-attribute-1, data-some-attribute-2"`, where you can tell ETHML to not process attributes on start and evaluate those attributes inside of custom elements let's say, or just ignore them entirely if you want.

### Basic example

```html
<div
  data-count="2"
  data-text="Count: ${this.getAttribute('data-count')}"
></div>
```

Rendered result:

```html
<div data-count="2">Count: 2</div>
```

### Works beautifully with **data-internal-state**

Combining `this` with internal state attached to the form or button gives clean, component-like behavior:

```html
<form
  is="e-form"
  data-internal-state="${{ submissions: 0 }}"
>

  <button
    data-request-url="/api/save"
    data-request-method="POST"
    data-response-name="res"
    onclick="this.form.submit(this)"
    data-actions-on-response="
      this.form.internalState.submissions++;
      this.textContent = 'Saved (' + this.form.internalState.submissions + ')';
    "
  >
    Save
  </button>

</form>
```

Every time the user clicks **Save**, the counter stored in `internalState` increases and updates the UI.

You can also use `this` to easily access any attribute that was previously declared on the same element—making it simple to read configuration values, compare old and new states, or dynamically react to your own settings. For example, inside `data-actions-on-response`, you can retrieve values such as `this.getAttribute('data-user-id')`, `this.getAttribute('value')`, or `this.getAttribute('data-mode')` without repeating them elsewhere. This eliminates duplication, keeps logic self-contained, and allows each element to behave like a tiny component whose own attributes become its configuration API.

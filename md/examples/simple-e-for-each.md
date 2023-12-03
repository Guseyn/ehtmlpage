## Simple &lt;e-for-each&gt;

<details><summary><b>demo</b></summary>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=eQYHeahYaYE" target="_blank">
  <img class="youtube-video" src="http://img.youtube.com/vi/eQYHeahYaYE/0.jpg" width="450"/>
</a>
  
</details><details><summary><b>response</b></summary>

```bash
Request URL: http://localhost:8000/playlist
Request Method: GET
-------------------------------------------
Status Code: 200 ok
Content-Type: application/json
```
```json
{
  "title": "My playlist ♥",
  "photo":"/../images/guitar.svg",
  "songs":[
    { "title":"Nantes", "artist": "Beirut", "album": "The Flying Club Cup", "link": "https://genius.com/Beirut-nantes-lyrics" },
    { "title": "My Kind Of Woman", "artist": "Mac DeMarco", "album": "2", "link": "https://genius.com/Mac-demarco-my-kind-of-woman-lyrics" },
    { "title": "Black Treacle", "artist": "Arctic Monkeys", "album": "Suck It And See", "link": "https://genius.com/Arctic-monkeys-black-treacle-lyrics" },
    { "title": "Swing Low", "artist": "The Kooks","album":"Let's Go Sunshine", "link":"https://genius.com/The-kooks-swing-low-lyrics" },
    { "title": "Seen It All", "artist": "Jake Bugg", "album": "Jake Bugg", "link":"https://genius.com/Jake-bugg-seen-it-all-lyrics" }
  ]
}
```
</details>

```html
<body class="main">
  <div class="base">
    <e-json
      data-src="/../playlist"
      data-response-name="response"
      data-actions-on-response="
        mapToTemplate('#response-template', response.body)
      "
      data-ajax-icon="#ajax-icon"
    >
      <div class="response-box">
        <img class="ajax-icon" id="ajax-icon" src="/../images/ajax-icon.svg"/>
        <template id="response-template" data-object-name="playlist">
          <img class="photo" src="${playlist.photo}"/>
          <div class="playlist-info">
            <div class="song-title" data-text="${playlist.title}"></div>
            <div class="songs-box">
              <template is="e-for-each" data-list-to-iterate="${playlist.songs}" data-item-name="song">
                <div class="song-box">
                  <div><b>Title: </b><span data-text="${song.title}"></span></div>
                  <div><b>Artist: </b><span data-text="${song.artist}"></span></div>
                  <div><b>Album: </b><span data-text="${song.album}"></span></div>
                  <div><a href="${song.link}">More info</a><b></b></div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </e-json>
  </div> 
</body>
```
[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/src/simple-e-for-each.html)

[Next Example: Simple &lt;e-if&gt;](/html/examples/simple-e-if.html)

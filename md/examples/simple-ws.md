## Simple &lt;template is="e-ws"&gt;

<details><summary><b>demo</b></summary>

<a href="https://www.youtube.com/watch?v=iVbobWssiqA" target="_blank">
  <img class="youtube-video" src="http://img.youtube.com/vi/iVbobWssiqA/0.jpg" width="450"/>
</a>

</details><details><summary><b>incoming message</b></summary>

```json
{
  "userName": "Alice",
  "userColor": "#ff9ff3",
  "messageText": "message"
}
```

</details></details><details><summary><b>outcoming message</b></summary>

```json
{
  "userName": "Bob",
  "userColor": "#54a0ff",
  "messageText": "message"
}
```

</details>

```html
<template 
 is="e-ws" 
 data-src="ws://localhost:4200" 
 data-socket-name="firstSocket"
 data-actions-on-open-connection="
    showElms('#connetion-open-message-1', '#connetion-open-message-2')
  "
>
  <div class="iphone">
    <span id="connection-open-message-1" class="connection-open-message">You are connected (Alice)</span>
    <div class="brove"><span class="speaker"></span></div>
    <div class="screen first"></div>
    <div class="message-box" id="message-box-1"></div> 
    <!-- get messages (also possible to use <template is="e-json">) -->
    <e-json
      data-socket="firstSocket"
      data-response-name="socketMessageFromFirstIPhone"
      data-actions-on-response="
       mapToTemplate('#message-1', socketMessageFromFirstIPhone)
       const messageBox = document.getElementById('message-box-1')
       messageBox.scrollTop = messageBox.scrollHeight
    ">
      <template
        is="e-reusable"
        id="message-1"
        data-append-to="#message-box-1"
        data-object-name="messageFromFirstIPhone"
      >
        <div class="message-cloud" style="background-color: ${messageFromFirstIPhone.userColor}">
          <b data-text="${messageFromFirstIPhone.userName}"></b><br>
          <span data-text="${messageFromFirstIPhone.messageText}"></span>
        </div>
      </template>
    </e-json>
     <!-- send messages -->
    <e-form>
      <input type="hidden" name="userName" value="Alice"></input>
      <input type="hidden" name="userColor" value="#ff9ff3"></input>
      <textarea id="message-text-1" placeholder="Type your message..." name="messageText"></textarea>
      <button
        data-socket="firstSocket"
        onclick="
          this.form.submit(this)
          mapToTemplate('#message-1', {
            userName: 'Alice',
            userColor: '#ff9ff3',
            messageText: document.querySelector('#message-text-1').value
          })
          changeValueOf('#message-text-1', '')
          const messageBox = document.getElementById('message-box-1')
          messageBox.scrollTop = messageBox.scrollHeight
        ">
        SEND
      </button>
    </e-form>
  </div>
</template>

<template
  is="e-ws" 
  data-src="ws://localhost:4200" 
  data-socket-name="secondSocket"
  data-actions-on-open-connection="
    showElms('#connetion-open-message-1', '#connetion-open-message-2')
  "
>
  <div class="iphone">
    <span id="connection-open-message-2" class="connection-open-message">You are connected (Bob)</span>
    <div class="brove"><span class="speaker"></span></div>
    <div class="screen second"></div>
    <div class="message-box" id="message-box-2"></div> 
    <!-- get messages (also possible to use <template is="e-json">) -->
    <e-json
      data-socket="secondSocket"
      data-response-name="socketMessageFromSecondIPhone"
      data-actions-on-response="
        mapToTemplate('#message-2', socketMessageFromSecondIPhone)
        const messageBox = document.getElementById('message-box-2')
        messageBox.scrollTop = messageBox.scrollHeight
    ">
      <template
        is="e-reusable"
        id="message-2"
        data-append-to="#message-box-2"
        data-object-name="messageFromSecondIPhone"
      >
        <div class="message-cloud" style="background-color: ${messageFromSecondIPhone.userColor}">
          <b data-text="${messageFromSecondIPhone.userName}"></b><br>
          <span data-text="${messageFromSecondIPhone.messageText}"></span>
        </div>
      </template>
    </e-json>
     <!-- send messages -->
    <e-form>
      <input type="hidden" name="userName" value="Bob"></input>
      <input type="hidden" name="userColor" value="#54a0ff"></input>
      <textarea id="message-text-2" placeholder="Type your message..." name="messageText"></textarea>
      <button
        data-socket="secondSocket"
        onclick="
          this.form.submit(this)
          mapToTemplate('#message-2', {
            userName: 'Bob',
            userColor: '#54a0ff',
            messageText: document.querySelector('#message-text-2').value
          })
          changeValueOf('#message-text-2', '')
          const messageBox = document.getElementById('message-box-2')
          messageBox.scrollTop = messageBox.scrollHeight
        ">
        SEND
      </button>
    </e-form>
  </div>
</template>
```
[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/src/simple-ws.html)

[Start over: Simple &lt;e-html&gt;](/html/examples/simple-e-html.html)

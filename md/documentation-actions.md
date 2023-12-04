# Provided Actions On AJAX Response

<details><summary><b>insertHTMLInto</b></summary>

This action allows you to insert some **HTML** into some element by a query selector:

```js
data-actions-on-response="
	insertHTMLInto('#some-id', someHTML)
"
```

</details><details><summary><b>addHTMLInto</b></summary>

This action allows you to append some **HTML** into some element by a query selector:

```js
data-actions-on-response="
	addHTMLInto('#some-id', someHTML)
"
```

</details><details><summary><b>loadHTMLInto</b></summary>

This action allows you to load **HTML** from some external source and insert it into some element by some query selector:

```
data-actions-on-response='
  loadHTMLInto("#some-id", "https://some/url/with/html", { "name": "value" })
'
```

</details><details><summary><b>loadHTMLAndAddInto</b></summary>

This action allows you to load **HTML** from some external source and append it into some element by some query selector:

```
data-actions-on-response='
  loadAndAddHTMLInto("#some-id", "https://some/url/with/html", { "name": "value" })
'
```

</details><details><summary><b>insertTextInto</b></summary>

This action allows you to insert some text into some element by a query selector:

```js
data-actions-on-response="
	insertTextInto('#some-id', someText)
"
```

</details><details><summary><b>addTextInto</b></summary>

This action allows you to append some text into some element by a query selector:

```js
data-actions-on-response="
	addTextInto('#some-id', someText)
"
```

</details><details><summary><b>loadTextInto</b></summary>

This action allows you to load text from some external source and insert it into some element by some query selector:

```
data-actions-on-response='
  loadTextInto("#some-id", "https://some/url/with/text", { "name": "value" })
'
```

</details><details><summary><b>loadAndAddTextInto</b></summary>

This action allows you to load text from some external source and append it into some element by some query selector:

```
data-actions-on-response='
  loadAndAddTextInto("#some-id", "https://some/url/with/text", { "name": "value" })
'
```

</details><details><summary><b>mapToTemplate</b></summary>

This action allows you to map an object from response (or just in memory) to some template by some query selector:

```js
data-actions-on-response="
  mapToTemplate('#some-template-id', someObjectFromResponse)
"
```

</details><details><summary><b>showElms</b></summary>

This action allows you to show elements by some query selectors:

```js
data-actions-on-response="
  showElms('.some-class", '.some-another-class')
"
```

</details><details><summary><b>hideElms</b></summary>

This action allows you to hide elements by some query selectors:

```js
data-actions-on-response="
  hideElms('.some-class', '.some-another-class')
"
```

</details><details><summary><b>enableElms</b></summary>

This action allows you to enable elements by some query selectors:

```js
data-actions-on-response="
  enableElms('.some-class', '.some-another-class')
"
```

</details><details><summary><b>disableElms</b></summary>

This action allows you to disable elements by some query selectors:

```js
data-actions-on-response="
  disableElms('.some-class', '.some-another-class')
"
```

</details><details><summary><b>removeElms</b></summary>

This action allows you to remove elements by some query selectors:

```js
data-actions-on-response="
  removeElms('.some-class', '.some-another-class')
"
```

</details><details><summary><b>toggleElms</b></summary>

This action allows you to toggle elements by some query selectors:

```js
data-actions-on-response="
  disableElms('some-class-name', '#some-element-id', '#some-other-element-id')
"
```

</details><details><summary><b>changeValueOf</b></summary>

This action allows you to change a value of input elements by some query selectors:

```js
data-actions-on-response="
  changeValueOf('#some-id', someValue)
"
```

</details><details><summary><b>updateAttributeOf</b></summary>

This action allows you to update an attribute value by some query selectors:

```js
data-actions-on-response="
  updateAttributeOf('#some-id', 'attrName', 'attrValue')
"
```

</details><details><summary><b>scrollIntoViewOf</b></summary>

This action allows you to scroll into element by some query selectors:

```js
data-actions-on-response="
  scrollIntoViewOf('#some-id')
"
```

</details><details><summary><b>reload</b></summary>

This action reloads the page:

```js
data-actions-on-response="
	reload()
"
```

</details><details><summary><b>redirect</b></summary>

This action redirects to specified page:

```js
data-actions-on-response="
	redirect('/some/path')
"
```

</details><details><summary><b>custom actions</b></summary>

You can define and call your own custom actions:

```js
data-actions-on-response="
  customAction(response)
"
```

</details>

# thisElement

On elements with attribute `data-actions-on-response`, you can use variable `thisElement` inside of the script in the attribute:

```js
data-actions-on-response="
  console.log(thisElement.attributes['some-attr-name'].value)
  someAction(response)
"
```

Such feature makes it much easier to access information about the applicaton state which you can persist, let say, in attributes of the element with `data-actions-on-response`.

# Provided Actions On AJAX Response

<details><summary><b>insertHTMLInto</b></summary>

This action allows you to insert some **HTML** into some element by a query selector:

```html
data-actions-on-response="
	insertHTMLInto('#some-id', someHTML)
"
```

</details><details><summary><b>addHTMLInto</b></summary>

This action allows you to append some **HTML** into some element by a query selector:

```html
data-actions-on-response="
	addHTMLInto('#some-id', someHTML)
"
```

</details><details><summary><b>loadHTMLInto</b></summary>

This action allows you to load **HTML** from some external source and insert it into some element by some query selector:

```html
data-actions-on-response='
  loadHTMLInto("#some-id", "https://some/url/with/html", { "name": "value" })
'
```

</details><details><summary><b>loadHTMLAndAddInto</b></summary>

This action allows you to load **HTML** from some external source and append it into some element by some query selector:

```html
data-actions-on-response='
  loadAndAddHTMLInto("#some-id", "https://some/url/with/html", { "name": "value" })
'
```

</details><details><summary><b>insertTextInto</b></summary>

This action allows you to insert some text into some element by a query selector:

```html
data-actions-on-response="
	insertTextInto('#some-id', someText)
"
```

</details><details><summary><b>addTextInto</b></summary>

This action allows you to append some text into some element by a query selector:

```html
data-actions-on-response="
	addTextInto('#some-id', someText)
"
```

</details><details><summary><b>loadTextInto</b></summary>

This action allows you to load text from some external source and insert it into some element by some query selector:

```html
data-actions-on-response='
  loadTextInto("#some-id", "https://some/url/with/text", { "name": "value" })
'
```

</details><details><summary><b>loadAndAddTextInto</b></summary>

This action allows you to load text from some external source and append it into some element by some query selector:

```html
data-actions-on-response='
  loadAndAddTextInto("#some-id", "https://some/url/with/text", { "name": "value" })
'
```

</details><details><summary><b>mapToTemplate</b></summary>

This action allows you to map an object from response (or just in memory) to some template by some query selector:

```html
data-actions-on-response="
  mapToTemplate('#some-template-id', someObjectFromResponse)
"
```

</details><details><summary><b>releaseTemplate</b></summary>

This action allows you to release template.

```html
data-actions-on-response="
  releaseTemplate('#some-template-id')
"
```

If you want to, let's say, render the **&lt;template is="e-json"&gt;** on some event like a button click, you can simply wrap `e-json` template with another template, like **&lt;template id="template-on-click"&gt;** and do the following:

```html
<template id="template-on-click">
  <template is="e-json" data-src="/json">
    <!-- some content -->
  </template>
</template>

<button
  onclick="releaseTemplate('#template-on-click')">
  LOAD JSON
</button>
```

</details><details><summary><b>showElms</b></summary>

This action allows you to show elements by some query selectors:

```html
data-actions-on-response="
  showElms('.some-class", '.some-another-class')
"
```

</details><details><summary><b>hideElms</b></summary>

This action allows you to hide elements by some query selectors:

```html
data-actions-on-response="
  hideElms('.some-class', '.some-another-class')
"
```

</details><details><summary><b>enableElms</b></summary>

This action allows you to enable elements by some query selectors:

```html
data-actions-on-response="
  enableElms('.some-class', '.some-another-class')
"
```

</details><details><summary><b>disableElms</b></summary>

This action allows you to disable elements by some query selectors:

```html
data-actions-on-response="
  disableElms('.some-class', '.some-another-class')
"
```

</details><details><summary><b>removeElms</b></summary>

This action allows you to remove elements by some query selectors:

```html
data-actions-on-response="
  removeElms('.some-class', '.some-another-class')
"
```

</details><details><summary><b>toggleElms</b></summary>

This action allows you to toggle elements by some query selectors:

```html
data-actions-on-response="
  toggleElms('.some-class-name', '#some-element-id', '#some-other-element-id')
"
```

</details><details><summary><b>changeValueOf</b></summary>

This action allows you to change a value of input elements by some query selectors:

```html
data-actions-on-response="
  changeValueOf('#some-id', someValue)
"
```

</details><details><summary><b>updateAttributeOf</b></summary>

This action allows you to update an attribute value by some query selectors:

```html
data-actions-on-response="
  updateAttributeOf('#some-id', 'attrName', 'attrValue')
"
```

</details><details><summary><b>scrollIntoViewOf</b></summary>

This action allows you to scroll into element by some query selectors:

```html
data-actions-on-response="
  scrollIntoViewOf('#some-id')
"
```

</details><details><summary><b>reload</b></summary>

This action reloads the page:

```html
data-actions-on-response="
	reload()
"
```

</details><details><summary><b>redirect</b></summary>

This action redirects to specified page:

```html
data-actions-on-response="
	redirect('/some/path')
"
```

</details><details><summary><b>custom actions</b></summary>

You can define and call your own custom actions:

```html
<script>
  customAction = () => {
    //...
  }
</script>

```

```html
data-actions-on-response="
  customAction(response)
"
```

</details>

Instead of element selectors, you can directly specify the elements themselves.

# Using <code>this</code> in data-actions-on-response

Inside any `data-actions-on-response` attribute, you can use **`this`** to reference the element on which the actions are defined.  
This allows you to read and modify your own attributes directly inside the action script.

```html
data-actions-on-response="
  console.log(this.getAttribute('some-attr-name'));
  someAction(response);
"
```

Because elements can store state or configuration in their own attributes, having access to `this` makes it easy to retrieve that information during response handling—without relying on external variables or additional JavaScript.  
This keeps component logic self-contained and declarative.


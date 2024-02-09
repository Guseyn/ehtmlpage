# Registering Custom Elements

You can register your own custom elements, so that **EHTML** can process them. All you need is just to assign a function for your custom element in `window.__ehtmlCustomElements__`. Below, you will see how you can do it for `<template>` and just some custom element. If you need some element that relies on some preprocessing, it's recommended to use template, so that you will see only processed data on screen. In other case, you can use just regular custom elements.

## 1. Registering Custom Templates

Let's start with custom `<template is="custom">`. When you register a template element, you must assume that in HTML code you need to specify attribute `is="custom"`, where 'custom' is just a name of your template. And when you're adding a function into `window.__ehtmlCustomElements__` to register the template, you must attach key with name `custom-template`. In another words, the key for your template in `window.__ehtmlCustomElements__` must end with `-template` postfix.

```html
<head>
	<script src="/../js/ehtml.bundle.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		window.__ehtmlCustomElements__['custom-template'] = (node) => {
		  if (node.nodeName.toLowerCase() !== 'template') {
		    throw new Error('node is not template')
		  }
		  const elmContentNode = document.importNode(node.content, true)
		  const child = document.createElement('div')
		  child.innerText = node.getAttribute('data-content')
		  elmContentNode.appendChild(child)
		  node.parentNode.replaceChild(elmContentNode, node)
		}
	</script>
</head>
<body>
	<template
		is="custom"
		data-content="This content will be displayed inside of <div>">
  </template>
</body>
```

In the example above, we're adding `ehtml` script, and then we're using `<script>` to register our custom template. Our register function is just a function that accepts only one argument `node`, this argument is the template itself. In that function, we're checking that our element is template. You can skip this validation step, but it's recommended to have it just to avoid confusion in case you made an error while declaring the element in HTML code. This custom template just renders a `<div>` element with content from `data-content` attribute.

So, in the end it will be rendered like:

```html
<body>
	<div>
		This content will be displayed inside of <div>
	</div>
</body>
```

## 2. Registering Custom Regular Elements

In case of regular custom elements, you simply need to register them with the exact same name in `window.__ehtmlCustomElements__`:


```html
<head>
	<script src="/../js/ehtml.bundle.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		window.__ehtmlCustomElements__['custom-element'] = (node) => {
			node.style.opacity = '0.5'
		}
	</script>
</head>
<body>
	<custom-element>
		This element will be with opacity 0.5
	</custom-element>
</body>
```

The example above will be redered in the following manner:

```html
<body>
	<custom-element style="opacity: 0.5;">
		This element will be with opacity 0.5
	</custom-element>
</body>
```

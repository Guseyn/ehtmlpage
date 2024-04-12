# It's simple markdown that is loaded via e-markdown element.

Let's use here **bold text** and *italic text*. Let's insert code below:

```html
<e-html>
  <e-markdown data-src="/../simple.md"></e-markdown>
</e-html>
```

Let's insert table below:

|Framework|Score|
|--- |--- |
|**EHTML**|10/10|

Let's insert todo list below:

 - [x] This task is done
 - [ ] This is still pending

Let's check code in JS:

```js
class A {
  constructor () {
    this.a = 'a'
  }
}
```

Let's try latex:

```latex
\displaystyle{f'(x) = \frac{df}{dx}=\lim\limits_{\Delta\to0}\frac{f(x + \Delta) - f(x)}{\Delta}}
```
```latex
x=\frac{ -b\pm\sqrt{ b^2-4ac } } {2a}
```
Seems like it works!

[link to the source code](https://github.com/Guseyn/EHTML/blob/master/examples/static/html/simple-e-markdown.html)

[Next Example: Simple &lt;template is="e-ws"&gt;](/html/examples/simple-ws.html)

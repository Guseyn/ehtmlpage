# 🚀 Benefits of EHTML

**1. Number of Abstractions at the Laguange Level**
**HTML**. Most of the work related to **AJAX** can be encapsulated into **HTML**. State can be stored in memory, in element attributes, `localStorage`, `sessionStorage` or **URL** parameters.
**JavaScript**. You can use it independently whenever you need to add some functionality that is easier to implement in **JavaScript**.

**2. Build Process**
No build process required. Just include **EHTML** in `<script>`.

**3. State Management**
**EHTML** encourages you to use predictalbe storages of state such as **HTML** code (element attributes), memory (`window` or other namespaces), `localStorage`, `sessionStorage` or **URL** parameters. It allows you to easily store and access any data you need.
**&lt;e-form-dynamic-value&gt;** allowes you easily attach values via attribute `data-bound-to` in your form.
**&lt;template is="e-reusable"&gt;** and **mapToTemplate** allow you to map any state to templates with attribute `is="e-reusable"`, so your view can represent the latest updates. It's more predictable than being "reactive" in the traditional sence. Templates in **EHTML** are asynchronous, which means that they persist their associations with memory, allowing you to work with complex data structures.

**4. Routing**
**&lt;template is="e-page-with-url"&gt;**, **&lt;template is="e-wrapper"&gt;** and **window.urlParams** allow you to emulate Multi-Page Application as Single Page Application. Also the ability to preload and cache different parts of your page make it much easier to achieve that.

**5. Mapping JSON on HTML**
**&lt;e-json&gt;**, **&lt;template is="e-json"&gt;**, **&lt;template is="e-for-each"&gt;**, **&lt;template is="e-if"&gt;** and **mapToTemplate** allow you to map objects from **AJAX** requests and memory on templates. Most of the mapping is done by explicit attribute names and JavaScript parameterized expressions.

**6. Loading HTMLs, SVGs, Markdowns**
**&lt;e-html&gt;**, **&lt;e-svg&gt;**, **&lt;e-markdown&gt;** allow you to load different formats that can be displayed in **HTML**. Similar to images, audio, or videos, you store them separately on your server and attach them in HTML code as resources.

No other library or framework can achieve the things listed above with such ease.

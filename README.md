# TurbulentFlux

TurbulentFlux generates dynamic glow spots in a certain area and update them consistently. → **[Demo](https://tblf.mrwillcom.com/)**

(video here)

## Get Started

```html
<div id="my-tblf"></div>
<link rel="stylesheet" href="https://unpkg.com/turbulent-flux/src/index.css" />
<script type="module">
  import TurbulentFlux from 'https://unpkg.com/turbulent-flux/src/index.js'
  new TurbulentFlux(document.getElementById('my-tblf'))
</script>
```

## Options

Pass options through:

```js
new TurbulentFlux(<target element>, options)
```

Default options are applied when nothing is passed to the constructor. To tweak the defaults, go to [TurbulentFlux Demo](https://tblf.mrwillcom.com/). Default options can also be found in `src/index.js`.

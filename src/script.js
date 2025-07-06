import { TurbulentFlux } from './index.js'

const tblfEl = document.getElementById('tblf')

let tblf = new TurbulentFlux(tblfEl)

window.TurbulentFlux = TurbulentFlux
window.tblf = tblf

import { Pane } from 'https://unpkg.com/tweakpane@4/dist/tweakpane.min.js'

const pane = new Pane()

pane.addBinding(tblf.options, 'minDistance', { min: 0, step: 1 })
pane.addBinding(tblf.options, 'speed', { min: 0.01, step: 0.02 })
pane.addBinding(tblf.options, 'spotsCountFactor', { min: 2000, step: 100 })
pane.addBinding(tblf.options, 'saturation', { min: 0, max: 100 })
pane.addBinding(tblf.options, 'lightness', { min: 0, max: 100 })
pane.addBinding(tblf.options, 'blurRadius', { min: 0, step: 1 })
pane.addBinding(tblf.options, 'spotRadius', { min: 0, step: 1 })

pane
  .addButton({
    title: 'Clear spots',
  })
  .on('click', () => {
    tblfEl.replaceChildren()
  })

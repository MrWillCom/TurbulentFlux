const DEFAULT_OPTIONS = {
  minDistance: 500,
  speed: 0.05,
  spotsCountFactor: 10000,
  saturation: 100,
  lightness: 70,
}

class TurbulentFlux {
  constructor(element, options) {
    this.element = element
    this.options = Object.assign(DEFAULT_OPTIONS, options)
    this.raf()
  }

  paused = false

  get windowWidth() {
    return window.innerWidth
  }
  get windowHeight() {
    return window.innerHeight
  }
  get windowSize() {
    return this.windowWidth * this.windowHeight
  }

  get spotsCount() {
    return Math.floor(this.windowSize / this.options.spotsCountFactor)
  }

  get randomColor() {
    const hue = Math.random() * 360
    return `hsl(${hue} ${this.options.saturation}% ${this.options.lightness}%)`
  }

  raf() {
    if (!this.paused) {
      while (this.element.childElementCount < this.spotsCount) {
        let from = { x: 0, y: 0 }
        let to = { x: 0, y: 0 }
        let distance = 0
        while (distance < this.options.minDistance) {
          from = {
            x: Math.floor(Math.random() * (window.innerWidth + 1)),
            y: Math.floor(Math.random() * (window.innerHeight + 1)),
          }
          to = {
            x: Math.floor(Math.random() * (window.innerWidth + 1)),
            y: Math.floor(Math.random() * (window.innerHeight + 1)),
          }
          distance = Math.sqrt(
            Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2),
          )
        }

        const duration = Math.floor(distance / this.options.speed)

        const spot = document.createElement('div')
        spot.classList.add('tblf-spot')
        spot.style.setProperty('--color', this.randomColor)
        spot.style.setProperty('--from-x', from.x + 'px')
        spot.style.setProperty('--from-y', from.y + 'px')
        spot.style.setProperty('--to-x', to.x + 'px')
        spot.style.setProperty('--to-y', to.y + 'px')
        spot.style.setProperty('--duration', duration + 'ms')
        this.element.appendChild(spot)

        spot.addEventListener('animationend', ev => {
          if (ev.animationName === 'tblf-spot-animation') {
            spot.parentNode.removeChild(spot)
          }
        })
      }
    }

    requestAnimationFrame(this.raf.bind(this))
  }

  play() {
    this.paused = false
  }
  pause() {
    this.paused = true
  }
  toggle() {
    this.paused = !this.paused
  }
}

const tblfEl = document.getElementById('tblf')

let tblf = new TurbulentFlux(tblfEl, {})

import { Pane } from 'https://unpkg.com/tweakpane@4/dist/tweakpane.min.js'

let options = DEFAULT_OPTIONS

const pane = new Pane()

window.TurbulentFlux = TurbulentFlux
window.tblf = tblf

pane.addBinding(options, 'minDistance', { min: 0, step: 1 })
pane.addBinding(options, 'speed', { min: 0.01, step: 0.02 })
pane.addBinding(options, 'spotsCountFactor', { min: 2000, step: 100 })
pane.addBinding(options, 'saturation', { min: 0, max: 100 })
pane.addBinding(options, 'lightness', { min: 0, max: 100 })

pane
  .addButton({
    title: 'Clear spots',
  })
  .on('click', () => {
    tblfEl.replaceChildren()
  })

pane.on('change', ev => {
  tblf.pause()
  tblf = new TurbulentFlux(tblfEl, options)
  window.tblf = tblf
})

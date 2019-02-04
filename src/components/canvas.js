import * as dscc from '@google/dscc'

export class Canvas {
  constructor(id) {
    this.element = document.createElement('canvas')
    this.element.id = id
    this.drawables = []
  }

  appendDrawable(child) {
    child.canvas = this
    this.drawables.push(child)
  }

  removeDrawable(child) {
    child.canvas = null
    this.drawables = this.drawables.filter((c) => c != child)
  }

  removeDrawables() {
    this.drawables.forEach((c) => this.removeDrawable(c))
  }

  mount() {
    document.body.appendChild(this.element)
    window.addEventListener('resize', this.resize, false)
  }

  resize() {
    this.element.width = dscc.getWidth()
    this.element.height = dscc.getHeight()
  }

  draw() {
    this.resize()
    this.drawables.forEach((c) => c.draw())
  }
}

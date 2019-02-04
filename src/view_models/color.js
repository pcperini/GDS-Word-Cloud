import { random, flip } from '../lib/random'
import * as _Color from 'color'

export class Color {
  constructor(styleData) {
    const { fontColor } = styleData
    if (!fontColor.value || !fontColor.value.color) {
      const darkBackground = (
        styleData.darkBackground.value ||
        styleData.darkBackground.defaultValue
      )

      this.value = darkBackground ? 'random-light' : 'random-dark'
      return
    }

    const baseColor = _Color(styleData.fontColor.value.color)
    if (styleData.varyColors === false) {
      this.value = baseColor
        .alpha(styleData.fontColor.value.opacity)
        .rgb()
        .string()
      return
    }

    this.value = () => this.randomValue(baseColor)
  }

  randomValue(baseColor) {
    const variance = (x) => (
      flip() ? baseColor.darken(x) : baseColor.lighten(x)
    )

    return variance(random(0.0, 0.75))
      .rgb()
      .string()
  }
}

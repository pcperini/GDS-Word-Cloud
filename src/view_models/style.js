import { Color } from './color'

export class Style {
  constructor(styleData) {
    this.fontFamily = (
      styleData.fontFamily.value || styleData.fontFamily.defaultValue
    )
    this.color = (new Color(styleData)).value
  }
}

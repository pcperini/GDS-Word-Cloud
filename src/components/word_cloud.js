import * as _WordCloud from 'wordcloud';

export class WordCloud {
  constructor(styles, wordMap) {
    this.styles = styles
    this.wordMap = wordMap
  }

  draw() {
    const map = this.wordMap
    const styles = this.styles

    _WordCloud(this.canvas.element, {
      list: map.words,
      weightFactor: map.maxSize / map.words.length,
      clearCanvas: true,
      backgroundColor: 'transparent',
      shuffle: false,
      rotateRatio: 0.0,
      fontFamily: styles.fontFamily,
      color: styles.color
    })
  }
}

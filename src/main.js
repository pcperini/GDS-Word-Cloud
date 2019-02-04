import * as dscc from '@google/dscc'
import { Canvas } from './components/canvas'
import { WordCloud } from './components/word_cloud'
import { WordMap } from './view_models/word_map'
import { Style } from './view_models/style'

const canvas = new Canvas('word-cloud')
canvas.mount()

function redraw(newData) {
  canvas.removeDrawables()

  const wordMap = new WordMap(newData.tables, 100)
  const styles = new Style(newData.style)

  const wordCloud = new WordCloud(styles, wordMap)
  canvas.appendDrawable(wordCloud)
  canvas.draw()
}

dscc.subscribeToData(redraw, { transform: dscc.objectTransform })

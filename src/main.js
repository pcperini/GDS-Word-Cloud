import * as dscc from '@google/dscc'
import { Canvas } from './components/canvas'
import { WordCloud } from './components/word_cloud'
import { WordMap } from './view_models/word_map'
import { Style } from './view_models/style'
import script from 'scriptjs'

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

script('https://www.googletagmanager.com/gtag/js?id=UA-123567070-2', () => {
  window.dataLayer = window.dataLayer || []
  const gtag = () => { dataLayer.push(arguments) }

  gtag('js', new Date())
  gtag('config', 'UA-123567070-2')
  gtag('event', 'load');
})

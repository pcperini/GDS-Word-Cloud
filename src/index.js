import dscc from '@google/dscc';
import WordCloud from 'wordcloud';
import { keyWords } from './words';
import { colorValue } from './colors';

var canvasElement = document.createElement('canvas');
canvasElement.id = 'word-cloud';

document.body.appendChild(canvasElement);
window.addEventListener('resize', prep, false);

function prep() {
  canvasElement.width = dscc.getWidth();
  canvasElement.height = dscc.getHeight();
}

function draw(data) {
  prep();
  const maxSize = 100;
  var s = data.style;

  var words = keyWords(data.tables.DEFAULT)
    .slice(0, maxSize)
    .map((w, i, a) => [w, a.length - i]);
  WordCloud(canvasElement, {
    list: words,
    weightFactor: maxSize / words.length,
    clearCanvas: true,
    fontFamily: (s.fontFamily.value || s.fontFamily.defaultValue),
    color: colorValue(s),
    backgroundColor: 'transparent',
    shuffle: false,
    rotateRatio: 0.0
  });
}

dscc.subscribeToData(draw, { transform: dscc.objectTransform });

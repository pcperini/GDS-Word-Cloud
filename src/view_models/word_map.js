import POS from 'parts-of-speech'

export class WordMap {
  constructor(data, maxSize) {
    this.maxSize = maxSize
    this.words = this.taggedWords(data)
      .slice(0, maxSize)
      .map((w, i, a) => [w, a.length - i])
  }

  taggedWords(data) {
    const text = this.allText(data.DEFAULT)
    const lexed = new POS.Lexer().lex(text)

    const tags = (new POS.Tagger()).tag(lexed)
      .filter((t) => ((
        t[1].startsWith('JJ') ||
        t[1].startsWith('NN') ||
        t[1].startsWith('RB') ||
        t[1].startsWith('VB') ||
        t[1].startsWith('CD')
      ) && (
        !t[0].startsWith('/')
      )))

    var results = tags.map((t) => t[0].toLowerCase())
      .reduce((iterator, t) => {
        iterator.ongoing[t] = 1 + (iterator.ongoing[t] || 0)
        iterator.results = Object.keys(iterator.ongoing)
          .map((k) => [k, iterator.ongoing[k]])
        return { ongoing: iterator.ongoing, results: iterator.results }
      }, { ongoing: {}, results: [] })
      .results
    results.sort((a, b) => a[1] > b[1] ? -1 : 1)
    return results.map((r) => r[0])
  }

  allText(rows) {
    return rows.map((r) =>
      r.texts.map((t, i) => (t || '').repeat(parseInt(r.metric[i])))
    ).reduce((all, r) => `${all}. ${r.join(' ')}`, '')
  }
}

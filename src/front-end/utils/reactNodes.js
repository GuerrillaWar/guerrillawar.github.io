import * as React from 'react'
import cheerio from 'cheerio'

// Takes html and returns an array of react dom nodes

export default function (html) {
  let $ = cheerio.load('<body>' + html + '</body>')
  let arr = []
  $('body')
    .children()
    .map(function () {
      let tagName = $(this).get(0).tagName.toString().toLowerCase()
      let classList = $(this).attr('class')

      arr.push(React.DOM[tagName] ({
        className: classList || null,
        dangerouslySetInnerHTML: { __html: $(this).html() },
      }))
    })
  return arr
}

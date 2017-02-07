// Run with:
// $ npm test

import flexRenderer from '../'
import blocks from './blocks'
import {expect} from 'chai'

const rendered = flexRenderer({
  blocks: blocks,
  allowed: ['p', 'a', 'ul'],
  renderProfiles: ['hangingQuotes'],
})

describe('flexRenderer', function() {
  blocks.forEach((b, i) => {
    if (b.expected_html !== undefined) {
      it(b.test_name, function() {
        expect(b.expected_html.trim()).to.equal(rendered[i].html.trim())
      })
    }
  })
})

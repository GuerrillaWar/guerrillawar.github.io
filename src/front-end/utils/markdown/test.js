// Run with:
// $ npm test

import md from './index.js'
import {expect} from 'chai'
import {readFile} from 'fs'

var markdown = md({
  allowed: ['h1:h2', 'h2:h3', 'p', 'ol', 'em', 'a', 'del'],
  renderProfiles: ['hangingQuotes'],
})

const rendered = markdown.render(`# h1 **bold [bit](#!) of text** bit
## Heading Level 2
### h3 test

<div id="testing inline html">Hello <strong>...</strong></div>

Advanced Markdown
=================

Nested Lists
------------

1. Dog
    1. German Shepherd
    2. Belgian Shepherd
        - Malinois
        - Groenendael
        - Tervuren
2. Cat
    1. Siberian
    2. Siamese

And ol inside ul now

- Dog
    1. German Shepherd
    2. Belgian Shepherd
        - Malinois
        - Groenendael
        - Tervuren
- Cat
    1. Siberian
    2. Siamese


Nested elements in lists
------------------------

> ### Advanced lists: Nesting
> To put other Markdown blocks in a list; just indent four spaces for each nesting level

Normal paragraph
Or two

| a | b | c |
|---|---|---|
| 1 | 2 | 3 |

Test L Heading
==============

Test L Heading (level 2)
------------------------

> This is a blockquote
> Put returns between each line to make multiple paragraphs within a blockquote

> — by John

---

Here is an ordered list

1. Ordered list first item
2. Ordered list second item

and here is an unordered list

- List item one
- List item two
- Third list item

\`\`\`html
<article class="wotm8">...</div>
\`\`\`

This is some html <script>alert('hello!')</script> right there.

[a link all by itself](/home)

Hand-formed and *painted* ceramic **hanging** pot. Includes ceramic ~~bead and cotton~~ thread. Does not include plant--unless purchased in store. [Comes assembled](#!). This is a hand made product the dimensions will vary slightly from piece to piece. 1990-2000.

### "hanging" quotes in h3 test

And this should ba another "p"
`
+
`
'Quoting' is pretty nice.
`
+
`- list item with **bold** text
- and more lists`
+
`

This ends in a colon:

1. Ordered lists
2. Are pretty neat
`)

describe('markdown', function() {
  it('should parse correctly', function(done) {
    readFile(__dirname + '/test-output.html', 'utf8', function(err, data) {
      if (err) { return done(err); }
      expect(rendered).to.equal(data);
      done();
    })
  })
})

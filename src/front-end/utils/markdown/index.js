import renderProfiles from './renderProfiles.js'
/*
This is a wrapper/API for marked (right now)

It spins up an instance of a markdown parser with whatever settings you provide it, and returns two methods:
- render(markdown)
- renderInline(markdown)

Example usage:
  import md from './markdown.js'
  import rendering from './rendering.js' // custom rendering rules

  const markdown = md({
    options: {},
    allowed: ['h1', 'p', 'h3', 'ol', 'em', 'a', 'del'],
    renderer: rendering.hangingQuotes,
  })

  const html = markdown.render(`# h1 **bold [bit](#!) of text** bit
## Heading Level 2
### h3 test`)

*/
import marked from 'marked'
const lexer = new marked.Lexer()

export default function (args) {
  let allowed_tags = []
  let transforms = {}

  ;(args.allowed || []).forEach(tag => {
    let parts = tag.split(':')
    if (parts[1]) {
      transforms[+parts[0].slice(1)] = +parts[1].slice(1)
    }
    allowed_tags.push(parts[0])
  })

  let custom_renderer = {}

  ;(args.renderProfiles || []).forEach(profile => {
    if (renderProfiles[profile]) {
      Object.assign(custom_renderer, renderProfiles[profile])
    }
  })

  // Options are not currently part of the API
  // If they get added at some point in future, make their api independant of marked.
  const marked_options = {
    sanitize: true,
    // sanitize: false, // we need to allow <!-- markdown break tokens --> without sanitising them. Instead we'll manually remove any html that's not a html comment
    gfm: true, // enables ~~ for <del>. This also allows tables within marked.js but currently we're not supporting any markdown for tables via this API.
    smartLists: true,
    smartypants: true, // "smart" typograhic punctuation for things like quotes and dashes.
  }


  function unsanitize_html_comment(str) {
    // Check to see if this is a html comment (or sanitised html comment) and return as usanitised html if so
    str = str.trim()
      .split('&lt;').join('<')
      .split('&gt;').join('>')

    return /<!--[\s\S]*?-->/.test(str)
      ? str
      : false
  }

  // Block Renderer
  // -------------

  let renderer = new marked.Renderer()
  const parser = new marked.Parser(Object.assign(
    marked_options, {renderer: renderer}
  ))

  // Better defatult heading render
  renderer.heading = function (text, level, raw, attrs) {
    return '<h' + level + '>' + text + '</h' + level + '>\n'
  }

  // Allow html comments but no other html
  renderer.html = function (html) {
    return unsanitize_html_comment(html) || html
  }

  // No tables by default
  renderer.table = none
  renderer.tablerow = none
  renderer.tablecell = none

  // Apply custom rendering
  renderer = Object.assign(renderer, custom_renderer || {})


  // Inline Renderer
  // ---------------

  let inlineRenderer = new marked.Renderer()
  const inlineParser = new marked.Parser(Object.assign(
    marked_options, {renderer: inlineRenderer}
  ))
  inlineRenderer.code = none
  inlineRenderer.blockquote = noop
  inlineRenderer.html = none
  inlineRenderer.heading = noop
  inlineRenderer.hr = noop
  inlineRenderer.list = noop
  inlineRenderer.listitem = noop
  inlineRenderer.paragraph = noop
  inlineRenderer.table = none
  inlineRenderer.tablerow = none
  inlineRenderer.tablecell = none


  // Render Method
  // -------------

  function render (markdown) {
    let tokens = lexer.lex(markdown)

    // Block Level Tokens
    tokens.forEach((token, i, tokens) => {
      switch (token.type) {
        // h1-h6
        case 'heading':
          if (! allowed('h' + token.depth)) {
            token.type = 'paragraph'
            token.text = '#'.repeat(token.depth) + ' ' + token.text
          }
          // Transform heading
          token.depth = transforms[token.depth] || token.depth
          break

        case 'hr':
          if (! allowed('hr')) {
            token.type = 'paragraph'
            token.text = '---'
          }
          break

        case 'blockquote':
          if (! allowed('blockquote')) {
            token.type = 'paragraph'
            token.text = '> ' + token.text
          }
          break

        case 'html':
          // Allow html comments to pass through no matter what.
          // We use them in our Flexible Content markdown processing.
          if (unsanitize_html_comment(token.text)) {
            break
          }
          if (! allowed('html')) {
            token.type = 'paragraph'
          }
          break

        case 'code':
          if (! allowed('code')) {
            token.type = 'paragraph'
            token.text = '&#96;&#96;&#96;' + token.text + '&#96;&#96;&#96;'
          }
          break

        case 'list_start':
          let tag = token.ordered ? 'ol' : 'ul'
          if (! allowed(tag)) {
            // Look ahead and set everything up to and including the next 'list_end' to either a paragraph or space token. I tried removing these with completely from the token list but it chokes the parser in some cases; safer not to, even though this current approach results in a few empty p tags.
            token.type = 'paragraph'

            function loop(ix) {
              let _token = tokens[ix]

              if (_token.type === 'list_end') {
                _token.type = 'paragraph'
                return // STOP
              }
              // list_item_start, list_item_end
              if (_token.type.startsWith('list_item_')
                || _token.type.startsWith('loose_item_')
              ) {
                _token.type = 'space'
              }
              // text content of each li
              if (_token.type === 'text') {
                _token.text = (tag === 'ul' ? '- ' : '-. ') + _token.text
              }
              loop(ix + 1)
            }
            loop(i + 1)
          }
          break
      }
    })

    let html = parser.parse(tokens)
    return parseInlineTags(html)
  }


  // API
  // ---

  return {
    render: render,
    renderInline: function (markdown) {
      let tokens = lexer.lex(markdown)
      let html = inlineParser.parse(tokens)
      return parseInlineTags(html)
    }
  }


  // Replace not-allowed inline tags
  // -------------------------------

  function parseInlineTags (html) {
    if (! allowed('a') ) {
      html = html.replace(/<a(.+?)>(.+?)<\/a>/g, '[$2](&infin;)')
    }
    if (! allowed('strong') ) {
      html = html.replace(/<strong>(.+?)<\/strong>/g, '**$1**')
    }
    if (! allowed('em') ) {
      html = html.replace(/<em>(.+?)<\/em>/g, '*$1*')
    }
    if (! allowed('code') ) {
      html = html.replace(/<code(.+?)>(.+?)<\/code>/g, '`$1`')
    }
    if (! allowed('del') ) {
      html = html.replace(/<del>(.+?)<\/del>/g, '~~$1~~')
    }

    return html
  }


  // Helpers
  // -------

  function noop (text) { return text }

  function none () { return '' }

  function allowed(tag) {
    if (allowed_tags == 0) return true // @TEMP, always force choosing allowed tags
    return allowed_tags.indexOf(tag) !== -1
      ? true
      : false
  }
}

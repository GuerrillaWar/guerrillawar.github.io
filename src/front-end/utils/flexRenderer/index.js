import markdown from '../markdown'

const flexRenderer = function (opts) {
  const {
    blocks = [],
    allowed = ['p', 'a'],
    renderProfiles = ['hangingQuotes'],
  } = opts

  const markdown_parser = markdown({
    allowed: allowed,
    renderProfiles: renderProfiles,
  })

  const BREAK_TOKEN = "<!-- break markdown -->"
  const MARKDOWN_BLOCK = "MarkdownBlock"

  let texts = []
  blocks.map(block => {
    if (block.type === MARKDOWN_BLOCK && block.data) {
      texts.push(block.data)
      texts.push("\n" + BREAK_TOKEN)
    }
  })

  let html = markdown_parser.render(texts.join("\n"))
    .split(BREAK_TOKEN)

  return blocks.map(block => {
    if (block.type === MARKDOWN_BLOCK && block.data) {
      return {
        type: block.type,
        data: block.data,
        html: html.shift(),
      }
    } else {
      return block
    }
  })
}

export default flexRenderer;

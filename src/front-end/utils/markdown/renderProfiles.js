// Apply classes to typographer's quotes for hanging quotes
const hangingQuotes = {
  heading: function (text, level, raw) {
    let attrs = hangingQuoteClass(text)
      ? ' class="' + hangingQuoteClass(text) + '" '
      : ''
    return '<h' + level + attrs + '>' + text + '</h' + level + '>\n'
  },
  
  paragraph: function(text) {
    let attrs = hangingQuoteClass(text)
      ? ' class="' + hangingQuoteClass(text) + '" '
      : ''
    return '<p' + attrs + '>' + text + '</p>\n'
  },
}

export default {
  hangingQuotes: hangingQuotes,
}


function hangingQuoteClass(text) {
  if (text.startsWith('“')) {
    return 'dblQuo'
  } else if (text.startsWith('‘')) {
    return 'sglQuo'
  }
  return false
}

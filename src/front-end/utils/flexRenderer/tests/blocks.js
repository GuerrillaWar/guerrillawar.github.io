export default [{
  test_name: "User HTML Sanitised",
  type: "MarkdownBlock",
  data: "User coded html should be <em>sanitised</em> -- we only allow markdown here. Like this link example: [Weekends](#!).",
  expected_html: '<p>User coded html should be &lt;em&gt;sanitised&lt;/em&gt; – we only allow markdown here. Like this link example: <a href="#!">Weekends</a>.</p>'
}, {
  test_name: "Hanging Quotes processed.",
  type: "MarkdownBlock",
  data: "\"Hanging Quotes\" is the term for when we allow quote characters to hang outside the text column margin. These should also be converted to typographic/smart quotes.",
  expected_html: '<p class="dblQuo" >“Hanging Quotes” is the term for when we allow quote characters to hang outside the text column margin. These should also be converted to typographic/smart quotes.</p>',
}, {
  test_name: "Reference Links remain valid.",
  type: "MarkdownBlock",
  data: "[Reference][0] [style][1] [links][wknds] should be valid, even when those references are in a different block.",
  expected_html: '<p><a href="http://example.com" title="Example">Reference</a> <a href="#!1">style</a> <a href="http://weekends.ws">links</a> should be valid, even when those references are in a different block.</p>',
}, {
  type: "QuestionBlock",
  data: {
    background_color: "#294958",
    background_tone: 'dark',
    content: [{
      question: "Can you describe those early days on the wheel?",
      answerer_initials: "BR",
      answer: "Learning to throw on the wheel was initially clunky and unfamiliar, but early on this changed – I felt as if I was remembering a [forgotten skill rather than learning a new one. The night classes were an essential grounding, and it eventually became clear that I needed to make ceramics a central part of my creative life. I purchased a wheel and not long after moved into a studio in the Pop & Scott Workshop](#!). Anchor Ceramics has unfolded somewhat organically from there over the last two and a half years."
    }]
  }
}, {
  test_name: "Reference Links don't output",
  type: "MarkdownBlock",
  data: "[0]: http://example.com (Example)\n [1]: #!1 \n[wknds]: http://weekends.ws",
  expected_html: "",
}]

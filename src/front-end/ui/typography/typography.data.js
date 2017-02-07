var React = require("react")

module.exports["default"] = {
  children: rj`
    div(style={margin: '2em'})

      p._typography-default
        | p._typography-default • Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel eleifend ex. Mauris et risus sit amet turpis pretium finibus. Aenean vulputate elit sit amet erat mattis, a ultrices felis porta. Suspendisse convallis tortor eget ornare sagittis. Nulla facilisis ac odio varius efficitur. Nulla magna ante, egestas sed euismod vitae, vulputate et eros. Duis porttitor ligula facilisis lectus ultricies laoreet. Pellentesque quis ornare nulla.

      h1._typography-display
        | Display Header

      p._typography-display
        | p._typography-display Sabon
        = " "
        em italic
        = " "
        | Copy

      h4._typography-uppercase
        | h4._typography-uppercase


      hr

      h1 This is it h1

      h2 This is a h2

      h3 This is a h3

      p
        | This is a paragraph tag with strong used and a link • Lorem ipsum dolor sit amet,
        strong  consectetur adipiscing elit.
        |  Mauris vel eleifend ex.
        a(href="#") Mauris et risus sit amet turpis pretium finibus.
        |  Aenean vulputate elit sit amet erat mattis, a ultrices felis porta. Suspendisse convallis tortor eget ornare sagittis. Nulla facilisis ac odio varius efficitur. Nulla magna ante, egestas sed euismod vitae, vulputate et eros. Duis porttitor ligula facilisis lectus ultricies laoreet. Pellentesque quis ornare nulla.

      ul
        li This is a list item
        li This is a list item
        li This is a list item
        li This is a list item
    `
}

import React from 'react'
import {ContextComponent} from '../../_'
import bem from 'js-kit/dom/bem'
import GWLogo from '../../atoms/GWLogo'

import markdown from '../../../utils/markdown'
import reactNodes from '../../../utils/reactNodes'

const renderer = markdown({
  options: {},
  allowed: ['h1', 'h2', 'h3', 'p', 'ul', 'li', 'ol', 'a', 'em', 'strong'],
})

export default class Home extends ContextComponent {
  static displayName = 'Home'

  render () {
    const {
      children,
      className,
      page: {
        summary,
        extendedSummary,
      },
    } = this.props

    const cx = bem('Home')
    const classes = {
      '&': true,
    }

    const summaryHtml = renderer.render(summary)
    const extendedSummaryHtml = renderer.render(extendedSummary)

    if (className) { classes[className] = true }

    return rj`
      div(class=cx(classes))
        header(class=cx('&__header'))
          div(class=cx('&__headerText'))
            +GWLogo(class=cx('&__headerLogo'))
            p(class=cx('&__tagline'))
              = "The "
              span(class=cx('&__swapper') data-swap="guerrilla")= "conventional"
              = " army "
              br
              span(class=cx('&__swapper') data-swap="wins")= "loses"
              = " if it does not "
              span(class=cx('&__swapper') data-swap="lose")= "win"
              = "."

        main(class=cx('&__main'))
          section(class=cx('&__summary'))
            = reactNodes(summaryHtml)
          section(class=cx('&__extendedSummary &__extendedSummary*'))
            = reactNodes(extendedSummaryHtml)
    `
  }
}

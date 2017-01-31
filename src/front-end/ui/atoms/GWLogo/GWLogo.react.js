import React from 'react'
import {ContextComponent} from '../../_'
import bem from 'js-kit/dom/bem'

export default class GWLogo extends ContextComponent {
  static displayName = 'GWLogo'

  render () {
    const {
      children,
      className,
    } = this.props

    const cx = bem('GWLogo')
    const classes = {
      '&': true,
    }

    if (className) { classes[className] = true }

    return rj`
      div(class=cx(classes))
        = children
    `
  }
}

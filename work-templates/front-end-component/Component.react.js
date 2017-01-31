import React from 'react'
import {ContextComponent} from '../../_'
import bem from 'js-kit/dom/bem'

export default class <%= componentName %> extends ContextComponent {
  static displayName = '<%= componentName %>'

  render () {
    const {
      children,
      className,
    } = this.props

    const cx = bem('<%= componentName %>')
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

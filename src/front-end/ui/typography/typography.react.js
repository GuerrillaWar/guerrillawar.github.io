import * as React from 'react'
import {ContextComponent, ROUTES} from '../_'

export default class Typography extends ContextComponent {
  render () {
    return rj`
      div
        = this.props.children
    `
  }
}

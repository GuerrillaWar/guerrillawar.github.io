import React, {PropTypes, Component} from 'react'

export default class ContextComponent extends Component {
  static displayName = "ContextComponent"
  static contextTypes = {
    lang: PropTypes.string,
    resizer: PropTypes.object,
    loadSvgMedia: PropTypes.func,
    t_: PropTypes.func,
  }

  getContext () {
    return this.context
  }

  render () {
    console.warn(
      "Abstract Class - ContextComponent must always have it's render method" +
      " overridden."
    )
    return rj`
      p= "!! This component has no render method"
    `
  }
}

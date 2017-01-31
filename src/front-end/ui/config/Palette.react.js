import * as React from 'react'
import {ContextComponent, ROUTES} from '../_'
import fs from 'fs'
import path from 'path'


export default class Palette extends ContextComponent {
  static displayName = "Palette"

  render () {
    function swatch (data, ix) {
      const wrapper_styles = {
        width: '250px',
        margin: '10px',
        padding: '10px',
        display: 'inline-block',
        textAlign: 'center',
      }

      const swatch_styles = {
        paddingBottom: '100%',
        backgroundColor: data.color,
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      }

      const label_styles = {
        display: 'block',
        paddingTop: '10px',
      }

      return rj`
        div(key=ix, style=wrapper_styles)
          div(style=swatch_styles)
          div(style=label_styles)
            = data.name
            if data.variable
              br
            if data.variable
              = 'Uses ' + data.variable
            br
            = data.color
      `
    }

    function heading (data, ix) {
      const heading_styles = {
        margin: '3em 20px 1em 20px',
        fontWeight: 'normal',
        fontSize: '18px',
      }
      return rj`h2(key=ix style=heading_styles)= data.name`
    }

    function blocks (block, ix) {
      switch (block.type) {
        case 'heading':
          return heading(block, ix)
          break
        case 'swatch':
          return swatch(block, ix)
          break
        default:
          break
      }
    }


    return rj`
      div
        for n, ix in this.props.colors
          =blocks(n, ix)
    `
  }
}

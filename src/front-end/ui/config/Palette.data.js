import fs from 'fs'
import path from 'path'

const filePath = path.normalize(__dirname + '/../../../../../../src/front-end/ui/config/palette.styl')
const paletteCSS = fs.readFileSync(filePath).toString()
const matches = paletteCSS.match(/\$COMP_SERV_PALETTE = {([\s\S]*?)}/gm)
const colorVariables = {}
const colors = matches[0].split('\n')
.map(line => {
  line = line.trim()

  if (line == "" || line.startsWith('$') || line.startsWith('}')) {
    return undefined

  } else if (line.startsWith('// ')) {
    return {
      type: 'heading',
      name: line,
    }
    
  } else {
    let arr = line.split(',')
      .join('')
      .split(': ')

    const name = arr[0]
    let color = arr[1]
    let variable = null

    if (color[0] == '@') {
      variable = color
      color = colorVariables[color]
    } else {
      colorVariables[name] = color
    }

    return {
      type: 'swatch', name, color, variable,
    }
  }
})
.filter((line) => line !== undefined)

module.exports['default'] = {
  colors
}

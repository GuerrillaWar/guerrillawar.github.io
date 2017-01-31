var React = require('react')
var onDemandResizer = require('on-demand-resizer')
var CONFIG = require('../../../../_build-tasks/config.js')
var offside = require('offside')
var resizer
var fs = require('fs')

const loadSvgMedia = function(path) {
  const fullPath = __dirname + '/../../../../src/front-end/cms-media/' + path
  return fs.readFileSync(fullPath, 'utf8')
}

module.exports = {
  matcher: "**/*.react.js",
  basedir: __dirname + "/../front-end/ui",
  extraHead: [].concat(
    [
      React.DOM.script({ key: "tk", src: "https://use.typekit.net/aaaaaaa.js" }),
      React.DOM.script({ key: "tks", dangerouslySetInnerHTML: {
        __html: "try{Typekit.load({ async: true });}catch(e){}"
      }}),
      React.DOM.script({ key: "jstest", dangerouslySetInnerHTML: {
        __html: "if ('querySelector' in document && 'addEventListener' in window) document.documentElement.className = 'js*'"
      }}),
      React.DOM.meta({
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      }),
      // React.DOM.meta({
      //   name: "apple-mobile-web-app-capable",
      //   content: "yes"
      // }),
      React.DOM.meta({
        rel: "apple-touch-icon",
        href: "/assets/favicon/touch-icon.png"
      }),
    ]
    // , [150].map(function(size) {
    //   return React.DOM.meta({
    //     rel: "apple-touch-icon",
    //     sizes: size + 'x' + size,
    //     href: "/assets/favicon/touch-icon-" + size + ".png"
    //   })
    // })
  ),
  scripts: [
    '/assets/js/app-bundle.js',
  ],
  styles: [
    // '/assets/main.css',
    '/assets/app.css',
  ],
  getTestData: (component, path) => {
    const dataPath = path.replace(".react.js", ".data.js")
    try {
      const testData = require(dataPath)
      return testData
    } catch (e) {
      console.error("Props failed loading.")
      console.error(e.stack)
      return {default: {}}
    }
  },
  wrapComponent: (component, props) => {
    var RootContext = require('../front-end/ui/_/RootContext.js')

    if (!resizer) {
      resizer = onDemandResizer({
        sourceType: 'local',
        sourcePath: __dirname + '/../../../../src/front-end/cms-media',
        destType: 'local',
        destPath: __dirname + '/../../../../' + CONFIG.paths.mediaOut,
        urlBase: '/media',
        imageMagick: true,
        defaultQuality: 80
      })
    }

    return React.createElement(
      RootContext.default, {
        resizer, loadSvgMedia,
      },
      React.createElement(component, props || {})
    )
  },
}

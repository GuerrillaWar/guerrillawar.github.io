import ComponentServer from 'react-component-library'
var React = require('react')
var onDemandResizer = require('on-demand-resizer')
var ReactDOM = require('react-dom/server')
var CONFIG = require('../../../../_build-tasks/config.js')
var offside = require('offside')
var express = require('express')
var fs = require('fs')
var world, resizer

var serverSettings = require('./settings');

// look at this hacky shit :) it works though for importing svg as string
require.extensions['.svg'] = function(module, filename) {
  var raw = fs.readFileSync(filename, 'utf8')
  var proper = 'module.exports = "' + raw.replace(/\n/g, "").replace(/"/g, '\\"') + '";'
  return module._compile(proper, filename)
}

const server = ComponentServer(serverSettings);

const ASSET_PATH = __dirname + "/../../../../_build/assets/"
const MEDIA_PATH = __dirname + "/../../../../_build/media/"
server.configApp((app) => {
  app.use('/assets', express.static(ASSET_PATH))
  app.use('/media', express.static(MEDIA_PATH))
})


console.log("Running Component Server, port 3600")
console.log("ASSETS from ", ASSET_PATH)
console.log("MEDIA from ", MEDIA_PATH)

server.listen(3600)

import ComponentServer from 'react-component-library'
var React = require('react')
var onDemandResizer = require('on-demand-resizer')
var CONFIG = require('../../../build-tasks/config.js')
var offside = require('offside')
var express = require('express')
var fs = require('fs')
var world, resizer

CONFIG.paths.mediaOut = "./dist/styleguide/media";
var serverSettings = require('./settings');

// look at this hacky shit :) it works though for importing svg as string
require.extensions['.svg'] = function(module, filename) {
  var raw = fs.readFileSync(filename, 'utf8')
  var proper = 'module.exports = "' + raw.replace(/\n/g, "").replace(/"/g, '\\"') + '";'
  return module._compile(proper, filename)
}

const server = ComponentServer(serverSettings);

const RENDER_PATH = __dirname + "/../../../dist/styleguide/"

server.staticBuild(RENDER_PATH)

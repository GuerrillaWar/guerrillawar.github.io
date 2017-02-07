var gulp = require("gulp")

var CONFIG = {
  paths: {
    frontEnd: "./src/front-end",
    componentServer: "./src/component-server",
    scriptsOut: "./build/scripts",
    assetsOut: "./build",
    mediaOut: "./build/media",
    dist: "./_dist",
  },

  watching: false,
  packed: false,

  taskLists: {
    componentLibrary: [
      "scripts:compile",
      "styles:dependency-check",
      "styles:lint",
      "copy:favicon",
      "copy:images",
      "copy:fonts",
      "copy:component-images",
      "dependencies:move",
      "styles:compile",
      "scripts:bundle"
    ],
    fullBuild: [
      "scripts:compile",
      "copy:favicon",
      "copy:images",
      "copy:fonts",
      "copy:view-layer-deps",
      // "email:templates",
      "copy:component-images",
      "email:templates",
      "dependencies:move",
      "styles:compile",
      "scripts:library-bundle",
      "scripts:bundle",
      "copy:server",
      "copy:view-layer"
    ]
  },
}

module.exports = CONFIG

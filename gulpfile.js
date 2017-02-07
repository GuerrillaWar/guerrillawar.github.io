var gulp = require("gulp"),
    tar = require("gulp-tar"),
    gzip = require("gulp-gzip"),
    using = require("gulp-using"),
    growl = require("growl"),
    cached = require("gulp-cached"),
    wait = require("gulp-wait"),
    debounce = require("debounce"),
    chokidar = require("chokidar"),
    del = require("del"),
    staticMount = require("serve-static"),
    connect = require("gulp-connect")

var CONFIG = require("./_build-tasks/config.js")

Object.assign = Object.assign || require("object.assign")

require("./_build-tasks/scripts.js")
require("./_build-tasks/styles.js")
require("./_build-tasks/copyAssets.js")
require("./_build-tasks/dependencies.js")

var runTasks = function(tasks) {
  return debounce(function(e, p) { gulp.start(tasks) }, 500)
}

growl("Gulp Started")

gulp.task("clean", function() {
  return del([ 'build/**/*',
  ]);
})

gulp.task("component-library:dev", ["clean"], function() {
  CONFIG.watching = true
  gulp.start(CONFIG.taskLists.componentLibrary)

  chokidar.watch(CONFIG.paths.frontEnd + "/**/*.styl")
          .on("all", runTasks(["styles:compile", "styles:dependency-check"]))
  chokidar.watch(CONFIG.paths.componentServer + "/**/*.styl")
          .on("all", runTasks(["styles:compile", "styles:dependency-check"]))
  chokidar.watch(CONFIG.paths.frontEnd + "/**/*.js")
          .on("all", runTasks(["scripts:compile"]))
  chokidar.watch(CONFIG.paths.componentServer + "/**/*.js")
          .on("all", runTasks(["scripts:compile"]))
})

gulp.task("default", function() {
  gulp.start("component-library:dev")
})

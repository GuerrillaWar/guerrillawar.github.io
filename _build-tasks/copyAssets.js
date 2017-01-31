var gulp = require("gulp"),
    reactJadeTransformer = require("react-jade-transformer"),
    rename = require("gulp-rename"),
    sourcemaps = require("gulp-sourcemaps"),
    pleeease = require("gulp-pleeease"),
    using = require("gulp-using"),
    file = require("gulp-file"),
    connect = require("gulp-connect")

var CONFIG = require("./config.js")
var dispatchErrors = require("./errors.js").dispatchErrors

gulp.task("copy:favicon", function() {
  gulp.src([
    CONFIG.paths.frontEnd + "/design-assets/favicons/**/*"
  ]).pipe(gulp.dest(CONFIG.paths.assetsOut + "/assets/favicons"))
    .pipe(connect.reload())
    .pipe(using())
})

gulp.task("copy:images", function() {
  gulp.src([
    CONFIG.paths.frontEnd + "/design-assets/emails/*"
  ]).pipe(gulp.dest(CONFIG.paths.assetsOut + "/assets/emails"))
    .pipe(connect.reload())
    .pipe(using())
})

gulp.task("copy:component-images", function() {
  var fontExts = ['eot', 'woff', 'woff2']
  var imageExts = ['jpg', 'png', 'gif', 'jpeg', 'svg']
  gulp.src([
    CONFIG.paths.frontEnd + '/ui/**/*.{' + [].concat(imageExts, fontExts).join(',') + '}'
  ]).pipe(rename(function(path) {
      var dirs = path.dirname.split("/")
      dirs.shift() // remove "atoms"/"molecules" bit preserving any sub-directories
      path.dirname = dirs.join("/")
      return path
    }))
    .pipe(gulp.dest(CONFIG.paths.assetsOut + "/assets"))
    .pipe(connect.reload())
    .pipe(using())
})

gulp.task("copy:fonts", function() {
  gulp.src([
    CONFIG.paths.frontEnd + "/design-assets/fonts/**/*.*"
  ]).pipe(gulp.dest(CONFIG.paths.assetsOut + "/assets/fonts"))
    .pipe(connect.reload())
    .pipe(using())
})

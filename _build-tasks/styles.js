var gulp = require("gulp"),
    reactJadeTransformer = require("react-jade-transformer"),
    stylus = require("gulp-stylus"),
    sourcemaps = require("gulp-sourcemaps"),
    pleeease = require("gulp-pleeease"),
    postcss = require("gulp-postcss"),
    using = require("gulp-using"),
    connect = require("gulp-connect")

// postcss plugins:
var autoprefixer = require('autoprefixer')
var bemc_linter = require("bemc-linter")

var CONFIG = require("./config.js")
var dispatchErrors = require("./errors.js").dispatchErrors
var defaultPlumber = require("./errors.js").defaultPlumber

var css_config = {
  "include css": true,
  // ^ Allow *.css files to be imported inline
}

gulp.task("styles:compile", function() {
  return gulp.src([
    CONFIG.paths.frontEnd + "/app.styl",
    // CONFIG.paths.frontEnd + "/ie8.less",
    // CONFIG.paths.frontEnd + "/admin.less"
  ]).pipe(defaultPlumber())
    .pipe(stylus(css_config))
    .on("error", dispatchErrors("stylus", true))
    .pipe(pleeease({
      minifier: false,
      import: false,
      mqpacker: false,
      opacity: false,
      autoprefixer: {browsers: "last 4 versions"},
    }))
    .pipe(gulp.dest(CONFIG.paths.assetsOut + "/assets"))
    .pipe(connect.reload())
    .pipe(using())
})

gulp.task("styles:dependency-check", function() {
  return gulp.src([
    CONFIG.paths.frontEnd + "/ui/**/*.styl",
  ]).pipe(defaultPlumber())
    .pipe(stylus(css_config))
    .on("error", dispatchErrors("stylus", true))
    .pipe(connect.reload())
    .pipe(using({prefix:'CSS Dependencies Check ->', color:'blue'}))
})

gulp.task("styles:lint", function() {
  return gulp.src([
    CONFIG.paths.frontEnd + "/**/app.styl",
  ]).pipe(defaultPlumber())
    .pipe(stylus(css_config))
    .on("error", dispatchErrors("stylus", true))
    .pipe(postcss([bemc_linter]))
    .pipe(connect.reload())
    .pipe(using({prefix:'Lint ->', color:'green'}))
})

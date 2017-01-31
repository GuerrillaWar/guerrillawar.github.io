var gulp = require('gulp'),
    reactJadeTransformer = require('react-jade-transformer'),
    using = require('gulp-using'),
    modernizr = require('gulp-modernizr'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    babel = require('gulp-babel')

var CONFIG = require('./config.js')
var dispatchErrors = require('./errors.js').dispatchErrors

gulp.task('dependencies:move', function() {
  var rawDeps = gulp.src([
    './node_modules/redux/dist/redux.js',
  ]).pipe(gulp.dest(CONFIG.paths.assetsOut + '/assets/js'))
    .pipe(using())

  var headDeps = gulp.src([
    './build-tasks/dependencies.js'
  ]).pipe(modernizr('modernizr.js', {
    options: [
      'setClasses',
      'addTest',
      // 'html5printshiv',
      'testProp',
      'fnBind',
      'html5shiv'
    ],
    tests: [
      'svg/inline'
    ],
    uglify: true,
    cache: false,
  }))
  .pipe(gulp.dest(CONFIG.paths.assetsOut + '/assets/js'))
  .pipe(using())

  if (CONFIG.packed) {

    var footDeps = gulp.src([
      './node_modules/jquery/dist/redux.min.js',
    ]).pipe(concat('deps-bundle.min.js'))
      .pipe(gulp.dest(CONFIG.paths.assetsOut + '/assets/js'))
      .pipe(using())

    return merge(rawDeps, headDeps, footDeps)
  } else {
    return merge(rawDeps, headDeps)
  }
})

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    reactJadeTransformer = require('react-jade-transformer'),
    using = require('gulp-using'),
    source = require('vinyl-source-stream'),
    babel = require('gulp-babel'),
    changed = require('gulp-changed'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    merge = require('merge-stream'),
    connect = require('gulp-connect')

var CONFIG = require('./config.js')
var dispatchErrors = require('./errors.js').dispatchErrors
var defaultPlumber = require('./errors.js').defaultPlumber

// look at this hacky shit :) it works though for importing svg as string
require.extensions['.svg'] = function(module, filename) {
  var raw = fs.readFileSync(filename, 'utf8')
  var proper = 'module.exports = "' + raw.replace(/\n/g, "").replace(/"/g, '\\"') + '";'
  return module._compile(proper, filename)
}

gulp.task('scripts:compile', function() {
  var stream = gulp.src([
    CONFIG.paths.frontEnd + '/**/*.js',
    CONFIG.paths.componentServer + '/**/*.js',
  ], { base: './' })
    .pipe(defaultPlumber())
    .pipe(changed(CONFIG.paths.scriptsOut))
    .pipe(reactJadeTransformer.gulp())
    .pipe(babel({'presets': ['es2015', 'stage-1']}))
    .on('error', dispatchErrors('babel', true))
    .pipe(gulp.dest(CONFIG.paths.scriptsOut))
    .pipe(using({prefix: 'ES5 ->'}))

  var svgs = gulp.src([
    CONFIG.paths.frontEnd + '/**/*.{svg,less,html,md,json}',
  ], { base: './' })
    .pipe(defaultPlumber())
    .pipe(changed(CONFIG.paths.scriptsOut))
    .pipe(gulp.dest(CONFIG.paths.scriptsOut))
    .pipe(using({prefix: 'EXTRA REQUIRES ->'}))

  return merge(stream, svgs)
})

var doBrowserify = function(entry, resultName, callback) {
  var CLIENT_ENV = {
    ISO_ENV: 'client',
    NODE_ENV: CONFIG.packed ? 'production' : 'development',
  }

  var cl = resultName == 'library-bundle.js'
  var outputStats = function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      version: false,
      hash: false,
      assets: true,
      chunks: false,
      chunkModules: false,
      colors: true
    }))

    gulp.src(CONFIG.paths.assetsOut + '/assets/js/' + resultName)
      .pipe(connect.reload())
      .pipe(using({prefix: 'RELOAD ->'}))

    if (CONFIG.packed) {
      gulp.src(CONFIG.paths.assetsOut + '/assets/js/' + resultName)
        .pipe(uglify())
        .pipe(rename(resultName.split('.')[0] + '.min.js'))
        .pipe(gulp.dest(CONFIG.paths.assetsOut + '/assets/js'))
        .pipe(using({prefix: 'MINJS ->'}))
    }

    if (!CONFIG.watching) callback()
  }

  var compiler = webpack({
    content: CONFIG.paths.scriptsOut,
    entry: entry,
    output: {
      path: CONFIG.paths.assetsOut + '/assets/js',
      filename: resultName,
      libraryTarget: cl ? 'var' : undefined,
      library: cl ? 'ComponentLibrary' : undefined,
    },
    resolve:{
      modulesDirectories: ['node_modules'],
      alias:{
        'matches-selector/matches-selector': 'desandro-matches-selector',
        'eventEmitter/EventEmitter': 'wolfy87-eventemitter',
        'get-style-property/get-style-property': 'desandro-get-style-property'
      }
    },
    module: {
      loaders: [{
        test: /\.svg$/,
        loader: 'svg-inline',
      },
      // {
      //   test: /isotope\-|fizzy\-ui\-utils|desandro\-|masonry|outlayer|get\-size|doc\-ready|eventie|eventemitter|packery/,
      //   loader: 'imports?define=>false&this=>window'
      // },
      {
        test: /\.react.js$/,
        loader: 'null-loader',
      }]
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': Object.keys(CLIENT_ENV).reduce(function(o, k) {
          o[k] = JSON.stringify(CLIENT_ENV[k])
          return o
        }, {})
      })
    ]
  })

  if (CONFIG.watching) {
    compiler.watch({
      aggregateTimeout: 300
    }, outputStats)
  } else {
    compiler.run(outputStats)
  }

  return compiler
}

gulp.task('scripts:bundle', ['scripts:compile'], function(cb) {
  return doBrowserify(CONFIG.paths.scriptsOut + '/src/front-end/app.js',
    'app-bundle.js', cb)
})

// gulp.task('scripts:library-bundle', ['scripts:compile'], function(cb) {
//   return doBrowserify(CONFIG.paths.scriptsOut + '/front-end/componentLibrary.js',
//     'library-bundle.js', cb)
// })

var gutil = require("gulp-util"),
    growl = require("growl"),
    plumber = require("gulp-plumber")

module.exports.dispatchErrors = function(pluginName, closeTask) {
  return function(err) {
    if (closeTask) {
      this.emit("end")
    }
    growl(pluginName + " - " + err.message)
    console.log("ERROR - " + pluginName) //eslint-disable-line no-console
    gutil.log(err.message)
    console.log("---------------------") //eslint-disable-line no-console
  }
}

module.exports.defaultPlumber = function() {
  return plumber({
    errorHandler: function(err) {
      console.error(err.message) //eslint-disable-line no-console
      console.error(err.stack) //eslint-disable-line no-console
      this.emit("end")
    }
  })
}

'use strict'

module.exports = function(gulp, plugins, browserSync) {
  return function() {
    browserSync.init({
      server: {
          baseDir: "./src",
          routes: {
              "/node_modules": "node_modules"
          }
      }
    })
  }
}

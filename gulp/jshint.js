'use strict'

module.exports = function(gulp, plugins, config) {
  return function() {
    gulp.src(config.src.js + '*.js')
      .pipe(plugins.jshint('.jshintrc'))
      .pipe(plugins.jshint.reporter('jshint-stylish', {
        breakOnError: true
      }))
  }
}

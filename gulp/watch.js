'use strict'

module.exports = function(gulp, plugins, browserSync, config) {
  return function() {
    gulp.watch(config.src.sass + '**/*.scss', ['sass','sass-stylelint'])
    gulp.watch(config.src.js + '**/*.js', ['scripts','jshint','standard'])
    gulp.watch(config.src.html + '**/*.html').on('change', browserSync.reload)
  }
}

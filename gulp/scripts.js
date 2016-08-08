'use strict'

module.exports = function(gulp, plugins, browserSync, config) {
  return function() {
    gulp.src(config.src.js + '*.js')
      .pipe(plugins.uglify())
      .pipe(gulp.dest(config.dist))
      .pipe(browserSync.stream())
  }

}

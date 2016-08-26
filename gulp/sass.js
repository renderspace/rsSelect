'use strict'

module.exports = function(gulp, plugins, browserSync, config) {
  return function() {
    gulp.src(config.src.sass + '*.scss')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        includePaths: config.includeSass,
        outputStyle: 'compressed',
      }).on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer('last 2 version'))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(config.src.css))
      .pipe(browserSync.stream())
  }
}

'use strict'

var path = require('path')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var dest = path.join(taskTarget, 'js')

  gulp.task('scripts', ['standard'], function () {
    return gulp.src(config.scriptSources)
      .pipe(plugins.changed(dest))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.debug({title: 'JS sourcemaps ouput:'}))
      .pipe(plugins.uglify())
      .pipe(plugins.concat('bundle.js'))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({match: '**/*.js'}))
  })
}

'use strict'
var path = require('path')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var dest = path.join(config.directories.destination)

  gulp.task('dist', function () {
    gulp.src(path.join(taskTarget, 'css/*.{css,map}'))
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(path.join(dest, 'css')))

    gulp.src(path.join(taskTarget, 'js/**/*.{js,map}'))
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(path.join(dest, 'js')))

    gulp.src(path.join(taskTarget, 'images/**/*.*'))
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(path.join(dest, 'images')))

    gulp.src(path.join(taskTarget, 'fonts/**/*.*'))
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(path.join(dest, 'fonts')))
  })
}

'use strict'

var path = require('path')
var gulpif = require('gulp-if')
var tinypng = require('gulp-tinypng')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var dest = path.join(taskTarget, 'images')

  // Imagemin
  gulp.task('images', function () {
    return gulp.src(path.join('src', '_images', '**/*.{jpg,jpeg,gif,svg,png,gif}'))
      .pipe(plugins.changed(dest))
      .pipe(gulpif(args.production, tinypng('X38mgfCv7VQdUxkRtcSoaRXHFJfeAWxh')))
      .pipe(gulp.dest(dest))
  })
}

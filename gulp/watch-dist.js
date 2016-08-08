'use strict'
var path = require('path')
var runSequence = require('run-sequence')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  gulp.task('watch-dist', function () {
    gulp.watch([
      path.join('src/_sass', '**/*.{scss,sass}'),
      path.join('src/_modules', '**/*.{scss,sass}')
    ], function () { runSequence('sass', 'dist') })
  })
}

'use strict'
var path = require('path')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var src = 'src/_js/**.js'

  gulp.task('standard', function () {
    gulp.src(src)
      .pipe(plugins.standard())
      .pipe(plugins.standard.reporter('default', {
        breakOnError: true
      }))
  })
}

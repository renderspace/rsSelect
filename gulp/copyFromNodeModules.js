'use strict'

var path = require('path')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var src = config.extraModules || [] 
  var dest = path.join(taskTarget, 'js')

  gulp.task('copyFromNodeModules', function () {
    return gulp.src(src)
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(dest))
  })
}

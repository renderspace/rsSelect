'use strict'
var path = require('path')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var dest = path.join(taskTarget, '_images'.replace(/^_/, ''))

  var svgConfig = {
    mode: {
      css: {
        render: {
          css: true
        }
      }
    }
  }

  gulp.task('svg', function () {
    return gulp.src(path.join('src', '_images', '**/*.{svg}'))
      .pipe(plugins.svgSprite(svgConfig))
      .pipe(gulp.dest(dest))
  })
}

'use strict'

var path = require('path')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var src = [ path.join('src', '**/*'),
    '!' + path.join('src', '{**/\_*,**/\_*/**}'),
    '!' + path.join('src', '**/*.nunjucks'),
    '!' + path.join('src', '**/*.md')
  ]
  var dest = path.join(taskTarget)

  gulp.task('copy', function () {
    return gulp.src(src)
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(dest))
  })
}

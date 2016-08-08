'use strict'

var path = require('path')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  // Watch task
  gulp.task('watch', function () {
    var sassIncludes = [
      path.join('src/_sass', '**/*.{scss,sass}')
    ]

    // if (typeof di rs.modules != 'undefined') {
    //  sassIncludes.push(path.join('src', dirs.modules, '**/*.{scss,sass}'))  
    // }

    gulp.watch(sassIncludes, ['sass'])

    gulp.watch([
      path.join('src/_js', '**/*.js')
    ], ['scripts'])

    // Nunjucks Templates
    gulp.watch([
      path.join('src', '**/*.nunjucks'),
      path.join('src/_data', '**/*.json')
    ], ['nunjucks'])

    // Copy
    gulp.watch([
      path.join('src', '**/*'),
      '!' + path.join('src', '{**/\_*,**/\_*/**}'),
      '!' + path.join('src', '**/*.nunjucks')
    ], ['copy'])

    // Images
    gulp.watch([
      path.join('src', '_images', '**/*.{jpg,jpeg,gif,svg,png}')
    ], ['images'])

    if (!args.production) {
      gulp.watch([
        path.join('tmp', '**/*'),
        '!' + path.join('tmp', '**/*.{css,map,html,js}')
      ]).on('change', browserSync.reload)
    }
  })
}

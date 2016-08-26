'use strict'

var path = require('path')

module.exports = function (gulp, plugins, config) {
  gulp.task('copy', function () {

   var bases = {
     app: 'src/',
     dist: config.dist,
   }

   var paths = {
    html: ['*.html'],
    scripts: ['js/**/*.js'],
    styles: ['css/*.css'],
   }

   gulp.src(paths.html, {cwd: bases.app})
     .pipe(gulp.dest(bases.dist))

   // Copy STYLESHEETS

   gulp.src(paths.styles, {cwd: bases.app})
     .pipe(gulp.dest(bases.dist + 'css'))

   // Copy JAVASCRIPT & Uglify

   gulp.src(paths.scripts, {cwd: bases.app})
     .pipe(plugins.uglify())
     .pipe(gulp.dest(bases.dist + 'js'))

 })
}

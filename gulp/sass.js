'use strict'

var path = require('path')
var autoprefixer = require('autoprefixer')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var src = path.join('src/_sass', 'style**.{sass,scss}')
  var dest = path.join(taskTarget, 'css')

  gulp.task('sass', function () {
    return gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.debug({title: 'SASS sourcemaps ouput:'}))
      .pipe(plugins.sass({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: config.sassIncludePaths
      }).on('error', plugins.sass.logError))
      .pipe(plugins.postcss([autoprefixer({browsers: ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4']})]))
      .pipe(plugins.if(args.production, plugins.cssnano({rebase: false})))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({match: '**/*.css'}))
  })
}

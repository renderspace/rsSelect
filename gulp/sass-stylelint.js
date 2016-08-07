'use strict'

module.exports = function(gulp, plugins, browserSync, config, stylelint) {
  return function() {

    var syntax_scss = require('postcss-scss')
    var reporter = require('postcss-reporter')

    var processors = [
      stylelint('.stylelintrc'),
      reporter({
        clearMessages: true,
        throwError: false
      })
    ]

    return gulp.src(config.src.sass + '**/*.scss')
      .pipe(plugins.postcss(processors, {
        syntax: syntax_scss
      }))

  }

}

'use strict'

var path = require('path')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var src = path.join(taskTarget, '_sass'.replace(/^_/, '').replace('sass', 'css'), '*.css')
  gulp.task('styleStats', function () {
    return gulp.src(src)
      .pipe(plugins.stylestats({config: {
          'published': false,
          'paths': true,
          'stylesheets': false,
          'styleElements': true,
          'size': true,
          'dataUriSize': true,
          'ratioOfDataUriSize': false,
          'gzippedSize': true,
          'simplicity': true,
          'rules': true,
          'selectors': true,
          'declarations': true,
          'averageOfIdentifier': true,
          'mostIdentifier': true,
          'mostIdentifierSelector': true,
          'averageOfCohesion': true,
          'lowestCohesion': true,
          'lowestCohesionSelector': true,
          'totalUniqueFontSizes': true,
          'uniqueFontSizes': false,
          'totalUniqueFontFamilies': true,
          'uniqueFontFamilies': false,
          'totalUniqueColors': true,
          'uniqueColors': false,
          'totalUniqueBackgroundImages': false,
          'uniqueBackgroundImages': false,
          'idSelectors': true,
          'universalSelectors': true,
          'unqualifiedAttributeSelectors': true,
          'javascriptSpecificSelectors': '[#\\.]js\\-',
          'userSpecifiedSelectors': false,
          'importantKeywords': true,
          'floatProperties': true,
          'mediaQueries': true,
          'propertiesCount': 0,
          'requestOptions': {}
      } }))
  })
}

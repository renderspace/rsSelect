'use strict'

var fs = require('fs')
var path = require('path')
var foldero = require('foldero')
var nunjucks = require('gulp-nunjucks-html')
var yaml = require('js-yaml')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var dest = path.join(taskTarget)
  var dataPath = 'src/_data'

  // Nunjucks template compile
  gulp.task('nunjucks', function () {
    var siteData = {}
    if (fs.existsSync(dataPath)) {
      console.log('==== DEBUG: Convert directory to JS Object ====')
      siteData = foldero(dataPath, {
        recurse: true,
        whitelist: '(.*/)*.+\.(json|yaml)$',
        loader: function loadAsString (file) {
          var json = {}
          try {
            if (path.extname(file).match(/^.ya?ml$/)) {
              json = yaml.safeLoad(fs.readFileSync(file, 'utf8'))
            } else {
              json = JSON.parse(fs.readFileSync(file, 'utf8'))
            }
          } catch(e) {
            console.log('Error Parsing JSON file: ' + file)
            console.log('==== Details Below ====')
            console.log(e)
          }
          return json
        }
      })
    }

    // Add --debug option to your gulp task to view
    // what data is being loaded into your templates
    if (args.debug) {
      console.log('==== DEBUG: site.data being injected to templates ====')
      console.log(siteData)
      console.log('\n==== DEBUG: package.json config being injected to templates ====')
      console.log(config)
    }

    return gulp.src([
      path.join('src', '**/*.nunjucks'),
      '!' + path.join('src', '{**/\_*,**/\_*/**}')
    ])
      .pipe(plugins.changed(dest))
      .pipe(plugins.plumber())
      .pipe(plugins.data({
        config: config,
        debug: true,
        site: {
          data: siteData
        }
      }))
      .pipe(nunjucks({
        searchPaths: [path.join('src')],
        ext: '.html'
      }).on('error', function (err) {
        plugins.util.log(err)
      }))
      .pipe(plugins.htmlmin({
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true
      }))
      .pipe(gulp.dest(dest))
      .on('end', browserSync.reload)
  })
}

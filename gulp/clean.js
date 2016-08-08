'use strict'

var path = require('path')
var del = require('del')

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  gulp.task('clean', del.bind(null, [
    path.join('tmp')
  // path.join(dirs.destination)
  ]))
}

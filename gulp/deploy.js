'use strict'
var path = require('path')
var ftp = require('vinyl-ftp')
require('dotenv').load()

module.exports = function (gulp, plugins, args, config, taskTarget, browserSync) {
  var specificConfig = args.production ? config.publish : config.preview
  if (!specificConfig || specificConfig.folder.length < 5) {
    console.log('configuration is missing')
    return
  }

  var ftpConfig = {
    'protocol': 'ftp',
    'host': specificConfig.host,
    'port': 21,
    'user': process.env.FTP_USER,
    'pass': process.env.FTP_PASS,
    'secure': true,
    'secureOptions': {'rejectUnauthorized': false},
    'connTimeout': 10000,
    'pasvTimeout': 10000,
    'keepalive': 10000
  }

  gulp.task('deploy', function () {
    var conn = ftp.create(ftpConfig)
    return gulp.src('tmp/**/**.*', { base: 'tmp', buffer: false })
      .pipe(conn.newer(specificConfig.folder))
      .pipe(conn.dest(specificConfig.folder))
  })
}

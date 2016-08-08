 'use strict'
 
 module.exports = function (gulp, plugins, config) {
   return function() {
     gulp.src(config.src.js + '*.js')
       .pipe(plugins.standard())
       .pipe(plugins.standard.reporter('default', {
         breakOnError: true
       }))
   }
 }

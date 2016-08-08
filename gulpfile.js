'use strict'

var gulp    = require('gulp')
var config = require('./package.json').config
var gulpLoadPlugins = require('gulp-load-plugins') // loads all gulp- prefixed modules
var stylelint = require('stylelint')

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy

var plugins = gulpLoadPlugins()

var runSequence = require('run-sequence')

// browserSync
var browserSync = require('browser-sync').create()
gulp.task('browserSync', require('./gulp/browserSync')(gulp, plugins, browserSync, config))

// SASS
gulp.task('sass', require('./gulp/sass')(gulp, plugins, browserSync, config))
gulp.task('sass-stylelint', require('./gulp/sass-stylelint')(gulp, plugins, browserSync, config, stylelint))

// JS
gulp.task('scripts', require('./gulp/scripts')(gulp, plugins, browserSync, config))
gulp.task('jshint', require('./gulp/jshint')(gulp, plugins, config))
gulp.task('standard', require('./gulp/standard')(gulp, plugins, config))

// other
gulp.task('clean', require('./gulp/clean')(gulp, plugins, config))
gulp.task('copy', require('./gulp/copy')(gulp, plugins, config))

// watch

gulp.task('watch', require('./gulp/watch')(gulp, plugins, browserSync, config))

// DEFAULT TASK - DEVEL WITH WATCHERS

gulp.task('default', ['browserSync','sass','sass-stylelint','scripts','jshint','standard', 'watch'])

// DIST TASK - clean, to dist

gulp.task('dist', function() {
  runSequence(['clean'],'copy')
})

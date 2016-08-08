'use strict'

module.exports = function(gulp, plugins, config) {
  return function() {
    var del = require('del')
    return del(config.dist)
  }
}

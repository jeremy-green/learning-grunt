/**
 * Watching for changes
 */
'use strict';

var config = require('../config');

module.exports = {

  css: {
    files: config.sass.files,
    tasks: ['sass'],
  },
  /*
  js: {
    files: config.jsHintFiles,
    tasks: ['jasmine', 'jshint']
  },
  */
  capture: {
    files: config.capture.files,
    tasks: ['screenshot']
  }

};
/**
 * Capture Options
 */
'use strict';

var config = require('../config');

module.exports = {

  options: {
    url: config.capture.url,
    path: config.capture.path,
    format: 'jpg',
    src: 'screenshot.js',
    name: Date.now().toString(),
    //when i get it running completely in node instead of commandline
    viewports: [
      {
        width: 1024, height: 768
      },
      {
        width: 320, height: 480
      }
    ]
  }

};
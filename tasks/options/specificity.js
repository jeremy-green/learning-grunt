/**
 * Capture Options
 */
'use strict';

var config = require('../config');

module.exports = {

  options: {
    report: config.reportDir + '/css/cssspecificity.txt'
  },
  src: ['css/main.min.css']

};
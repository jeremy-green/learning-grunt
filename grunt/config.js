/**
* Grunt configuration
*/
'use strict';

var pkg = require('../package');
var prv = require('../private');

module.exports = {

  banner: [
    '/*!',
    ' * <%= pkg.title || pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>',
    ' * <%= pkg.description %>',
    ' * <%= pkg.homepage %>',
    ' * Copyright <%= grunt.template.today("yyyy") %> - <%= pkg.author.name %> [<%= pkg.author.url %>]',
    '*/'
  ].join('\n')

};

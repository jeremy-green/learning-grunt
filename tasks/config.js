/**
 * Grunt configuration
 */
'use strict';

var pkg = require('../package');

module.exports = {


  // Metadata.
  banner: [
    '/*!\n <%= asciify_banner %> \n*/',
    '/*!',
    ' * <%= pkg.title || pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>',
    ' * <%= pkg.description %>',
    ' * <%= pkg.homepage %>',
    ' * Copyright <%= grunt.template.today("yyyy") %> - <%= pkg.author.name %> [<%= pkg.author.url %>]'
  ].join('\n'),

  jsbanner: [
    '<%= banner %>',
    ' * <%= project.js.min %> <%= pkg.version %>',
    ' */\n'
  ].join('\n'),

  cssbanner: [
    '<%= banner %>',
    ' * <%= project.css.min %> <%= pkg.version %>',
    ' */'
  ].join('\n'),


  destDir: 'dist',
  reportDir: 'reports',


  // All files that should be checked with JSHint
  jsHintFiles: [
    'Gruntfile.js',
    'js/lib/{,*}*.js',
    //'js/test/*.js',
    //'js/test/specs/**/*.js'
  ],


  capture: {
    files: [
      '**/*.{php,info}',
      'css/{,*/}*.css',
      'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    path: 'screenshots',
    url: 'http://taoti.dev'
  },


  // Sass files
  sass: {
    files: [
      'sass/*.scss'
    ]
  },















  // JavaScript files
  js: {
    files: [
      'js/**/*.js'
    ],
    config: 'js/config.js',
    dest: 'dist/<%= pkg.version %>/main.min.js'
  },




















  // Modernizr files
  modernizr: {
    src: 'components/modernizr/modernizr.js',
    dest: 'dist/<%= pkg.version %>/modernizr.min.js'
  },

  // Images
  img: {
    src: 'img/',
    dest: 'dist/img/'
  },

  tests: {
    src: 'test/specs/**/*spec.js',
    config: 'test/test-main.js'
  }












};

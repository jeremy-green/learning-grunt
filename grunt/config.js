/**
* Grunt configuration
*/
module.exports = function(grunt) {

  grunt.config('banner', {
    header: [
      '/*!',
      ' * <%= pkg.title || pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>',
      ' * <%= pkg.description %>',
      ' * <%= pkg.homepage %>',
      ' * Copyright <%= grunt.template.today("yyyy") %> - <%= pkg.author.name %> [<%= pkg.author.url %>]',
    ].join('\n'),

    jsbanner: [
      '<%= banner.header %>',
      ' * main.min.js <%= pkg.version %>',
      ' */\n'
    ].join('\n'),

    cssbanner: [
      '<%= banner.header %>',
      ' * main.min.css <%= pkg.version %>',
      ' */'
    ].join('\n'),
  });

  grunt.config('project', {
    url: {
      prod: 'http://www.google.com',
      dev: 'http://localhost'
    }
  });

  grunt.config('reports',{
    dir: 'reports'
  });

};

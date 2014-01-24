module.exports = function(grunt) {

  grunt.config('banner', [
    '/*!\n <%= asciify_banner %> \n*/',
    '/*!',
    ' * <%= pkg.title || pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>',
    ' * <%= pkg.description %>',
    ' * <%= pkg.homepage %>',
    ' * Copyright <%= grunt.template.today("yyyy") %> - <%= pkg.author.name %> [<%= pkg.author.url %>]'
  ].join('\n'));

};
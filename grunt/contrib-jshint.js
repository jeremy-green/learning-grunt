module.exports = function(grunt) {

  grunt.config('jshint', {
    options: {
      jshintrc: '.jshintrc'
    },
    gruntfile: {
      src: 'Gruntfile.js'
    },
    tests: ['js/test/*.js'],
    src: ['js/lib/*.js']
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

};

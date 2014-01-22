module.exports = function(grunt) {

  grunt.config('jasmine', {
      js: {
        src: 'js/lib/*.js',
        options: {
          specs: 'js/test/*_spec.js',
          vendor: 'test/vendor/*'
          //helpers: 'spec/*Helper.js'
        }
      }
    });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

};

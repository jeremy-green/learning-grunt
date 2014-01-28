module.exports = function(grunt) {

  grunt.config('asciify', {
    banner: {
      text: '<%= pkg.title || pkg.name %>',
      options: {
        font: 'banner',
        log: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-asciify');

};

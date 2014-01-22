module.exports = function(grunt) {

  grunt.config('cssmin', {
    add_banner: {
      options: {
        banner: '<%= cssbanner %>'
      },
      files: {
        'css/<%= project.css.min %>': ['css/<%= project.css.full %>']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');

};

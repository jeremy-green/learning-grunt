module.exports = function(grunt) {

  grunt.config('cssmin', {
    add_banner: {
      options: {
        banner: '<%= banner.cssbanner %>'
      },
      files: {
        'css/main.min.css': ['css/main.css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');

};

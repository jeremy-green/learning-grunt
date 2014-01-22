module.exports = function(grunt) {

  grunt.config('compass', {
    dist: {
      options: {
        sassDir: 'sass',
        cssDir: 'css',
        environment: 'production'
      }
    },
    dev: {
      options: {
        sassDir: 'sass',
        cssDir: 'css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');

};

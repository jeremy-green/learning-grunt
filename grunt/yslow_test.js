module.exports = function(grunt) {

  grunt.config('yslow_test', {
    options: {
      info: 'all',
      format: 'plain',
      urls: ['localhost'],
      reports: ['reports/yslow.txt']
    },
    build: {
      files: []
    }
  });

  grunt.loadNpmTasks('grunt-yslow-test');

};

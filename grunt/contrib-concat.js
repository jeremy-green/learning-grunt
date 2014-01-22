module.exports = function(grunt) {

  grunt.config('concat', {
    options: {
      //banner: '',
      //stripBanners: true
    },
    dist: {
      src: ['js/lib/vendor/*.js', 'js/lib/<%= project.js.full %>'],
      dest: 'js/dist/<%= project.js.full %>'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

};

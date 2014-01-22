module.exports = function(grunt) {

  grunt.config('uglify', {
    options: {
      banner: '<%= jsbanner %>'
    },
    dist: {
      src: '<%= concat.dist.dest %>',
      dest: 'js/dist/<%= project.js.min %>'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

};

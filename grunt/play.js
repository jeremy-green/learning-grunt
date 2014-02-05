module.exports = function(grunt) {

  grunt.config('play', {
    fanfare: {
      file: './sounds/0.mp3'
    }
  });

  grunt.loadNpmTasks('grunt-play');

};

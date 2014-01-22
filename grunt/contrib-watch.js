module.exports = function(grunt) {

  grunt.config('watch', {
    options: {
      livereload: 9000
    },
    css: {
      files: ['sass/*.scss'],
      tasks: ['compass:dev'],
    },
    js: {
      files: ['js/lib/{,*}*.js'],
      tasks: ['jasmine', 'jshint']
    },
    capture: {
      files: [
        '**/*.{php,info}',
        'css/{,*/}*.css',
        'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
      ],
      tasks: ['screenshot']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

};

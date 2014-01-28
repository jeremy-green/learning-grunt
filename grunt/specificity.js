module.exports = function(grunt) {

  grunt.config('specificity', {
    options: {
      report: 'css/cssspecificity.txt'
    },
    src: ['css/main.min.css']
  });

  grunt.loadTasks('tasks');

};

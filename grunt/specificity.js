module.exports = function(grunt) {

  grunt.config('specificity', {
    options: {
      report: '<%= reports.dir %>/css/cssspecificity.txt'
    },
    src: ['css/main.min.css']
  });

  grunt.loadTasks('tasks');

};

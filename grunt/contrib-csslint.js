module.exports = function(grunt) {

  grunt.config('csslint', {
    options: {
      //these are all issues that come shipped with normalize.css
      csslintrc: '.csslintrc',
      formatters: [
        {
          id: 'text',
          dest: 'reports/css/csslint.txt'
        },
        {
          id: 'csslint-xml',
          dest: 'reports/css/csslint.xml'
        },
        {
          id: 'junit-xml',
          dest: 'reports/css/csslint_junit.xml'
        }
      ],
    },
    strict: {
      options: {
        import: 2
      },
      src: ['css/<%= project.css.full %>']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-csslint');

};

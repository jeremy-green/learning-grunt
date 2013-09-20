module.exports = function(grunt) {
  //http://net.tutsplus.com/tutorials/html-css-techniques/developing-with-sass-and-chrome-devtools/
  //to get sourcemaps working correctly
  //sass -v 3.3.0.alpha.149
  //compass -v 0.12.2
  grunt.registerTask('sass', 'Custom SASS task to generate sourcemaps', function () {
    var files = this.options().files;
    if (files === undefined) {
      grunt.log.warn('Files option is empty');
      return false;
    }
    var done = this.async();
    require('child_process').exec('sass --update --compass --scss --sourcemap ' + files.src + ':' + files.dest, function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });

};
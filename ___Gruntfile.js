/*global module:false*/
module.exports = function(grunt) {

  var config = {};
  grunt.util._.extend(config, loadConfig('./tasks/options/'));

  // Load project configuration
  //grunt.initConfig(config);
  grunt.initConfig({
    watch: {
      options: {
        livereload: 9000
      },
      css: {
        files: ['sass/*.scss'],
        tasks: ['compass:dev'],
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    }
  });

  // Load all npm tasks through node-matchdep (fetches all tasks from package.json)
  //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', [
    'jasmine',
    'jshint',
    'concat',
    'asciify',
    'uglify',
    'sass',
    'specificity',
    'csslint',
    'cssmin',
    'imagemin',
    'yslow_test',
    //'pagespeed',
    'screenshot',
    'tweet',
    'play'
  ]);

};


/**
 * Load configuration files for Grunt
 * @param  {string} path Path to folder with tasks
 * @return {object}      All options
 */
var loadConfig = function (path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', { cwd: path }).forEach(function (option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
};



/**
 * Resources:
 * http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
 * https://github.com/stefanpenner/ember-app-kit
 * https://speakerdeck.com/addyosmani/automating-front-end-workflow
 * http://thenittygritty.co/shared-grunt-configuration
 *
 * Tasks to try:
 * https://npmjs.org/package/grunt-tweet √
 * https://npmjs.org/package/grunt-usemin
 * https://npmjs.org/package/grunt-smushit √
 * https://npmjs.org/package/grunt-ssh
 * https://npmjs.org/package/grunt-selenium
 * https://npmjs.org/package/grunt-scp
 * https://npmjs.org/package/grunt-play √
 * https://npmjs.org/package/grunt-responsive-images
 * https://npmjs.org/package/grunt-phplint X -- sparse documentation
 * https://npmjs.org/package/grunt-modernizr
 * https://github.com/behrang/grunt-phantom X -- sparse documentation
 * https://npmjs.org/package/grunt-markdown-pdf
 * https://github.com/rubenv/grunt-git
 * https://npmjs.org/package/grunt-browserstack √
 * https://npmjs.org/package/grunt-asciify √
 * https://github.com/sindresorhus/grunt-svgmin
 * https://npmjs.org/package/grunt-autoprefixer
 *
 * https://github.com/shakyShane/grunt-browser-sync
 * https://github.com/karma-runner/karma
 *
 * https://github.com/sindresorhus/grunt-concurrent
 * https://github.com/tschaub/grunt-newer
 * https://github.com/addyosmani/grunt-uncss
 * https://github.com/peterkeating/grunt-csscss
 */

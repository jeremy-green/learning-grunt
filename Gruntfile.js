/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    prv: grunt.file.readJSON('private.json'),

    /**
     * @todo change this structure
     * project.json?
     */
    project: {
      url: {
        prod: 'http://www.google.com',
        dev: 'http://localhost'
      },
      js: {
        full: 'main.js',
        min: 'main.min.js',
        vendor: ['modernizr.js']
      },
      css: {
        full: 'main.css',
        min: 'main.min.css'
      }
    },


    // Metadata.
    banner: [
      ' * <%= pkg.title || pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>',
      ' * <%= pkg.description %>',
      ' * <%= pkg.homepage %>',
      ' * Copyright <%= grunt.template.today("yyyy") %> - <%= pkg.author.name %> <%= pkg.author.url %>'
    ].join('\n'),

    jsbanner: [
      '/*!',
      '<%= banner %>',
      ' * <%= project.js.min %> <%= pkg.version %>',
      ' */\n'
    ].join('\n'),

    cssbanner: [
      '/*',
      '<%= banner %>',
      ' * <%= project.css.min %> <%= pkg.version %>',
      ' */'
    ].join('\n'),


    // Task configuration.
    concat: {
      options: {
        //banner: '',
        //stripBanners: true
      },
      dist: {
        src: ['js/lib/vendor/*.js', 'js/lib/<%= project.js.full %>'],
        dest: 'js/dist/<%= project.js.full %>'
      }
    },


    uglify: {
      options: {
        banner: '<%= jsbanner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'js/dist/<%= project.js.min %>'
      }
    },


    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      tests: ['js/test/*.js'],
      src: ['js/lib/<%= project.js.full %>']
    },


    nodeunit: {
      files: ['test/**/*_test.js']
    },


    watch: {
      options: {
        livereload: 9000
      },
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass'],
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
    },


    sass: {
      options: {
        files: {
          src: 'sass/main.scss',
          dest: 'css/<%= project.css.full %>'
        }
      }
    },


    screenshot: {
      options: {
        //escape the colon
        url: '<%= project.url.dev %>'
      }
    },


    cssmin: {
      add_banner: {
        options: {
          banner: '<%= cssbanner %>'
        },
        files: {
          'css/<%= project.css.min %>': ['css/<%= project.css.full %>']
        }
      }
    },


    csslint: {
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
    },


    jasmine: {
      js: {
        src: 'js/lib/*.js',
        options: {
          specs: 'js/test/*_spec.js',
          vendor: 'test/vendor/*'
          //helpers: 'spec/*Helper.js'
        }
      }
    },


    yslow_test: {
      options: {
        info: 'all',
        format: 'plain',
        urls: ['<%= project.url.dev %>'],
        reports: ['reports/yslow.txt']
      },
      build: {
        files: []
      }
    },


    pagespeed: {
      desktop: {
          //needs to be web accessible
          url: '<%= project.url.prod %>',
          locale: 'en_US',
          strategy: 'desktop',
          threshold: 80
      },
      mobile: {
          //needs to be web accessible
          url: '<%= project.url.prod %>',
          locale: 'en_US',
          strategy: 'mobile',
          threshold: 80
      },
      options: {
          key: '<%= prv.google %>',
      }
    },


    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'path/to/code/',
          //themedir: 'path/to/custom/theme/',
          outdir: 'docs/'
        }
      }
    },


    imagemin : {
      production : {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/dist/'
        }]
      }
    },

    specificity: {
      options: {
        report: 'reports/css/cssspecificity.txt'
      },
      src: ['css/<%= project.css.full %>']
    }


  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.loadNpmTasks('grunt-yslow-test');
  grunt.loadNpmTasks('grunt-pagespeed');

  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // Default task.
  grunt.registerTask('default', 'watch');
  grunt.registerTask('build', [
    'jasmine',
    'jshint',
    'concat',
    'uglify',
    'sass',
    'specificity',
    'csslint',
    'cssmin',
    'imagemin',
    'yslow_test',
    //'pagespeed',
    'screenshot'
  ]);

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

  grunt.registerTask('screenshot', 'Take screenshots of a specified URL', function () {
    var url = this.options().url;
    if (url === undefined) {
      grunt.log.warn('URL option is empty.');
      return false;
    }
    var done = this.async();
    require('child_process').exec('phantomjs screenshot.js ' + url, function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });

  grunt.registerMultiTask('specificity', function() {
    var specificity = require('specificity');
    var verbose = grunt.verbose;
    var options = this.options();
    var path = require('path');
    var absoluteFilePaths = options.absoluteFilePathsForFormatters || false;
    var output = '';

    var css = require('css');

    report = options.report;
    if (report === undefined) {
      grunt.log.error('No report is defined');
      return false;
    }

    this.filesSrc.forEach(function( filepath ) {
      input = grunt.file.read(filepath);
      obj = css.parse(input);
      obj.stylesheet.rules.forEach(function(item) {

        selectors = item.selectors;
        if (typeof selectors !== 'undefined') {

          specs = specificity.calculate(selectors.join(', '));
          specs.forEach(function(spec) {
            console.log(spec.specificity.split(',').map(
              function(elt) {
                return /^\d+$/.test(elt) ? parseInt(elt) : 0;
              })
              .reduce( function(a,b) {
                return a+b
              })
            );

            output += spec.selector.trim() + ': ' + spec.specificity + '\n';
          });

        }

      });

    });


    grunt.log.writeln('Saving report to ' + report);
    grunt.file.write(report, output);

  });

};

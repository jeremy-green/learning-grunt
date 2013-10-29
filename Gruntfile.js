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
      '/*!\n <%= asciify_banner %> \n*/',
      '/*!',
      ' * <%= pkg.title || pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>',
      ' * <%= pkg.description %>',
      ' * <%= pkg.homepage %>',
      ' * Copyright <%= grunt.template.today("yyyy") %> - <%= pkg.author.name %> [<%= pkg.author.url %>]'
    ].join('\n'),

    jsbanner: [
      '<%= banner %>',
      ' * <%= project.js.min %> <%= pkg.version %>',
      ' */\n'
    ].join('\n'),

    cssbanner: [
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
        //livereload: 9000
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
        url: '<%= project.url.dev %>',
        path: 'screenshots',
        format: 'jpg',
        src: 'screenshot.js',
        name: Date.now().toString(),
        //when i get it running completely in node instead of commandline
        viewports: [
          {
            width: 1024, height: 768
          },
          {
            width: 320, height: 480
          }
        ]
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
          src: ['lib/**/*.{png,jpg,gif}'],
          dest: 'img/dist/'
        }]
      }
    },


    specificity: {
      options: {
        report: 'reports/css/cssspecificity.txt'
      },
      src: ['css/<%= project.css.full %>']
    },


    drush: {
      clear_cache: {
        args: ['cc', 'all'],
        dest: '.'
      }
    },



    browserstack_list: {
      dev: {
        username: '<%= prv.browserstack.username %>',
        password: '<%= prv.browserstack.password %>'
      }
    },



    browserstack: {
      dev: {
        credentials: {
          username: '<%= prv.browserstack.username %>',
          password: '<%= prv.browserstack.password %>'
        },
        // optional tunnel configuration - if omitted a tunnel is not started
        tunnel: {
          // your BrowserStack API key
          key: '<%= prv.browserstack.key %>',
          // a list of hostnames and ports to expose
          hosts: [{
            name: 'localhost',
            port: 80,
            sslFlag: 0
          }]
        },
        // required worker start configuration
        start: {
          // time to wait for workers to start running
          //queueTimeout: QUEUE_TIMEOUT,
          // default URL for started workers
          //url: 'http://gcorr.dev',
          // default timeout for started workers
          //timeout: TIMEOUT,
          // list of browser types to start, as returned from the list function
          browsers: [{
            os: 'win',
            browser: 'chrome',
            version: '15.0',
            // override the default URL
            url: 'URL',
            // override the default worker timeout
            //timeout: TIMEOUT
          }]
        }
      }
    },


    asciify: {
      banner: {
        text: '<%= pkg.title || pkg.name %>',
        options: {
          font: 'banner',
          log: true
        }
      }
    },


    tweet: {
      options: {
        consumer_key: '<%= prv.twitter.consumer_key %>',
        consumer_secret: '<%= prv.twitter.consumer_secret %>',
        access_token: '<%= prv.twitter.access_token %>',
        access_token_secret: '<%= prv.twitter.access_token_secret %>'
      },
      release: {
        options: {
          crop: true
        },
        text: '* GRUNT *',
        //url: 'URL'
      }
    },



    play: {
      fanfare: {
        file: './sounds/0.mp3'
      }
    },



    smushit: {
      test: {
        src: ['img/lib/**/*.png','img/lib/**/*.jpg'],
        dest: 'img/dist'
      }
    },


    sendmail: {
      options: {
        email: "to@whatever.com",
        subject: "whatup",
        message: "hi"
      }
    },


    browser_sync: {
      files: {
        src : 'css/*.css'
      },
      options: {
        watchTask: true,
        server: {
            baseDir: "."
        },
        host : "taoti.dev",
      }
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

  grunt.loadNpmTasks('grunt-drush');

  grunt.loadNpmTasks('grunt-yslow-test');
  grunt.loadNpmTasks('grunt-pagespeed');

  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  grunt.loadNpmTasks('grunt-browserstack');

  grunt.loadNpmTasks('grunt-asciify');
  grunt.loadNpmTasks('grunt-tweet');
  grunt.loadNpmTasks('grunt-play');

  grunt.loadNpmTasks('grunt-smushit');

  grunt.loadNpmTasks('grunt-browser-sync');


  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['browser_sync', 'watch']);
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
 * Resources:
 * http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
 * https://github.com/stefanpenner/ember-app-kit
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
 */
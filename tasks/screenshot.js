module.exports = function(grunt) {

    grunt.registerTask('screenshot', 'Take screenshots of a specified URL', function () {

        var options = this.options(),
        url = options.url,
        src = options.src;

        console.log(options.viewports);

        if (url === undefined) {
          grunt.log.warn('URL option is empty.');
          return false;
        }

        if (src === undefined) {
            grunt.log.warn('SRC option is empty.')
            return false;
        }

        var done = this.async();
        require('child_process').exec('phantomjs ' + src + ' ' + url, function (err, stdout) {
          grunt.log.write(stdout);
          done(err);
        });






        /**
         * @todo get this working correctly
         * or just use the damn npm phantomjs plugin or module or whatever its called


        var phantom = require('phantom');
        phantom.create(function(ph) {
          return ph.createPage(function(page) {
            return page.open("http://www.google.com", function(status) {
              console.log("opened google? ", status);
              return page.evaluate((function() {
                return document.title;
              }), function(result) {
                console.log('Page title is ' + result);
                return ph.exit();
              });
            });
          });
        });






        var page = require('webpage').create(),
            system = require('system'),
            t, address;
        address = system.args[1];
        page.open(address, function () {
            t = Date.now().toString();
            viewports = [{width: 1024, height: 768}];
            output = '';
            for (var i = viewports.length - 1; i >= 0; i--) {
                var obj = viewports[i];
                page.viewportSize = obj;
                page.render('./screenshots/' + obj.width + 'x' + obj.height + '/' + t + '.png');
                output += 'Created: [' + obj.width + 'x' + obj.height + ']' + t + '.png\n';
            }
            console.log(output);
            setTimeout(function() {
                phantom.exit();
            }, 1000);
        });




        */





    });

};
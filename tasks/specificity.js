module.exports = function(grunt) {
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

              /*
              console.log(spec.specificity.split(',').map(
                function(elt) {
                  return /^\d+$/.test(elt) ? parseInt(elt) : 0;
                })
                .reduce( function(a,b) {
                  return a+b
                })
              );
              */

              output += spec.selector.trim() + ': ' + spec.specificity + '\n';

            });

          }

        });

      });


      grunt.log.writeln('Saving report to ' + report);
      grunt.file.write(report, output);

    });

};
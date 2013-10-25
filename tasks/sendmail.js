module.exports = function(grunt) {

  grunt.registerTask('sendmail', 'Send an email.', function () {

    var options = this.options();

    var done = this.async();

    var mail = function (cb) {
        grunt.util.spawn({
            cmd: "mail",
            args: [
              "-s",
              options.subject,
              options.email,
              "<",
              options.message
            ]
        }, function (err) {
            cb(!err);
        });
    };

    //grunt.util.async.forEach(this.files, addFile, function (err) {

      //if (!options.ignoreEmpty || staged) {
          mail(done);
      //} else {
      //    done();
      //}

    //});

  });

};
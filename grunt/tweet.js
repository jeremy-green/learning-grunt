module.exports = function(grunt) {

  grunt.config('tweet', {
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
  });

  grunt.loadNpmTasks('grunt-tweet');

};

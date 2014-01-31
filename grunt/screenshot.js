module.exports = function(grunt) {

  grunt.config('screenshot', {
    options: {
      url: 'project.url.dev',
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
  });

  grunt.loadTasks('tasks');

};

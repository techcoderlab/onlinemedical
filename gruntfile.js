module.exports = function (grunt) {
  grunt.initConfig({
    critical: {
      dist: {
        options: {
          base: "./",
          dimensions: [
            {
              width: 1300,
              height: 900,
            },
          ],
        },
        // The source file
        src: "source.html",
        // The destination file
        dest: "index.html",
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-critical");

  // Default tasks.
  grunt.registerTask("default", ["critical"]);
};

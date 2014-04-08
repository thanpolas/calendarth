/*jshint camelcase:false */

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var browsers = [{
  //   browserName: 'internet explorer',
  //   platform: 'XP',
  //   version: '6',
  // }, {
    browserName: 'chrome',
    version: '33',
    platform: 'OS X 10.9'
  }, {
    browserName: 'firefox',
    version: '28',
    platform: 'XP'
  }, {
    browserName: 'chrome',
    version: '33',
    platform: 'XP'
  }//, {
  //   browserName: 'googlechrome',
  //   platform: 'linux'
  // }, {
    // browserName: 'internet explorer',
    // platform: 'Windows 7',
    // version: '10'
  ];

  grunt.initConfig({
    // credentials: grunt.file.readJSON('./credentials.json'),
    connect: {
      options: {
        port: 9001,
        base: './',
        livereload: true,
      },
      server: {
        options: {
          open: 'http://localhost:9001/test',
        }
      },
      test: {
        options: {
          open: false,
        }
      }
    },
    watch: {
      devel: {
        options: {
          livereload: true,
        },
        files: [
          'src/**/*.js',
          'test/**/*.js',
          'test/index.html',
        ],
        tasks: ['build'],
      },

    },
    browserify: {
      dist: {
        files: {
          'build/calendarth.js': ['src/index.js'],
        },
        options: {
          bundleOptions: {
            standalone: 'calendarth',
          },
        },
      }
    },
    uglify: {
      dist: {
        files: {
          'build/calendarth.min.js': ['build/calendarth.js']
        }
      }
    },
    qunit: {
      all: {
        options: {
          force: true,
          urls: [
            'http://localhost:9001/test/index.html?compiled=true',
          ],
          timeout: 34000,
        },
      },
    },
    'saucelabs-qunit': {
      all: {
        options: {
          username: '<%= credentials.sauce.username %>',
          key: '<%= credentials.sauce.key %>',
          urls: ['http://127.0.0.1:9001/test/index.html?compiled=true'],
          tunnelTimeout: 9,
          concurrency: 3,
          testInterval: 26000,
          browsers: browsers,
          testname: 'qunit tests',
          tags: ['master'],
        }
      }
    },

  }); // end grunt.initConfig();

  //
  //
  // Register tasks and aliases
  //
  //

  grunt.registerTask('test', [
    'build',
    'connect:test',
    'saucelabs-qunit:all',
  ]);
  grunt.registerTask('testlocal', [
    'connect:test',
    'qunit:all',
  ]);

  grunt.registerTask('build', 'Build SDK app', [
    'browserify:dist',
    'uglify:dist',
  ]);

  grunt.registerTask('devel', 'Launches a webserver, watches and auto-builds', [
    'build',
    'connect:server',
    'watch:devel',
  ]);


  grunt.registerTask('default', ['devel']);
};

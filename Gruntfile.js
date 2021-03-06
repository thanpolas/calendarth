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
      global: {
        options: {
          bundleOptions: {
            standalone: 'calendarth',
          },
        },
        files: {
          'build/calendarth.js': ['src/index.js'],
        },
      },
      module: {
        files: {
          'build/calendarth-module.js': ['src/index.js'],
        },
      },

    },
    uglify: {
      dist: {
        files: {
          'build/calendarth.min.js': ['build/calendarth.js'],
          'build/calendarth.mod.js': ['build/calendarth-module.js'],
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
    release: {
      options: {
        bump: true, //default: true
        file: 'bower.json', //default: bower.json
        add: true, //default: true
        commit: true, //default: true
        tag: true, //default: true
        push: true, //default: true
        pushTags: true, //default: true
        npm: true, //default: true
        npmTag: true,
        tagName: 'v<%= version %>', //default: '<%= version %>'
        commitMessage: 'releasing v<%= version %>', //default: 'release <%= version %>'
        tagMessage: 'v<%= version %>' //default: 'Version <%= version %>'
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
    'browserify:global',
    'browserify:module',
    'uglify:dist',
  ]);

  grunt.registerTask('devel', 'Launches a webserver, watches and auto-builds', [
    'build',
    'connect:server',
    'watch:devel',
  ]);


  grunt.registerTask('default', ['devel']);
};

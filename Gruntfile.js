/* global module, require */
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= dir.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= dir.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {
  var config = require('./config.json');

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    dir: config.directories,

    watch: {
      assemble: {
        files: ['<%= dir.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      less: {
        files: ['<%= dir.src %>/css/**/*.{css, less}'],
        tasks: ['less']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= dir.dist %>/*.html',
          '<%= dir.dist %>/assets/css/**/*.css',
          '<%= dir.dist %>/js/**/*.js',
          '<%= dir.dist %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
            base: [
            '<%= dir.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= dir.dist %>/assets',
          layout: '<%= dir.src %>/templates/layouts/default.hbs',
          data: '<%= dir.src %>/data/*.{json,yml}',
          partials: '<%= dir.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= dir.dist %>/': ['<%= dir.src %>/templates/pages/*.hbs']
        }
      }
    },

    browserify: {
      main: {
        src: '<%= dir.src %>/js/main.js',
        dest: '<%= dir.dist %>/js/main.bundled.js'
      }
    },

    copy: {
      assets: {
        expand: true,
        cwd: 'src/assets/',
        src: '**',
        dest: '<%= dir.dist %>/assets/'
      },
      files: {
        expand: true,
        cwd: 'src/files/',
        src: '**',
        dest: '<%= dir.dist %>/files/'
      },
      img: {
        expand: true,
        cwd: 'src/img/',
        src: '**',
        dest: '<%= dir.dist %>/img/'
      },
      vendor: {
        expand: true,
        cwd: 'src/js/vendor',
        src: '**',
        dest: '<%= dir.dist %>/js/vendor/'
      },
      web: {
        expand: true,
        cwd: 'src/webcomponent',
        src: '**',
        dest: '<%= dir.dist %>/webcomponent/'
      }
    },

    less: {
      development: {
        options: {
          paths: ['<%= dir.src %>/css']
        },
        files: {
          '<%= dir.dist %>/assets/main.css': '<%= dir.src %>/css/main.less'
        }
      },
      production: {
        options: {
          paths: ['<%= dir.src %>/css'],
          compress: true
        },
        files: {
          '<%= dir.dist %>/assets/main.css': '<%= dir.src %>/css/main.less'
        }
      }
    },

    clean: ['<%= dir.dist %>/**/*'],

    postcss: {
      options: {
        processors: [
          require('autoprefixer')(config.autoprefixer),
          require('css-mqpacker')(),
          require('cssnano')()
        ]
      },
      dist: {
        src: '<%= dir.dist %>/assets/main.css'
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= dir.dist %>/js/main.bundled.js': ['<%= dir.dist %>/js/main.bundled.js']
        }
      }
    },
  });

  grunt.loadNpmTasks('assemble-less');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'less',
    'postcss',
    'browserify',
    'uglify',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};

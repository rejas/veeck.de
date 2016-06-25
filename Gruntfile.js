/*
 * Generated on 2016-06-25
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2016 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml,less}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.less',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    browserify: {
      main: {
        src: '<%= config.src %>/js/main.js',
        dest: '<%= config.dist %>/js/main.bundled.js'
      }
    },

    copy: {
      assets: {
        expand: true,
        cwd: 'src/assets/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      },
      img: {
        expand: true,
        cwd: 'src/img/',
        src: '**',
        dest: '<%= config.dist %>/img/'
      },
      vendor: {
        expand: true,
        cwd: 'src/js/vendor',
        src: '**',
        dest: '<%= config.dist %>/js/vendor/'
      }
    },

    less: {
      development: {
        options: {
          paths: ["<%= config.src %>/css"]
        },
        files: {
          "<%= config.dist %>/assets/main.css": "<%= config.src %>/css/main.less"
        }
      },
      production: {
        options: {
          paths: ["<%= config.src %>/css"],
          compress: true
        },
        files: {
          "<%= config.dist %>/assets/main.css": "<%= config.src %>/css/main.less"
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble-less');

  grunt.loadNpmTasks('grunt-assemble');

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'less',
    'browserify',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};

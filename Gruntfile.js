'use strict';

module.exports = function(grunt) {
    const config = require('./config/grunt.config.js'),
          webpackConfig = require('./config/webpack.config.js'),
          mozjpeg = require('imagemin-mozjpeg');

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        dir: config.directories,

        modernizr: {
            dist: {
                cache: false,
                dest: '<%= dir.src %>/js/vendor/modernizr.min.js',
                files: {
                    src: ['<%= dir.src %>/**/*.js']
                },
                options: config.modernizr,
                parseFiles: true,
                uglify : false
            }
        },

        jimp: {
            medium: {
                options: {
                    suffix: 'medium',
                    actions: {
                        scaleToFit: [1920, 1920],
                        quality: 60
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.org %>/img/travel',
                    src: '**/*.jpg',
                    dest: '<%= dir.src %>/img/travel'
                }]
            },
            small: {
                options: {
                    suffix: 'small',
                    actions: {
                        scaleToFit: [448, 387],
                        quality: 60
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.org %>/img/travel',
                    src: '**/*.jpg',
                    dest: '<%= dir.src %>/img/travel'
                }]
            },
            placeholders: {
                options: {
                    suffix: 'placeholder',
                    actions: {
                        scaleToFit: [448, 387],
                        blur: 40,
                        quality: 30
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.src %>/img/travel',
                    src: '**/*.small.jpg',
                    dest: '<%= dir.src %>/img/travel'
                }]
            }
        },

        imagemin: {
            all: {
                options: {
                    progressive: true,
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.src %>/img',
                    src: '**/*.jpg',
                    dest: '<%= dir.src %>/img'
                }]
            },
            bg: {
                options: {
                    progressive: true,
                    use: [mozjpeg({quality: 60})]
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.org %>/img/backgrounds',
                    src: '**/*.jpg',
                    dest: '<%= dir.src %>/img/backgrounds'
                }]
            }
        },

        'release-it': {
            dist: {
                options: config.release
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'copy',
        'uglify',
        'webpack',
        'assemble',
        'htmlmin'
    ]);

    grunt.registerTask('prepare', [
        'jimp',
        'imagemin',
        'modernizr'
    ]);

    grunt.registerTask('serve', [
        'default',
        'connect',
        'watch'
    ]);

    grunt.registerTask('check', [
        'eslint',
        'lesshint'
    ]);
};

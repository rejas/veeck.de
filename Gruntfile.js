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

        watch: {
            assemble: {
                files: ['<%= dir.assemble %>/{,*/}*.{md,hbs,yml}'],
                tasks: ['assemble', 'htmlmin']
            },
            css: {
                files: ['<%= dir.src %>/css/**/*.{css,less}'],
                tasks: ['webpack']
            },
            js: {
                files: ['<%= dir.src %>/js/**/*.js'],
                tasks: ['webpack']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= dir.dist %>/*.html',
                    '<%= dir.dist %>/styles/**/*.css',
                    '<%= dir.dist %>/js/**/*.js',
                    '<%= dir.dist %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        webpack: {
            dist: webpackConfig
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

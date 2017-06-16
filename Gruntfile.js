'use strict';

module.exports = function(grunt) {
    const config = require('./config/grunt.config.js'),
          webpackConfig = require('./config/webpack.config.js'),
          mozjpeg = require('imagemin-mozjpeg');

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        dir: config.directories,

        assemble: {
            pages: {
                options: {
                    flatten: true,
                    layout: '<%= dir.assemble %>/layouts/default.hbs',
                    data: '<%= dir.assemble %>/data/*.{json,yml}',
                    partials: '<%= dir.assemble %>/partials/*.hbs',
                    helpers: '<%= dir.assemble %>/helpers/*.js'
                },
                files: {
                    '<%= dir.tmp %>/': ['<%= dir.assemble %>/pages/*.hbs']
                }
            }
        },

        clean: ['<%= dir.dist %>/**/*'],

        uglify: {
            options: {
                compress: true,
                mangle: true
            },
            target: {
                src: ['<%= dir.src %>/js/vendor/modernizr.min.js',
                    '<%= dir.src %>/bower_components/outdated-browser/outdatedbrowser/outdatedbrowser.min.js'],
                dest: '<%= dir.dist %>/js/vendor.min.js'
            }
        },

        connect: {
            options: config.connect,
            livereload: {
                options: {
                    base: '<%= dir.dist %>'
                }
            }
        },

        copy: {
            img: {
                expand: true,
                cwd: '<%= dir.src %>/img/',
                src: '**',
                dest: '<%= dir.dist %>/img/'
            },
            page: {
                expand: true,
                cwd: '<%= dir.src %>/page',
                src: '**',
                dest: '<%= dir.dist %>/'
            },
            web: {
                expand: true,
                cwd: '<%= dir.src %>/webcomponent',
                src: '**',
                dest: '<%= dir.dist %>/webcomponent/'
            }
        },

        htmlmin: {
            dist: {
                options: config.htmlmin,
                files: [{
                    expand: true,
                    cwd: '<%= dir.tmp %>',
                    src: '*.html',
                    dest: '<%= dir.dist %>'
                }]
            }
        },

        lesshint: {
            dist: {
                options: {
                    lesshintrc: true
                },
                src: ['<%= dir.src %>/**/*.less', '!<%= dir.src %>/bower_components/**/*.less']
            },
        },

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
                files: ['<%= dir.src %>/js/**/*.js', '<%= dir.src %>/bower_components/**/*.js'],
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
                    suffix: 'medium'
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
                        scaleToFit: [420, 420],
                        quality: 70
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
                        scaleToFit: [420, 420],
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
                    use: [mozjpeg()]
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

'use strict';

module.exports = function(grunt) {
    const config = require('./config/grunt.config.js'),
          webpackConfig = require('./config/webpack.config.js');

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('assemble-less');

    grunt.initConfig({

        dir: config.directories,

        assemble: {
            pages: {
                options: {
                    flatten: true,
                    layout: '<%= dir.assemble %>/layouts/default.hbs',
                    data: '<%= dir.assemble %>/data/*.{json,yml}',
                    partials: '<%= dir.assemble %>/partials/*.hbs'
                },
                files: {
                    '<%= dir.tmp %>/': ['<%= dir.assemble %>/pages/*.hbs']
                }
            }
        },

        clean: ['<%= dir.dist %>/**/*'],

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= dir.src %>/js/vendor/modernizr.min.js',
                      '<%= dir.src %>/bower_components/outdated-browser/outdatedbrowser/outdatedbrowser.min.js'],
                dest: '<%= dir.dist %>/js/vendor.min.js'
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
                    open: false,
                    base: [
                        '<%= dir.dist %>'
                    ]
                }
            }
        },

        copy: {
            assets: {
                expand: true,
                cwd: '<%= dir.src %>/assets/',
                src: '**',
                dest: '<%= dir.dist %>/assets/'
            },
            files: {
                expand: true,
                cwd: '<%= dir.src %>/files/',
                src: '**',
                dest: '<%= dir.dist %>/files/'
            },
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

        less: {
            dist: {
                options: {
                    paths: ['<%= dir.src %>/css']
                },
                files: {
                    '<%= dir.dist %>/assets/main.css': '<%= dir.src %>/css/main.less'
                }
            }
        },

        modernizr: {
            dist: {
                "crawl": false,
                "parseFiles": true,
                "customTests": [],
                "dest": '<%= dir.src %>/js/vendor/modernizr.min.js',
                "tests": [
                    "cssanimations",
                    "objectfit"
                ],
                "options": [
                    "prefixes",
                    "prefixed",
                    "setClasses"
                ],
                "uglify": true
            }
        },

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

        watch: {
            assemble: {
                files: ['<%= dir.assemble %>/{,*/}*.{md,hbs,yml}'],
                tasks: ['assemble', 'htmlmin']
            },
            less: {
                files: ['<%= dir.src %>/css/**/*.{css,less}'],
                tasks: ['less', 'postcss']
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
                    '<%= dir.dist %>/assets/**/*.css',
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
            jpg: {
                options: config.imagemin,
                files: [
                    {
                        expand: true,
                        cwd: '<%= dir.src %>/img',
                        src: ['**/*.jpg'],
                        dest: '<%= dir.src %>/img',
                        ext: '.jpg',
                        extDot: 'last'
                    }
                ]
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
        'less',
        'postcss',
        'concat',
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
        'connect:livereload',
        'watch'
    ]);
};

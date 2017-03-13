'use strict';

module.exports = function(grunt) {
    const config = require('./config/grunt.config.json'),
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
                    assets: '<%= dir.dist %>/assets',
                    layout: '<%= dir.assemble %>/layouts/default.hbs',
                    data: '<%= dir.assemble %>/data/*.{json,yml}',
                    partials: '<%= dir.assemble %>/partials/*.hbs'
                },
                files: {
                    '<%= dir.dist %>/': ['<%= dir.assemble %>/pages/*.hbs']
                }
            }
        },

        clean: ['<%= dir.dist %>/**/*'],

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
            vendor: {
                expand: true,
                cwd: '<%= dir.src %>/js/vendor',
                src: '**',
                dest: '<%= dir.dist %>/js/vendor/'
            },
            web: {
                expand: true,
                cwd: '<%= dir.src %>/webcomponent',
                src: '**',
                dest: '<%= dir.dist %>/webcomponent/'
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
                "dest": '<%= dir.dist %>/js/vendor/modernizr.min.js',
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
                tasks: ['assemble']
            },
            less: {
                files: ['<%= dir.src %>/css/**/*.{css,less}'],
                tasks: ['less', 'postcss']
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
                    suffix: 'medium',
                    actions: {
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
                options: {
                    progressive: true
                },
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
            options: {
                pkgFiles: ['package.json'],
                commitMessage: 'Release %s',
                tagName: '%s',
                tagAnnotation: 'Release %s',
                buildCommand: false
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'copy',
        'less',
        'modernizr',
        'postcss',
        'webpack',
        'assemble'
    ]);

    grunt.registerTask('prepare', [
        'jimp',
        'imagemin'
    ]);

    grunt.registerTask('serve', [
        'default',
        'connect:livereload',
        'watch'
    ]);
};

/* global module, require */
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= dir.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= dir.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {
    const config = require('./config.json');

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-release-it');
    grunt.loadNpmTasks('grunt-jimp');

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

        browserify: {
            main: {
                src: '<%= dir.src %>/js/main.js',
                dest: '<%= dir.dist %>/js/main.bundled.js'
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
            page: {
                expand: true,
                cwd: 'src/page',
                src: '**',
                dest: '<%= dir.dist %>/'
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

        uglify: {
            dist: {
                files: {
                    '<%= dir.dist %>/js/main.bundled.js': ['<%= dir.dist %>/js/main.bundled.js']
                }
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
                tasks: ['postjs']
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

    grunt.registerTask('prepare', [
        'jimp',
        'imagemin'
    ]);

    grunt.registerTask('postjs', [
        'browserify',
        'uglify'
    ]);

    grunt.registerTask('serve', [
        'build',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'less',
        'modernizr',
        'postcss',
        'postjs',
        'assemble'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};

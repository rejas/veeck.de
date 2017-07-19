'use strict';

/**
 * CONFIGS
 */

import config       from    './config/grunt.config.js';

/**
 * GULP PLUGINS
 */

import gulp         from    'gulp';
import gplugins     from    'gulp-load-plugins';
import assemble     from    'assemble';

/**
 * CONSTANTS
 */

const   dirs        = config.directories,
        plugins     = gplugins(),
        app         = assemble();

/**
 * SUB TASKS
 */

// Clear the destination folder
gulp.task('clean', (cb) => {
    del([dirs.dist]).then(function () { cb(); });
});

/**
 * ASSEMBLE
 */

gulp.task('load', function(cb) {
    app.partials(`${dirs.assemble}/partials/**/*.hbs`);
    app.layouts(`${dirs.assemble}/layouts/**/*.hbs`);
    app.pages(`${dirs.assemble}/pages/**/*.hbs`);
    app.data(['./src/assemble/data/*.{json,yml}']);
    app.option('layout', 'default');

    app.preLayout( /./, function ( view, next ) {
        // if the layout is not defined, use the default one ...
        if (!view.layout && app.options.layout) {
            view.layout = app.options.layout;
        }
        next();
    } );
    cb();
});

gulp.task('assemble', ['load'], function() {

    app.helper('md', require('helper-md'));

    return app.toStream('pages')
        .pipe(app.renderFile())
        .pipe(plugins.extname())
        .pipe(app.dest(dirs.dist));
});


/**
 * MAIN TASKS
 */

gulp.task('check',      ['check:html', 'check:js', 'check:less']);

gulp.task('default',    ['assemble']);


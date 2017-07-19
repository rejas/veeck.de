'use strict';

/**
 * CONFIGS
 */

import config           from    './config/grunt.config.js';
import webpackConfig    from    './config/webpack.config.js';

/**
 * GULP PLUGINS
 */

import gulp         from    'gulp';
import gplugins     from    'gulp-load-plugins';
import assemble     from    'assemble';

/**
 * OTHER PLUGINS
 */

import del          from    'del';
import runSequence  from    'run-sequence';
import webpack      from    'webpack-stream';

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

gulp.task('webpack', () => {
    return gulp.src('./src/js/main.js')
        .pipe(webpack( webpackConfig, require('webpack')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('load', (cb) => {
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

gulp.task('assemble', ['load'], () => {

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

gulp.task('default',    (cb) => { runSequence('clean', 'webpack', 'assemble', cb) });

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
import eslintformat from    'eslint-friendly-formatter';
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

//
gulp.task('vendorscripts', () => {
    // Minify and copy all vendor scripts
    gulp.src([`${dirs.src}/js/vendor/**/*.js`])
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(`${dirs.dist}/js`));
});

/**
 * CHECK TASKS
 */

// Detect errors and potential problems in your html code
gulp.task('check:html', () => {
    gulp.src([`${dirs.src}/*.html`])
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
});

// Detect errors and potential problems in your JavaScript code (except vendor scripts)
// You can enable or disable default eslint options in the .eslintrc file
gulp.task('check:js', () => {
    gulp.src([`${dirs.src}/js/**/*.js`, `!${dirs.src}/js/vendor/**/*.js`])
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format(eslintformat))
});

// Detect errors and potential problems in your css code
gulp.task('check:less', () => {
    gulp.src([`${dirs.src}/css/**/*.less`, `!${dirs.src}/css/main.less`, `!${dirs.src}/css/libs`])
        .pipe(plugins.lesshint())
        .pipe(plugins.lesshint.reporter())
});

/**
 * ASSEMBLE
 */

gulp.task('webpack', () => {
    return gulp.src(`${dirs.src}/src/js/main.js`)
        .pipe(webpack( webpackConfig, require('webpack')))
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('load', (cb) => {
    app.partials(`${dirs.assemble}/partials/**/*.hbs`);
    app.layouts(`${dirs.assemble}/layouts/**/*.hbs`);
    app.pages(`${dirs.assemble}/pages/**/*.hbs`);
    app.data([`${dirs.assemble}/data/*.json`, `!${dirs.assemble}/data/*.yml`]);
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

gulp.task('assemble', ['load', 'vendorscripts'], () => {
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

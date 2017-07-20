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
import gutil        from    'gulp-util';
import gplugins     from    'gulp-load-plugins';
import assemble     from    'assemble';

/**
 * OTHER PLUGINS
 */

import del          from    'del';
import eslintformat from    'eslint-friendly-formatter';
import ftp          from    'vinyl-ftp';
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
 * Copy TASKS
 */

// Copy all page files (including webcomponents) into the `dist` folder
gulp.task('copy:files', () => {
    gulp.src([`${dirs.src}/page/**/*`, `!${dirs.src}/**/.DS_Store`], { dot: true })
        .pipe(gulp.dest(dirs.dist));
});

// Copy all image into the `dist` folder
gulp.task('copy:images', () => {
    gulp.src(`${dirs.src}/img/**/*.jpg`)
        .pipe(gulp.dest(`${dirs.dist}/img`));
});

// Create vendorscripts (maybe move to webpack too later)
gulp.task('copy:vendorscripts', () => {
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
 * DEPLOY TASKS
 */

gulp.task('upload', () => {
    gulp.src('.')
        .pipe(plugins.prompt.prompt({
            type: 'password',
            name: 'pw',
            message: 'enter ftp password'
        }, function(result) {
            const conn = ftp.create({
                host:       config.ftp.host,
                user:       config.ftp.user,
                password:   result.pw,
                log:        gutil.log
            });

            gulp.src([`${dirs.dist}/**/*`,
                `!${dirs.dist}/files/**/*`, `!${dirs.dist}/img/**/*`, `!${dirs.dist}/components`], {
                base: 'dist', buffer: false })
                .pipe(conn.newer('/')) // only upload newer files
                .pipe(conn.dest('/'));
        }));
});

gulp.task('upload:images', () => {
    gulp.src('.')
        .pipe(plugins.prompt.prompt({
            type: 'password',
            name: 'pw',
            message: 'enter ftp password'
        }, (result) => {
            const conn = ftp.create({
                host:       config.ftp.host,
                user:       config.ftp.user,
                password:   result.pw,
                log:        gutil.log
            });

            gulp.src([`${dirs.dist}/img/**/*`], { base: 'dist', buffer: false } )
                .pipe(conn.newer('/')) // only upload newer files
                .pipe(conn.dest('/'));
        }));
});

gulp.task('upload:files', () => {
    gulp.src('.')
        .pipe(plugins.prompt.prompt({
            type: 'password',
            name: 'pw',
            message: 'enter ftp password'
        }, (result) => {
            const conn = ftp.create({
                host:       config.ftp.host,
                user:       config.ftp.user,
                password:   result.pw,
                log:        gutil.log
            });

            gulp.src([`${dirs.dist}/files/**/*`], { base: 'dist', buffer: false } )
                .pipe(conn.newer('/')) // only upload newer files
                .pipe(conn.dest('/'));
        }));
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

gulp.task('copy',       ['copy:files', 'copy:images', 'copy:vendorscripts']);

gulp.task('default',    (cb) => { runSequence('clean', 'copy',  'webpack', 'assemble', cb) });

gulp.task('deploy',     ['upload']);

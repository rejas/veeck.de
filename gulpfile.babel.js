'use strict';

/**
 * CONFIGS
 */

import config from './config.json';

/**
 * GULP PLUGINS
 */

import gulp from 'gulp';
import gutil from 'gulp-util';
import gplugins from 'gulp-load-plugins';

/**
 * OTHER PLUGINS
 */

import del from 'del';

import browserify   from    'browserify';
import buffer       from    'vinyl-buffer';
import express      from    'express';
import eslintformat from    'eslint-friendly-formatter';
import ftp          from    'vinyl-ftp';
import livereload   from    'connect-livereload';
import refresh      from    'gulp-livereload';
import runSequence  from    'run-sequence';
import source       from    'vinyl-source-stream';
import spritesmith  from    'gulp.spritesmith';
import tinylr       from    'tiny-lr';

/**
 * CONSTANTS
 */

const   dirs        = config.directories,
        plugins     = gplugins(),
        lrserver     = tinylr();

/**
 * SUB TASKS
 */

// Clear the destination folder
gulp.task('clean', (cb) => {
    del([dirs.dist]).then(function () { cb(); });
});

// Browserify task
gulp.task('browserify', () => {
    browserify({ entries: [`${dirs.src}/js/main.js`] })
        .bundle()
        .pipe(source('main.bundled.js'))
        .pipe(buffer())
        .pipe(plugins.uglify())
        //.pipe(plugins.rev())
        .pipe(gulp.dest(`${dirs.dist}/js`));
});

//
gulp.task('vendorscripts', () => {
    // Minify and copy all vendor scripts
    gulp.src([`${dirs.src}/js/vendor/**/*.js`, `${dirs.src}/components/outdated-browser/outdatedbrowser/outdatedbrowser.min.js`])
        .pipe(plugins.uglify())
        .pipe(gulp.dest(`${dirs.dist}/js/vendor`));
});

// Copy all application files except *.less and .js into the `dist` folder
gulp.task('files', () => {
    gulp.src([`${dirs.src}/**/*`, `!${dirs.src}/*.html`, `!${dirs.src}/js/**/*.js`, `!${dirs.src}/css/**/*.less`,
             `!${dirs.src}/components/**/*`, `!${dirs.src}/**/.DS_Store`], { dot: true })
        .pipe(gulp.dest(dirs.dist));
});

// Compile LESS files
gulp.task('css', () => {
    gulp.src(`${dirs.src}/css/main.less`)
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.rename('main.css'))
        .pipe(plugins.csso())
        //.pipe(plugins.rev())
        .pipe(gulp.dest(`${dirs.dist}/css`))
});

//
gulp.task('images', () => {
    gulp.src(`${dirs.src}/img/**/*.jpg`)
        .pipe(gulp.dest(`${dirs.dist}/img`));
});

//
gulp.task('markup', () => {
    // Get our index.html
    gulp.src(`${dirs.src}/*.html`)
        // And put it in the dist folder
        .pipe(gulp.dest(dirs.dist))
        .pipe(refresh(lrserver)); // Tell the lrserver to refresh
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
 * DEV TASKS
 */

gulp.task('serve', ['images', 'files', 'vendorscripts', 'browserify', 'css', 'markup'], () => {
    // Set up an express server (but not starting it yet)
    let server = express();
    // Add live reload
    server.use(livereload({port: config.ports.livereload}));
    // Use our 'dist' folder as rootfolder
    server.use(express.static('./' + dirs.dist));

    // Start webserver
    server.listen(config.ports.express);
    // Start live reload
    lrserver.listen(config.ports.livereload);

    gulp.watch([`${dirs.src}/components/*.js`, `${dirs.src}/js/**/*.js`],[
        'browserify'
    ]);
    gulp.watch([`${dirs.src}/css/**/*.less`], [
        'css'
    ]);
    gulp.watch([`${dirs.src}/*.html`], [
        'markup'
    ]);
});

/**
 * Default
 */

gulp.task('html', ['prepare:sprites', 'images', 'files', 'vendorscripts', 'browserify', 'css'], () => {
    // We src all html files
    gulp.src(`${dirs.src}/*.html`)
        .pipe(plugins.htmlmin(config.htmlmin))
        .pipe(gulp.dest(dirs.dist));
});

/**
 * Deploy
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
 * PREPARE TASKS
 */

//
gulp.task('prepare:images', () => {
    gulp.src(`${dirs.src}/img/**/*`)
        .pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest(`${dirs.src}/img`));
});

//
gulp.task('prepare:sprites', () => {
    let spriteData = gulp.src([`${dirs.src}/css/assets/icons/links/*.png`, `${dirs.src}/css/assets/icons/research/*.png`])
        .pipe(spritesmith({
                imgName:         'sprite.png',
                cssName:         'sprite.less',
                imgPath:         'assets/sprite.png'
            })
        );

    // Pipe image stream through image optimizer and onto disk
    spriteData.img
        //.pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest(`${dirs.src}/css/assets/`));

    // Pipe CSS stream through CSS optimizer and onto disk
    spriteData.css
        .pipe(gulp.dest(`${dirs.src}/css/base/`));
});

//
gulp.task('prepare:sitemap', ['html'], () => {
    gulp.src([`${dirs.src}/*.html`, `!${dirs.src}/google*.html`], {read: false})
        .pipe(plugins.sitemap(config.sitemap))
        .pipe(gulp.dest(dirs.src));
});

/**
 * MAIN TASKS
 */

gulp.task('check',      ['check:html', 'check:js', 'check:less']);

gulp.task('dev',        ['serve']);

gulp.task('default',    (cb) => { runSequence('clean', 'html', cb) });

gulp.task('deploy',     ['upload']);

gulp.task('prepare',    ['prepare:sprites', 'prepare:images', 'prepare:sitemap']);

'use strict';

/**
 * CONFIGS
 */

import config       from    './config.json';

/**
 * GULP PLUGINS
 */

import gulp         from    'gulp';
import gutil        from    'gulp-util';
import gplugins     from    'gulp-load-plugins';

/**
 * OTHER PLUGINS
 */

import autoprefixer from    'autoprefixer';
import browserify   from    'browserify';
import buffer       from    'vinyl-buffer';
import cssmqpacker  from    'css-mqpacker';
import cssnano      from    'cssnano';
import del          from    'del';
import express      from    'express';
import eslintformat from    'eslint-friendly-formatter';
import ftp          from    'vinyl-ftp';
import livereload   from    'connect-livereload';
import refresh      from    'gulp-livereload';
import revReplace   from    'gulp-rev-replace';
import runSequence  from    'run-sequence';
import source       from    'vinyl-source-stream';
import spritesmith  from    'gulp.spritesmith';
import tinylr       from    'tiny-lr';

/**
 * CONSTANTS
 */

const   dirs        = config.directories,
        plugins     = gplugins(),
        lrserver    = tinylr(),
        processors  = [
            autoprefixer(config.autoprefixer),
            cssmqpacker(),
            cssnano()
        ];

/**
 * SUB TASKS
 */

// Copy all application files except *.less and .js into the `dist` folder
gulp.task('files', () => {
    gulp.src([`${dirs.src}/**/*`, `!${dirs.src}/*.html`, `!${dirs.src}/js/**/*.js`, `!${dirs.src}/css/**/*.less`,
             `!${dirs.src}/components/**/*`, `!${dirs.src}/**/.DS_Store`], { dot: true })
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('images', () => {
    gulp.src(`${dirs.src}/img/**/*.jpg`)
        .pipe(gulp.dest(`${dirs.dist}/img`));
});

/**
 * DEV TASKS
 */

//
gulp.task('markup', ['prepare:images', 'images', 'files', 'vendorscripts', 'browserify', 'css'], () => {
    var manifest = gulp.src(`./rev-manifest.json`);

    // Get our index.html
    gulp.src(`${dirs.src}/*.html`)
    // And put it in the dist folder
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(dirs.dist))
        .pipe(refresh(lrserver)); // Tell the lrserver to refresh
});

gulp.task('serve', ['markup'], () => {
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

gulp.task('html', ['images', 'files', 'vendorscripts', 'browserify', 'css'], () => {
    var manifest = gulp.src(`./rev-manifest.json`);

    // We src all html files
    gulp.src(`${dirs.src}/*.html`)
        .pipe(revReplace({manifest: manifest}))
        .pipe(plugins.htmlmin(config.htmlmin))
        .pipe(gulp.dest(dirs.dist));
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

gulp.task('dev',        ['serve']);

gulp.task('default',    (cb) => { runSequence('clean', 'prepare', 'html', cb) });

gulp.task('prepare',    ['prepare:sprites', 'prepare:images', 'prepare:sitemap']);

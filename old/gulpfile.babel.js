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

/**
 * PREPARE TASKS
 */

//
gulp.task('prepare:images', () => {
    gulp.src(`${dirs.src}/img/**/*`)
        .pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest(`${dirs.src}/img`));
});

/**
 * MAIN TASKS
 */

gulp.task('dev',        ['serve']);

gulp.task('default',    (cb) => { runSequence('clean', 'prepare', 'html', cb) });

gulp.task('prepare',    ['prepare:sprites', 'prepare:images', 'prepare:sitemap']);

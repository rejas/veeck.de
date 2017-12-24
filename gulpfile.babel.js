'use strict';

/**
 * CONFIGS
 */

import config               from './config/gulp.config.js';
import webpackDevConfig     from './config/webpack.dev.config.js';
import webpackProdConfig    from './config/webpack.prod.config.js';

/**
 * GULP PLUGINS
 */

import gulp             from    'gulp';
import gutil            from    'gulp-util';
import gplugins         from    'gulp-load-plugins';
import grelease         from    'gulp-release-it';
import gcachebust       from    'gulp-cache-bust';
import assemble         from    'assemble';
import assemblevars     from    'assemble-middleware-page-variable';

/**
 * OTHER PLUGINS
 */

import del              from    'del';
import eslintformat     from    'eslint-friendly-formatter';
import ftp              from    'vinyl-ftp';
import imageminMozjpeg  from    'imagemin-mozjpeg';
import runSequence      from    'run-sequence';
import webpack          from    'webpack-stream';

/**
 * CONSTANTS
 */

const dirs      = config.directories,
    plugins     = gplugins(),
    app         = assemble();

/**
 * COPY TASKS
 */

// Copy all page files (including webcomponents) into the `dist` folder
gulp.task('copy:files', () => {
    return gulp.src([`${dirs.src}/page/**/*`, `!${dirs.src}/**/.DS_Store`], { dot: true })
        .pipe(gulp.dest(dirs.dist));
});

// Copy all image into the `dist` folder
gulp.task('copy:images', () => {
    return gulp.src([`${dirs.src}/img/**/*.jpg`,`${dirs.src}/img/**/*.png`])
        .pipe(gulp.dest(`${dirs.dist}/img`));
});

// Create and copy vendorscripts (maybe move to webpack too later)
gulp.task('copy:vendorscripts', () => {
    // Minify and copy all vendor scripts
    return gulp.src([`${dirs.src}/js/vendor/**/*.js`])
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(`${dirs.dist}/js`));
});

/**
 * CHECK TASKS
 */

// Detect errors and potential problems in your html code
gulp.task('check:html', ['assemble'], () => {
    return gulp.src([`${dirs.dist}/*.html`])
        .pipe(plugins.htmlhint({
            htmlhintrc: `${dirs.config}/.htmlhintrc.json`
        }))
        .pipe(plugins.htmlhint.reporter())
        .pipe(plugins.htmlhint.failOnError());
});

// Detect errors and potential problems in your JavaScript code (except vendor scripts)
// You can enable or disable default eslint options in the .eslintrc file
gulp.task('check:js', () => {
    return gulp.src([`${dirs.src}/js/**/*.js`, `!${dirs.src}/js/vendor/**/*.js`])
        .pipe(plugins.eslint({
            configFile: `${dirs.config}/.eslintrc.json`
        }))
        .pipe(plugins.eslint.format(eslintformat))
        .pipe(plugins.eslint.failOnError());
});

// Detect errors and potential problems in your css code
gulp.task('check:less', () => {
    return gulp.src([`${dirs.src}/css/**/*.less`])
        .pipe(plugins.lesshint({
            configPath: `${dirs.config}/.lesshintrc.json`
        }))
        .pipe(plugins.lesshint.reporter())
        .pipe(plugins.lesshint.failOnError());
});

/**
 * DEPLOY TASKS
 */

gulp.task('upload:page', ['default'], () => {
    return gulp.src('.')
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
                `!${dirs.dist}/files/**/*`, `!${dirs.dist}/img/**/*`, `!${dirs.dist}/**/*.map`], {
                base: 'dist', buffer: false, dot: true})
                .pipe(conn.newer('/')) // only upload newer files
                .pipe(conn.dest('/veeck'));
        }));
});

gulp.task('upload:images', () => {
    return gulp.src('.')
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
                .pipe(conn.differentSize('/')) // filter for different file size
                .pipe(conn.dest('/veeck'));
        }));
});

gulp.task('upload:files', () => {
    return gulp.src('.')
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
                .pipe(conn.dest('/veeck'));
        }));
});

/**
 * PREPARE TASKS
 */

gulp.task('prepare:favicons', function () {
    return gulp.src('org/favicon.png').pipe(plugins.favicons({
        appName: 'My Homepage',
        appDescription: 'This is my homepage',
        developerName: 'Veeck',
        developerURL: 'https://www.veeck.de/',
        background: '#FFFFFF',
        path: '/favicons',
        url: 'https://www.veeck.de/',
        display: 'standalone',
        orientation: 'portrait',
        logging: false,
        theme_color: '#E6E6E6',
        online: false,
        html: '../../../src/assemble/partials/html/icons.html',
        pipeHTML: true,
        replace: true
    }))
        .pipe(gulp.dest('./src/page/favicons'));
});

gulp.task('prepare:images', () => {
    return gulp.src(`${dirs.src}/img/**/*.jpg`)
        .pipe(plugins.imagemin({
            use: [imageminMozjpeg()]
        }))
        .pipe(gulp.dest(`${dirs.src}/img`));
});

gulp.task('prepare:sitemap', ['assemble'], () => {
    return gulp.src([`${dirs.dist}/*.html`, `!${dirs.dist}/google*.html`], { read: false })
        .pipe(plugins.sitemap(config.sitemap))
        .pipe(gulp.dest(`${dirs.src}/page`));
});

gulp.task('prepare:modernizr', () => {
    return gulp.src([`${dirs.src}/js/**/*.js`, `${dirs.node}/multilevelmenu/js/main.js`, `!${dirs.src}/js/vendor/**/*.js`])
        .pipe(plugins.modernizr('modernizr.min.js', {
            'options': config.modernizr
        }))
        .pipe(gulp.dest(`${dirs.src}/js/vendor/`));
});

gulp.task('scale:max', () => {
    return gulp.src(`${dirs.org}/img/backgrounds/**/*`)
        .pipe(plugins.jimp({
            '': {
                scaleToFit: { width: 1920, height: 1920 },
                quality: 60
            }
        }))
        .pipe(gulp.dest(`${dirs.src}/img/backgrounds`));
});

gulp.task('scale:medium', () => {
    return gulp.src(`${dirs.org}/img/travel/europe/**/*`)
        .pipe(plugins.jimp({
            '.medium': {
                scaleToFit: { width: 1920, height: 1920 },
                quality: 60
            }
        }))
        .pipe(gulp.dest(`${dirs.src}/img/travel/europe`));
});

gulp.task('scale:small', () => {
    return gulp.src(`${dirs.org}/img/travel/europe/**/*`)
        .pipe(plugins.jimp({
            '.small': {
                scaleToFit: { width: 448, height: 387 },
                quality: 60
            }
        }))
        .pipe(gulp.dest(`${dirs.src}/img/travel/europe`));
});

gulp.task('scale:placeholder', ['scale:small'], () => {
    return gulp.src(`${dirs.src}/img/travel/europe/**/*.small.jpg`)
        .pipe(plugins.jimp({
            '.placeholder': {
                scaleToFit: { width: 448, height: 387 },
                blur: 40,
                quality: 30
            }
        }))
        .pipe(gulp.dest(`${dirs.src}/img/travel/europe`));
});

/**
 * HTML TASKS
 */

gulp.task('clean', (cb) => {
    del([dirs.dist, dirs.tmp]).then(function () { cb(); });
});

gulp.task('webpack:dev', () => {
    return gulp.src(`${dirs.src}/src/js/main.js`)
        .pipe(webpack(webpackDevConfig, require('webpack')))
        .pipe(gulp.dest(dirs.dist))
        .pipe(plugins.connect.reload());
});

gulp.task('webpack:prod', () => {
    return gulp.src(`${dirs.src}/src/js/main.js`)
        .pipe(webpack(webpackProdConfig, require('webpack')))
        .pipe(gulp.dest(dirs.dist));
});

app.onLoad(/\.(md|hbs)$/, assemblevars(app));

gulp.task('load', (cb) => {
    app.partials([`${dirs.assemble}/partials/**/*.hbs`, `${dirs.assemble}/partials/**/html/*.html`]);
    app.layouts(`${dirs.assemble}/layouts/**/*.hbs`);
    app.pages(`${dirs.assemble}/pages/**/*.hbs`);
    app.data([`${dirs.assemble}/data/*.json`, `!${dirs.assemble}/data/*.yml`]);
    app.option('layout', 'default');

    app.preLayout( /./, function (view, next) {
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
        .pipe(plugins.flatten())
        .pipe(app.renderFile())
        .pipe(plugins.extname())
        .pipe(app.dest(dirs.dist))
        .pipe(plugins.connect.reload());
});

gulp.task('html', ['assemble'], () => {
    return gulp.src(`${dirs.dist}/*.html`)
        .pipe(plugins.inject(gulp.src([`${dirs.dist}/js/bundle.js`, `${dirs.dist}/css/*.css`], {read: false}), {
            quiet: true,
            relative: true
        }))
        .pipe(gcachebust({
            type: 'timestamp'
        }))
        .pipe(plugins.htmlmin(config.htmlmin))
        .pipe(gulp.dest(dirs.dist));
});

/**
 * SERVE TASKS
 */

gulp.task('connect', () => {
    plugins.connect.server({
        root: 'dist',
        livereload: true,
        port: 9000
    });
});

gulp.task('watch', ['connect'], () => {
    gulp.watch([`${dirs.src}/js/**/*.js`, `${dirs.src}/css/**/*.less`], [
        'webpack:dev'
    ]);
    gulp.watch([`${dirs.assemble}/**/*.hbs`], [
        'assemble'
    ]);
});

/**
 * MAIN TASKS
 */

gulp.task('check',      ['check:html', 'check:js', 'check:less']);

gulp.task('copy',       ['copy:files', 'copy:images', 'copy:vendorscripts']);

gulp.task('default',    (cb) => { runSequence('clean', 'copy', 'webpack:prod', 'html', cb); });

gulp.task('dev',        (cb) => { runSequence('clean', 'copy', 'webpack:dev', 'html', 'watch', cb); });

gulp.task('prepare',    ['check', 'prepare:favicons', 'prepare:images', 'prepare:modernizr', 'prepare:sitemap']);

gulp.task('scale',      ['scale:medium', 'scale:small', 'scale:placeholder']);

gulp.task('upload',     ['upload:page']);

grelease(gulp);

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
import gcachebust       from    'gulp-cache-bust';
import gconnect         from    'gulp-connect';
import gplugins         from    'gulp-load-plugins';
import {release}        from    'gulp-release-it';

/**
 * OTHER PLUGINS
 */

import assemble         from    'assemble';
import assemblevars     from    'assemble-middleware-page-variable';
import del              from    'del';
import eslintformat     from    'eslint-friendly-formatter';
import flog             from    'fancy-log';
import ftp              from    'vinyl-ftp';
import helper_md        from    'helper-md';
import imageminMozjpeg  from    'imagemin-mozjpeg';
import webpack          from    'webpack';
import webpackStream    from    'webpack-stream';

/**
 * CONSTANTS
 */

const dirs      = config.directories,
    plugins     = gplugins(),
    app         = assemble();

/**
 * ASSEMBLE TASKS
 */

app.onLoad(/\.(md|hbs)$/, assemblevars(app));

gulp.task('load', (cb) => {
    app.partials([`${dirs.assemble}/partials/**/*.hbs`,
        `${dirs.node}/feather-icons/dist/icons/*.svg`,
        `${dirs.src}/css/assets/svg/*.svg`,
        `${dirs.assemble}/partials/**/html/*.html`]);
    app.layouts(`${dirs.assemble}/layouts/**/*.hbs`);
    app.pages(`${dirs.assemble}/pages/**/*.hbs`);
    app.data([`${dirs.assemble}/data/*.json`, `!${dirs.assemble}/data/*.yml`]);
    app.option('layout', 'default');

    app.preLayout(/./, (view, next) => {
        // if the layout is not defined, use the default one ...
        if (!view.layout && app.options.layout) {
            view.layout = app.options.layout;
        }
        next();
    });

    cb();
});

gulp.task('assemble', gulp.series('load', () => {
    app.helper('md', helper_md);

    return app.toStream('pages')
        .pipe(plugins.flatten())
        .pipe(app.renderFile())
        .pipe(plugins.extname())
        .pipe(app.dest(dirs.dist))
        .pipe(gconnect.reload());
}));

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
gulp.task('check:html', gulp.series('assemble', () => {
    return gulp.src([`${dirs.dist}/*.html`])
        .pipe(plugins.htmllint({
            failOnError: true,
            config: `${dirs.config}/.htmllintrc.json`
        }));
}));

// Detect errors and potential problems in your JavaScript code (except vendor scripts)
gulp.task('check:js', () => {
    return gulp.src(['./gulpfile.babel.js', './config/*.config.js',
        `${dirs.src}/js/**/*.js`, `!${dirs.src}/js/vendor/**/*.js`])
        .pipe(plugins.eslint({
            configFile: `${dirs.config}/.eslintrc.json`
        }))
        .pipe(plugins.eslint.format(eslintformat))
        .pipe(plugins.eslint.failOnError());
});

// Detect errors and potential problems in your CSS code
gulp.task('check:less', () => {
    return gulp.src([`${dirs.src}/css/**/*.less`])
        .pipe(plugins.lesshint({
            configPath: `${dirs.config}/.lesshintrc.json`
        }))
        .pipe(plugins.lesshint.reporter())
        .pipe(plugins.lesshint.failOnError());
});

// Check the performance budget
gulp.task('check:louis', (cb) => {
    return plugins.louis({
        performanceBudget: {
            domComplete: 3000,
            requests: 10
        }
    });
});


/**
 * DEPLOY TASKS
 */

gulp.task('upload:page', () => {
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
                log:        flog
            });

            gulp.src([`${dirs.dist}/**/*`, `!${dirs.dist}/files/**/*`, `!${dirs.dist}/img/**/*`, `!${dirs.dist}/**/*.map`],
                { base: 'dist', buffer: false, dot: true })
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
                log:        flog
            });

            gulp.src([`${dirs.dist}/img/**/*`],
                { base: 'dist', buffer: false } )
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
                log:        flog
            });

            gulp.src([`${dirs.dist}/files/**/*`],
                { base: 'dist', buffer: false } )
                .pipe(conn.newer('/')) // only upload newer files
                .pipe(conn.dest('/veeck'));
        }));
});

/**
 * PREPARE TASKS
 */

gulp.task('prepare:favicons', () => {
    return gulp.src('org/favicon.png')
        .pipe(plugins.favicons(
            config.favicons
        ))
        .pipe(gulp.dest(`${dirs.src}/page/favicons`));
});

gulp.task('prepare:images', () => {
    return gulp.src(`${dirs.src}/img/**/*.jpg`)
        .pipe(plugins.imagemin({
            use: [imageminMozjpeg()]
        }))
        .pipe(gulp.dest(`${dirs.src}/img`));
});

gulp.task('prepare:modernizr', () => {
    return gulp.src([`${dirs.src}/js/**/*.js`, `${dirs.node}/multilevelmenu/src/multilevelmenu.js`, `!${dirs.src}/js/vendor/**/*.js`])
        .pipe(plugins.modernizr('modernizr.min.js', config.modernizr))
        .pipe(gulp.dest(`${dirs.src}/js/vendor`));
});

gulp.task('prepare:sitemap', gulp.series('assemble', () => {
    return gulp.src([`${dirs.dist}/*.html`, `!${dirs.dist}/google*.html`], { read: false })
        .pipe(plugins.sitemap(config.sitemap))
        .pipe(gulp.dest(`${dirs.src}/page`));
}));

gulp.task('scale:images', () => {
    return gulp.src(`${dirs.org}/img/**/*.jpg`)
        .pipe(plugins.responsive({
            '**/*.jpg': [{
                width: 1920,
                height: 1920,
                max: true,
                withoutEnlargement: false,
                rename: {
                    suffix: '.medium'
                },
            }, {
                width: 448,
                height: 387,
                max: true,
                withoutEnlargement: false,
                rename: {
                    suffix: '.small'
                },
            }, {
                width: 448,
                height: 387,
                max: true,
                withoutEnlargement: false,
                blur: 20,
                quality: 30,
                rename: {
                    suffix: '.placeholder'
                },
            }]
        }, config.responsive))
        .pipe(gulp.dest(`${dirs.src}/img`));
});

/**
 * HTML TASKS
 */

gulp.task('clean', () => {
    return del([dirs.dist, dirs.tmp]);
});

gulp.task('webpack:dev', () => {
    return gulp.src(`${dirs.src}/src/js/main.js`, { allowEmpty: true })
        .pipe(webpackStream(webpackDevConfig, webpack))
        .pipe(gulp.dest(dirs.dist))
        .pipe(gconnect.reload());
});

gulp.task('webpack:prod', () => {
    return gulp.src(`${dirs.src}/src/js/main.js`, { allowEmpty: true })
        .pipe(webpackStream(webpackProdConfig, webpack))
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('html', gulp.series('assemble', () => {
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
}));

/**
 * SERVE TASKS
 */

gulp.task('connect', (cb) => {
    gconnect.server({
        root: `${dirs.dist}`,
        livereload: true,
        port: 9000
    });
    cb();
});

gulp.task('watch', (cb) => {
    gulp.watch([`${dirs.src}/js/**/*.js`, `${dirs.src}/css/**/*.less`, `${dirs.src}/css/assets/**/*`], gulp.task('webpack:dev'));
    gulp.watch([`${dirs.assemble}/**/*.hbs`], gulp.task('assemble'));
    cb();
});

/**
 * PARALLEL TASKS
 */
gulp.task('check',      gulp.parallel('check:html', 'check:js', 'check:less'));

gulp.task('copy',       gulp.parallel('copy:files', 'copy:images', 'copy:vendorscripts'));

gulp.task('prepare',    gulp.parallel('prepare:favicons', 'prepare:images', 'prepare:modernizr', 'prepare:sitemap'));

gulp.task('images',     gulp.series('scale:images', 'prepare:images'));

/**
 * MAIN TASKS
 */

release(gulp);

gulp.task('default',    gulp.series('clean', 'check', 'copy', 'webpack:prod', 'html'));

gulp.task('deploy',     gulp.series('prepare', 'default', 'upload:page', 'release'));

gulp.task('dev',        gulp.series('clean', 'connect', 'copy', 'webpack:dev', 'html', 'watch'));

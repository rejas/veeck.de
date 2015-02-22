// For more information on how to configure a task runner, please visit:
// https://github.com/gulpjs/gulp

// TODO
// - randomize name of app.css/js on deploy

var gulp            = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    gutil           = require('gulp-util'),
    plugins         = gulpLoadPlugins();

var connect         = require('connect-livereload');
var del             = require('del');
var express         = require('express');
var stylish         = require('jshint-stylish');
var tiny            = require('tiny-lr');

var SRC             = 'src/';
var DST             = 'dist/';
var LIVERELOAD_PORT = 35729;
var EXPRESS_PORT    = 4000;
var EXPRESS_ROOT    = __dirname + '/' + SRC;

// Clear the destination folder
gulp.task('clean', function (cb) {
    del([DST], cb)
});

gulp.task('copy', ['clean'], function () {
    // Copy all application files except *.less and .js into the `dist` folder
    return gulp.src(['src/**/*', '!src/js/**/*.js', '!src/css/**/*.less'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('images', ['copy'], function () {
    gulp.src(SRC + 'material/img/**/*.jpg')
        .pipe(plugins.imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/material/img'));
});

// Detect errors and potential problems in your css code
gulp.task('csslint', function () {
    return gulp.src([SRC + 'css/*.less', '!'+SRC +'css/normalize.less'])
        .pipe(plugins.csslint('.csslintrc'))
        .pipe(plugins.csslint.reporter())
});

// Detect errors and potential problems in your JavaScript code (except vendor scripts)
// You can enable or disable default JSHint options in the .jshintrc file
gulp.task('jshint', function () {
    return gulp.src([SRC + 'js/**/*.js', '!'+SRC +'js/vendor/**'])
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter(stylish));
});

// Detect errors and potential problems in your html code
gulp.task('htmlhint', function () {
    return gulp.src([SRC + '*.html'])
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
});

gulp.task('vendorscripts', ['clean'], function () {
    // Minify and copy all vendor scripts
    return gulp.src(['src/js/vendor/**'])
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/js/vendor'));
});

gulp.task('scripts', ['clean'], function () {
    // Concatenate, minify and copy all JavaScript (except vendor scripts)
    return gulp.src(['src/js/**/*.js', '!src/js/vendor/**'])
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', ['clean'], function () {
    // Compile LESS files
    return gulp.src('src/css/main.less')
        .pipe(plugins.less())
        .pipe(plugins.rename('app.css'))
        .pipe(plugins.csso())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('html', ['images', 'styles', 'scripts', 'vendorscripts'] , function() {
    // We src all html files
    return gulp.src('src/*.html')
        .pipe(plugins.inject(gulp.src(["./dist/**/*.*", '!./dist/js/vendor/**'], {read: false}), {
            addRootSlash: false,  // ensures proper relative paths
            ignorePath: '/dist/' // ensures proper relative paths
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task('uncss', ['html'], function() {
    // Optimize via Uncss (beware: doesnt work with JS styles like in mobilemenu)
    return gulp.src('dist/css/app.css')
        .pipe(uncss({
            html: ['dist/index.html']
        }))
        .pipe(plugins.csso())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('sitemap', ['html'], function () {
    return gulp.src(['src/**/*.html', '!src/**/google*.html'], {read: false})
        .pipe(sitemap({
            fileName: 'sitemap.xml',
            newLine: '\n',
            changeFreq: 'daily',
            priority: '0.5',
            siteUrl: 'http://veeck.de',
            spacing: '    '
        }))
        .pipe(gulp.dest('src/'));
});

// Start express- and live-reload-server
gulp.task('serve', function () {
    var server = express();
    server.use(connect());
    server.use(express.static(EXPRESS_ROOT));
    server.listen(EXPRESS_PORT, function() {
        gutil.log('Listening on port ' + EXPRESS_PORT);
    });

    var lr = tiny();
    lr.listen(LIVERELOAD_PORT, function (err) {
        if (err) {
            gutil.log(err);
        }
    });

    gulp.watch([SRC + '**/*.html', SRC + 'css/**/*.less', SRC + 'js/**/*.js'] , function (event) {
        gulp.src(event.path, {read: false})
            .pipe(livereload(lr));
    });
});

gulp.task('ftp', function () {
    return gulp.src('.')
        .pipe(prompt.prompt({
            type: 'password',
            name: 'pw',
            message: 'enter ftp password'
        }, function(result){
            return gulp.src('dist/**/*')
                .pipe(ftp({
                    host: 'www.veeck.de',
                    user: 'www.veeck.de' ,
                    remotePath: 'dist',
                    pass: result.pw
                }));
        }));
});

// Runs all checks on the code
gulp.task('check', ['jshint', 'csslint', 'htmlhint']);

// The default task (called when you run `gulp`)
gulp.task('default', ['html']);
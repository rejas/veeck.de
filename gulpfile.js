// For more information on how to configure a task runner, please visit:
// https://github.com/gulpjs/gulp

var gulp    = require('gulp');
var clean   = require('gulp-clean');
var concat  = require('gulp-concat');
var csso    = require('gulp-csso');
var inject  = require("gulp-inject");
var jshint  = require('gulp-jshint');
var less    = require('gulp-less');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var es      = require('event-stream');
var stylish  = require('jshint-stylish');
var express = require('express');

gulp.task('clean', function () {
    // Clear the destination folder
    gulp.src('dist/**/*.*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('copy', function () {
    // Copy all application files except *.less and .js into the `dist` folder
    return es.concat(
        gulp.src(['src/**/*', '!src/js/*.js', '!src/less/**/*.less'])
            .pipe(gulp.dest('dist'))
    );
});

gulp.task('scripts', function () {
    return es.concat(
        // Detect errors and potential problems in your JavaScript code
        // You can enable or disable default JSHint options in the .jshintrc file
        gulp.src(['src/js/**/*.js', '!src/js/vendor/**'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(stylish)),

        // Concatenate, minify and copy all JavaScript (except vendor scripts)
        gulp.src(['src/js/**/*.js', '!src/js/vendor/**'])
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
    );
});

gulp.task('styles', function () {
    // Compile LESS files
    return gulp.src('src/css/main.less')
        .pipe(less())
        .pipe(rename('app.css'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('html', function() {
    // We src all html files
    return gulp.src('src/*.html')
        .pipe(inject(gulp.src(["./dist/**/*.*", '!./dist/js/vendor/**'], {read: false}), {
            addRootSlash: false,  // ensures proper relative paths
            ignorePath: '/dist/' // ensures proper relative paths
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task('server', function () {
    // Create a HTTP server for static files
    var port = 3000;
    var app = express();

    app.use(express.static(__dirname + '/src'));

    app.listen(port);
});


gulp.task('default', ['clean', 'copy', 'scripts', 'styles', 'html']);
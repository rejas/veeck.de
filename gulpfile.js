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

var gutil   = require('gulp-util');
var embedlr = require('gulp-embedlr');
var refresh = require('gulp-livereload');
var express = require('express');
var http    = require('http');
var lr      = require('tiny-lr')();

gulp.task('clean', function () {
    // Clear the destination folder
    gulp.src('dist/**/*.*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('copy', function () {
    // Copy all application files except *.less and .js into the `dist` folder
    return es.concat(
        gulp.src(['src/material/**'])
            .pipe(gulp.dest('dist/material')),
        gulp.src(['src/js/vendor/**'])
            .pipe(gulp.dest('dist/js/vendor')),
        gulp.src(['src/css/assets/**'])
            .pipe(gulp.dest('dist/css/assets')),
        gulp.src(['src/css/fonts/**'])
            .pipe(gulp.dest('dist/css/fonts')),
        gulp.src(['src/css/sprites/**'])
            .pipe(gulp.dest('dist/css/sprites')),
        gulp.src(['src/*.*'])
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
    var server = http.createServer(app);

    app.use(express.static(__dirname + '/dist'));

    server.on('listening', function () {
        gutil.log('Listening on http://locahost:' + server.address().port);
    });

    server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            gutil.log('Address in use, retrying...');
            setTimeout(function () {
                server.listen(port);
            }, 1000);
        }
    });

    server.listen(port);
});

gulp.task('lr-server', function () {
    // Create a LiveReload server
    lr.listen(35729, function (err) {
        if (err) {
            gutil.log(err);
        }
    });
});

gulp.task('watch', function () {
    // Watch .js files and run tasks if they change
    gulp.watch('src/js/**/*.js', ['scripts']);

    // Watch .less files and run tasks if they change
    gulp.watch('src/less/**/*.less', ['styles', 'html']);

    /*
    gulp.src('./src/*.html')
        .pipe(embedlr())
        .pipe(gulp.dest('./dist'));
    */
});

// The default task (called when you run `gulp`)
gulp.task('local', ['clean', 'copy', 'scripts', 'styles', 'html', 'lr-server', 'server', 'watch']);

gulp.task('default', ['clean', 'copy', 'scripts', 'styles', 'html']);
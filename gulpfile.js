// For more information on how to configure a task runner, please visit:
// https://github.com/gulpjs/gulp

// TODO
// - fix .htaccess copy
// - randomize name of app.css/js on deploy
// - test and surely fix livereload stuff

var gulp    = require('gulp');
var clean   = require('gulp-clean');
var concat  = require('gulp-concat');
var csso    = require('gulp-csso');
var embedlr = require('gulp-embedlr');
var refresh = require('gulp-livereload');
var inject  = require("gulp-inject");
var jshint  = require('gulp-jshint');
var less    = require('gulp-less');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var gutil   = require('gulp-util');
var es      = require('event-stream');
var express = require('express');
var http    = require('http');
var stylish = require('jshint-stylish');
var lr      = require('tiny-lr')();

gulp.task('clean', function () {
    // Clear the destination folder
    return gulp.src('dist/**/*.*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('copy', function () {
    // Copy all application files except *.less and .js into the `dist` folder
    return gulp.src(['src/**/*', '!src/js/**/*.js', '!src/less/**/*.less'])
            .pipe(gulp.dest('dist'));
});

gulp.task('jshint', function () {
    // Detect errors and potential problems in your JavaScript code
    // You can enable or disable default JSHint options in the .jshintrc file
    return gulp.src(['src/js/**/*.js', '!src/js/vendor/**'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(stylish));
});

gulp.task('vendorscripts', function () {
    // Minify and copy all vendor scripts
    return gulp.src(['src/js/vendor/**'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/vendor'));
});

gulp.task('scripts', function () {
    // Concatenate, minify and copy all JavaScript (except vendor scripts)
    return gulp.src(['src/js/**/*.js', '!src/js/vendor/**'])
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function () {
    // Compile LESS files
    return gulp.src('src/css/main.less')
        .pipe(less())
        .pipe(rename('app.css'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('html', ['styles', 'scripts'] , function() {
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
gulp.task('local', ['clean', 'copy', 'scripts', 'vendorscripts', 'styles', 'html', 'lr-server', 'server', 'watch']);

gulp.task('default', ['clean', 'copy', 'jshint', 'scripts', 'vendorscripts', 'styles', 'html']);
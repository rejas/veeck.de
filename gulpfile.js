/**
 * GULP PLUGINS
 */

var gulp            = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    gutil           = require('gulp-util'),
    minifyHTML      = require('gulp-minify-html'),
    plugins         = gulpLoadPlugins();

/**
 * OTHER PLUGINS
 */

var connect         = require('connect-livereload'),
    del             = require('del'),
    express         = require('express'),
    stylish         = require('jshint-stylish'),
    tiny            = require('tiny-lr');

/**
 * CONFIGS
 */

var config          = require('./config.json'),
    dirs            = config.directories;

/**
 * SUB TASKS
 */

// Clear the destination folder
gulp.task('clean', function (cb) {
    del([dirs.dist], cb)
});

// Copy all application files except *.less and .js into the `dist` folder
gulp.task('copy', ['clean'], function () {
    return gulp.src(['src/**/*', '!src/js/**/*.js', '!src/css/**/*.less'], { dot: true })
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('images', ['copy'], function () {
    gulp.src(dirs.src + 'material/img/**/*.{jpg|png}')
        .pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest(dirs.dist+'material/img'));
});

// Detect errors and potential problems in your css code
gulp.task('csslint', function () {
    return gulp.src([dirs.src + 'css/*.less', '!'+dirs.src +'css/normalize.less'])
        .pipe(plugins.csslint('.csslintrc'))
        .pipe(plugins.csslint.reporter())
});

// Detect errors and potential problems in your JavaScript code (except vendor scripts)
// You can enable or disable default JSHint options in the .jshintrc file
gulp.task('jshint', function () {
    return gulp.src([dirs.src + 'js/**/*.js', '!'+dirs.src +'js/vendor/**'])
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter(stylish));
});

// Detect errors and potential problems in your html code
gulp.task('htmlhint', function () {
    return gulp.src([dirs.src + '*.html'])
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
});

gulp.task('vendorscripts', ['clean'], function () {
    // Minify and copy all vendor scripts
    return gulp.src(['src/js/vendor/**'])
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dirs.dist+'js/vendor'));
});

// Concatenate, minify and copy all JavaScript (except vendor scripts)
gulp.task('scripts', ['clean'], function () {
    return gulp.src(['src/js/**/*.js', '!src/js/vendor/**'])
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.rev())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dirs.dist+'js'));
});

// Compile LESS files
gulp.task('styles', ['clean'], function () {
    return gulp.src('src/css/main.less')
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.rename('app.css'))
        .pipe(plugins.rev())
        .pipe(plugins.csso())
        .pipe(gulp.dest(dirs.dist+'css'))
});

gulp.task('html', ['images', 'styles', 'scripts', 'vendorscripts'] , function() {
    // We src all html files
    return gulp.src('src/*.html')
        .pipe(plugins.inject(gulp.src(["./dist/**/*.*", '!./dist/js/vendor/**'], {read: false}), config.inject))
        .pipe(minifyHTML(config.minifyHTML))
        .pipe(gulp.dest(dirs.dist));
});

// Optimize via Uncss (beware: doesnt work with JS styles like in mobilemenu)
gulp.task('uncss', ['html'], function() {
    return gulp.src(dirs.dist+'css/app.css')
        .pipe(uncss({
            html: [dirs.dist+'index.html']
        }))
        .pipe(plugins.csso())
        .pipe(gulp.dest(dirs.dist+'css/'));
});

gulp.task('sitemap', ['html'], function () {
    return gulp.src(['src/**/*.html', '!src/**/google*.html'], {read: false})
        .pipe(plugins.sitemap({
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
    var server  = express(),
        ports    = config.ports,
        root    = __dirname + '/' + dirs.src;

    server.use(connect());
    server.use(express.static(root));
    server.listen(ports.express, function() {
        gutil.log('Listening on port ' + ports.express);
    });

    var lr = tiny();
    lr.listen(ports.livereload, function (err) {
        if (err) {
            gutil.log(err);
        }
    });

    gulp.watch([dirs.src + '**/*.html', dirs.src + 'css/**/*.less', dirs.src + 'js/**/*.js'] , function (event) {
        gulp.src(event.path, {read: false})
            .pipe(plugins.livereload(lr));
    });
});

gulp.task('ftp', function () {
    return gulp.src('.')
        .pipe(prompt.prompt({
            type: 'password',
            name: 'pw',
            message: 'enter ftp password'
        }, function(result){
            return gulp.src(dirs.dist+'**/*')
                .pipe(plugins.ftp({
                    host: 'www.veeck.de',
                    user: 'www.veeck.de' ,
                    remotePath: 'dist',
                    pass: result.pw
                }));
        }));
});

/**
 * MAIN TASKS
 */

gulp.task('check', ['jshint', 'csslint', 'htmlhint']);

gulp.task('watch', ['serve']);

gulp.task('default', ['html']);

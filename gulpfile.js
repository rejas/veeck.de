/**
 * GULP PLUGINS
 */

var gulp            = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    gutil           = require('gulp-util'),
    plugins         = gulpLoadPlugins();

/**
 * OTHER PLUGINS
 */

var connect         = require('connect-livereload'),
    del             = require('del'),
    express         = require('express'),
    pngquant        = require('imagemin-pngquant'),
    stylish         = require('jshint-stylish'),
    tiny            = require('tiny-lr');

/**
 * CONFIGS
 */

var config          = require('./config.json'),
    dirs            = config.directories;

var SRC             = 'src/';
var DST             = 'dist/';
var LIVERELOAD_PORT = 35729;
var EXPRESS_PORT    = 4000;
var EXPRESS_ROOT    = __dirname + '/' + SRC;

/**
 * SUB TASKS
 */

// Clear the destination folder
gulp.task('clean', function (cb) {
    del([DST], cb)
});

// Copy all application files except *.less and .js into the `dist` folder
gulp.task('copy', ['clean'], function () {
    return gulp.src(['src/**/*', '!src/js/**/*.js', '!src/css/**/*.less'], { dot: true })
        .pipe(gulp.dest(DST));
});

gulp.task('images', ['copy'], function () {
    gulp.src(SRC + 'material/img/**/*.{jpg|png}')
        .pipe(plugins.imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(DST+'material/img'));
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
        .pipe(gulp.dest(DST+'js/vendor'));
});

// Concatenate, minify and copy all JavaScript (except vendor scripts)
gulp.task('scripts', ['clean'], function () {
    return gulp.src(['src/js/**/*.js', '!src/js/vendor/**'])
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.rev())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(DST+'js'));
});

// Compile LESS files
gulp.task('styles', ['clean'], function () {
    return gulp.src('src/css/main.less')
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.rename('app.css'))
        .pipe(plugins.rev())
        .pipe(plugins.csso())
        .pipe(gulp.dest(DST+'css'))
});

gulp.task('html', ['images', 'styles', 'scripts', 'vendorscripts'] , function() {
    // We src all html files
    return gulp.src('src/*.html')
        .pipe(plugins.inject(gulp.src(["./dist/**/*.*", '!./dist/js/vendor/**'], {read: false}), {
            addRootSlash: false,  // ensures proper relative paths
            ignorePath: '/dist/' // ensures proper relative paths
        }))
        .pipe(gulp.dest(DST));
});

// Optimize via Uncss (beware: doesnt work with JS styles like in mobilemenu)
gulp.task('uncss', ['html'], function() {
    return gulp.src(DST+'css/app.css')
        .pipe(uncss({
            html: [DST+'index.html']
        }))
        .pipe(plugins.csso())
        .pipe(gulp.dest(DST+'css/'));
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
            return gulp.src(DST+'**/*')
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

/**
 * GULP PLUGINS
 */

var gulp            = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    gutil           = require('gulp-util'),
    browserify      = require('browserify'),
    minifyHTML      = require('gulp-minify-html'),
    spritesmith     = require('gulp.spritesmith'),
    plugins         = gulpLoadPlugins();

/**
 * OTHER PLUGINS
 */

var connect         = require('connect-livereload'),
    del             = require('del'),
    express         = require('express'),
    ftp             = require('vinyl-ftp'),
    stylish         = require('jshint-stylish'),
    tiny            = require('tiny-lr');

/**
 * CONFIGS
 */

var config          = require('./config.json'),
    dirs            = config.directories;

/**
 * Check
 */

// Clear the destination folder
gulp.task('clean', function (cb) {
    del([dirs.dist], cb)
});

// Copy all application files except *.less and .js into the `dist` folder
gulp.task('copy', ['clean'], function () {
    return gulp.src(['src/**/*', '!src/js/**/*.js', '!src/css/**/*.less', '!src/components/less'], { dot: true })
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('imagesOld', ['copy'], function () {
    gulp.src(dirs.src + 'img/**/*.{jpg|png}')
        .pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest(dirs.dist+'img'));
});

// Detect errors and potential problems in your css code
gulp.task('csslint', function () {
    return gulp.src([dirs.src + 'css/*.less', '!'+dirs.src +'css/libs'])
        .pipe(plugins.csslint('.csslintrc'))
        .pipe(plugins.csslint.reporter())
});

// Detect errors and potential problems in your JavaScript code (except vendor scripts)
// You can enable or disable default JSHint options in the .jshintrc file
gulp.task('jshint', function () {
    return gulp.src([dirs.src + 'js/**/*.js', '!'+dirs.src + 'js/vendor/**'])
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter(stylish));
});

// Detect errors and potential problems in your html code
gulp.task('htmlhint', function () {
    return gulp.src([dirs.src + '*.html'])
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
});

/**
 * Prepare
 */

gulp.task('prepare:sprites', function () {
    var spriteData = gulp.src(['src/css/assets/icons/links/*.png', 'src/css/assets/icons/research/*.png']).pipe(spritesmith({
        imgName:         'sprite.png',
        cssName:         'sprite.less',
        imgPath:         'assets/sprite.png'
    }));

    // Pipe image stream through image optimizer and onto disk
    spriteData.img
        //.pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest('src/css/assets/'));

    // Pipe CSS stream through CSS optimizer and onto disk
    spriteData.css
        .pipe(gulp.dest('src/css/base/'));
});

gulp.task('optimize:images', function () {
    gulp.src(dirs.src + 'img/**/*')
        .pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest(dirs.src + 'img'));
});

/**
 * Watch
 */

gulp.task('serve', function () {
    var server  = express(),
        ports   = config.ports,
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

/**
 * Default
 */

// Clear the destination folder
gulp.task('clean', function (cb) {
    del([dirs.dist], cb)
});

// Copy all application files except *.less and .js into the `dist` folder
gulp.task('copy', ['clean'], function () {
    return gulp.src(['src/**/*', '!src/js/**/*.js', '!src/css/**/*.less', '!src/components/less'], { dot: true })
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('vendorscripts', function () {
    // Minify and copy all vendor scripts
    return gulp.src([dirs.src + 'js/vendor/**'])
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dirs.dist + 'js/vendor'));
});

// Concatenate, minify and copy all JavaScript (except vendor scripts)
gulp.task('scripts', ['clean'], function () {
    return gulp.src([dirs.src + 'js/**/*.js', '!'+dirs.src + 'js/vendor/**'])
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.rev())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dirs.dist + 'js'));
});

// Compile LESS files
gulp.task('styles', ['clean'], function () {
    return gulp.src(dirs.src + 'css/main.less')
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.rename('main.css'))
        .pipe(plugins.rev())
        .pipe(plugins.csso())
        .pipe(gulp.dest(dirs.dist + 'css'))
});

gulp.task('htmlOLD', ['images', 'styles', 'scripts', 'vendorscripts'] , function() {
    // We src all html files
    return gulp.src(dirs.src + '*.html')
        .pipe(plugins.inject(gulp.src(["./dist/**/*.*", '!./dist/js/vendor/**', '!./dist/components/**'], {read: false}), config.inject))
        .pipe(minifyHTML(config.minifyHTML))
        .pipe(gulp.dest(dirs.dist));
});

// Optimize via Uncss (beware: doesnt work with JS styles like in mobilemenu)
gulp.task('uncss', ['html'], function() {
    return gulp.src(dirs.dist + 'css/app.css')
        .pipe(uncss({
            html: [dirs.dist + 'index.html']
        }))
        .pipe(plugins.csso())
        .pipe(gulp.dest(dirs.dist + 'css/'));
});

gulp.task('sitemap', ['html'], function () {
    return gulp.src([dirs.src + '**/*.html', '!'+ dirs.src + '/**/google*.html'], {read: false})
        .pipe(plugins.sitemap({
            fileName: 'sitemap.xml',
            newLine: '\n',
            changeFreq: 'daily',
            priority: '0.5',
            siteUrl: 'http://veeck.de',
            spacing: '    '
        }))
        .pipe(gulp.dest(dirs.src));
});

gulp.task('html', ['copy', 'styles', 'scripts', 'vendorscripts', 'sitemap'] , function() {
    // We src all html files
    return gulp.src(dirs.src + '*.html')
        .pipe(plugins.inject(gulp.src(["./dist/**/*.*", '!./dist/js/vendor/**', '!./dist/components/**'], {read: false}), config.inject))
        .pipe(minifyHTML(config.minifyHTML))
        .pipe(gulp.dest(dirs.dist));
});

/**
 * Deploy
 */

gulp.task('upload', function () {
    return gulp.src('.')
        .pipe(plugins.prompt.prompt({
            type: 'password',
            name: 'pw',
            message: 'enter ftp password'
        }, function(result) {
            var conn = ftp.create({
                host:       config.ftp.host,
                user:       config.ftp.user,
                password:   result.pw,
                log:        gutil.log
            });

            return gulp.src([dirs.dist + '**/*', '!'+dirs.dist + 'files/**/*', '!'+dirs.dist + 'img/**/*'], { base: 'dist', buffer: false } )
                .pipe(conn.newer('/')) // only upload newer files
                .pipe(conn.dest('/'));
        }));
});

gulp.task('upload:images', function () {
    return gulp.src('.')
        .pipe(plugins.prompt.prompt({
            type: 'password',
            name: 'pw',
            message: 'enter ftp password'
        }, function(result) {
            var conn = ftp.create({
                host:       config.ftp.host,
                user:       config.ftp.user,
                password:   result.pw,
                log:        gutil.log
            });

            return gulp.src([dirs.dist + 'img/**/*'], { base: 'dist', buffer: false } )
                .pipe(conn.newer('/')) // only upload newer files
                .pipe(conn.dest('/'));
        }));
});


gulp.task('upload:material', function () {
    return gulp.src('.')
        .pipe(plugins.prompt.prompt({
            type: 'password',
            name: 'pw',
            message: 'enter ftp password'
        }, function(result) {
            var conn = ftp.create({
                host:       config.ftp.host,
                user:       config.ftp.user,
                password:   result.pw,
                log:        gutil.log
            });

            return gulp.src([dirs.dist + 'material/**/*'], { base: 'dist', buffer: false } )
                .pipe(conn.newer('/')) // only upload newer files
                .pipe(conn.dest('/'));
        }));
});

/**
 * MAIN TASKS
 */

gulp.task('check',      ['jshint', 'csslint', 'htmlhint']);

gulp.task('prepare',    ['prepare:sprites', 'optimize:images']);

gulp.task('devold',     ['serve']);

gulp.task('default',    ['html']);

gulp.task('deploy',     ['upload']);

/**
 * NEW
 */

var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    livereload = require('connect-livereload'),
    source = require('vinyl-source-stream'),
    livereloadport = 35729,
    serverport = 5000;



// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
/*
server.all('/*', function(req, res) {
    res.sendfile('index.html', { root: 'dist' });
});
*/

// Browserify task
gulp.task('browserify', function() {
    return browserify({ entries: ['src/js/main.js'] })
        .bundle()
        .pipe(source('main.bundled.js'))
        .pipe(gulp.dest('dist/js'));
});

// Copy all application files except *.less and .js into the `dist` folder
gulp.task('files', function () {
    return gulp.src(['src/**/*', '!src/*.html', '!src/js/**/*.js', '!src/css/**/*.less', '!src/components'], { dot: true })
        .pipe(gulp.dest(dirs.dist));
});

// Compile LESS files
gulp.task('css', function () {
    return gulp.src(dirs.src + 'css/main.less')
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.rename('main.css'))
        //.pipe(plugins.rev())
        .pipe(plugins.csso())
        .pipe(gulp.dest(dirs.dist + 'css'))
});

gulp.task('images', function () {
    gulp.src(dirs.src + 'img/**/*.jpg')
        //.pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest(dirs.dist + 'img'));
});

// Views task
gulp.task('html', function() {
    // Get our index.html
    gulp.src('src/*.html')
        // And put it in the dist folder
        .pipe(gulp.dest('dist/'))
        .pipe(refresh(lrserver)); // Tell the lrserver to refresh
});

gulp.task('watch', function() {
    gulp.watch(['src/components/*.js'],[
        'browserify'
    ]);
    gulp.watch(['src/css/**/*.less'], [
        'css'
    ]);
    gulp.watch(['src/*.html'], [
        'html'
    ]);
});

// Dev task
gulp.task('dev', ['images', 'files', 'vendorscripts', 'browserify', 'css', 'markup', 'watch'], function() {
    // Start webserver
    server.listen(serverport);
    // Start live reload
    lrserver.listen(livereloadport);
});




/**
 * MAIN TASKS
 */

gulp.task('check',      ['jshint', 'csslint', 'htmlhint']);

gulp.task('prepare',    ['prepare:sprites', 'optimize:images']);

gulp.task('devold',     ['serve']);

gulp.task('default',    ['html']);

gulp.task('deploy',     ['upload']);

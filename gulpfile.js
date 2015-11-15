/**
 * GULP PLUGINS
 */

var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    minifyHTML      = require('gulp-minify-html'),
    plugins         = require('gulp-load-plugins')(),
    spritesmith     = require('gulp.spritesmith'),
    refresh         = require('gulp-livereload'),
    runSequence     = require('run-sequence');

/**
 * OTHER PLUGINS
 */

var browserify      = require('browserify'),
    del             = require('del'),
    express         = require('express'),
    ftp             = require('vinyl-ftp'),
    lrserver        = require('tiny-lr')(),
    livereload      = require('connect-livereload'),
    buffer          = require('vinyl-buffer'),
    source          = require('vinyl-source-stream'),
    stylish         = require('jshint-stylish');

/**
 * CONFIGS
 */

var config          = require('./config.json'),
    dirs            = config.directories;

/**
 * Check
 */

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
    var spriteData = gulp.src([dirs.src + 'css/assets/icons/links/*.png', dirs.src + 'css/assets/icons/research/*.png'])
        .pipe(spritesmith({
            imgName:         'sprite.png',
            cssName:         'sprite.less',
            imgPath:         'assets/sprite.png'
        })
    );

    // Pipe image stream through image optimizer and onto disk
    spriteData.img
        //.pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest(dirs.src + 'css/assets/'));

    // Pipe CSS stream through CSS optimizer and onto disk
    spriteData.css
        .pipe(gulp.dest(dirs.src + 'css/base/'));
});

gulp.task('optimize:images', function () {
    return gulp.src(dirs.src + 'img/**/*')
        .pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest(dirs.src + 'img'));
});

/**
 * Default
 */

// Clear the destination folder
gulp.task('clean', function (cb) {
    del(['./' + dirs.dist]).then(function () { cb(); });
});

// Browserify task
gulp.task('browserify', function() {
    return browserify({ entries: [dirs.src + 'js/main.js'] })
        .bundle()
        .pipe(source('main.bundled.js'))
        .pipe(buffer())
        .pipe(plugins.uglify())
        //.pipe(plugins.rev())
        .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('vendorscripts', function () {
    // Minify and copy all vendor scripts
    return gulp.src([dirs.src + 'components/jquery/dist/jquery.min.js',
                     dirs.src + 'components/outdated-browser/outdatedbrowser/outdatedbrowser.min.js',
                     dirs.src + 'js/vendor/modernizr.min.js'])
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dirs.dist + 'js/vendor'));
});

// Copy all application files except *.less and .js into the `dist` folder
gulp.task('files', function () {
    return gulp.src([dirs.src + '**/*', '!'+dirs.src + '*.html', '!'+dirs.src + 'js/**/*.js',
        '!'+dirs.src + 'css/**/*.less', '!'+dirs.src + 'components/**/*'], { dot: true })
        .pipe(gulp.dest(dirs.dist));
});

// Compile LESS files
gulp.task('css', function () {
    return gulp.src(dirs.src + 'css/main.less')
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.rename('main.css'))
        .pipe(plugins.csso())
        //.pipe(plugins.rev())
        .pipe(gulp.dest(dirs.dist + 'css'))
});

gulp.task('images', function () {
    return gulp.src(dirs.src + 'img/**/*.jpg')
        .pipe(gulp.dest(dirs.dist + 'img'));
});

// Views task
gulp.task('markup', function() {
    // Get our index.html
    return gulp.src(dirs.src + '*.html')
        // And put it in the dist folder
        .pipe(gulp.dest(dirs.dist))
        .pipe(refresh(lrserver)); // Tell the lrserver to refresh
});

/**
 * Dev
 */

gulp.task('serve', ['images', 'files', 'vendorscripts', 'browserify', 'css', 'markup'], function () {
    // Set up an express server (but not starting it yet)
    var server = express();
    // Add live reload
    server.use(livereload({port: config.ports.livereload}));
    // Use our 'dist' folder as rootfolder
    server.use(express.static('./' + dirs.dist));

    // Start webserver
    server.listen(config.ports.express);
    // Start live reload
    lrserver.listen(config.ports.livereload);

    gulp.watch([dirs.src + 'components/*.js', dirs.src + 'js/**/*.js'],[
        'browserify'
    ]);
    gulp.watch([dirs.src + 'css/**/*.less'], [
        'css'
    ]);
    gulp.watch([dirs.src + '*.html'], [
        'markup'
    ]);
});

/**
 * Default
 */

gulp.task('html', ['images', 'files', 'vendorscripts', 'browserify', 'css'] , function() {
    // We src all html files
    return gulp.src(dirs.src + '*.html')
        .pipe(minifyHTML(config.minifyHTML))
        .pipe(gulp.dest(dirs.dist));
});

/**
 * Deploy
 */

gulp.task('sitemap', ['html'], function () {
    return gulp.src([dirs.src + '/*.html', '!'+ dirs.src + '/google*.html'], {read: false})
        .pipe(plugins.sitemap({
            fileName: 'sitemap.xml',
            newLine: '\n',
            changefreq: 'daily',
            priority: '0.5',
            siteUrl: 'http://veeck.de',
            spacing: '    '
        }))
        .pipe(gulp.dest(dirs.src));
});

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

            return gulp.src([dirs.dist + '**/*', '!'+dirs.dist + 'files/**/*', '!'+dirs.dist + 'img/**/*', , '!'+dirs.dist + 'components'], {
                    base: 'dist', buffer: false })
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

gulp.task('upload:files', function () {
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

            return gulp.src([dirs.dist + 'files/**/*'], { base: 'dist', buffer: false } )
                .pipe(conn.newer('/')) // only upload newer files
                .pipe(conn.dest('/'));
        }));
});

/**
 * MAIN TASKS
 */

gulp.task('check',      ['jshint', 'csslint', 'htmlhint']);

gulp.task('prepare',    ['prepare:sprites', 'optimize:images']);

gulp.task('dev',        ['serve']);

gulp.task('default',    function (cb) { runSequence('clean', 'html', cb) });

gulp.task('deploy',     ['upload']);

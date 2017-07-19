var assemble    = require('assemble')();
var del         = require('del');
var gulp        = require('gulp');
var extname     = require('gulp-extname');

gulp.task('clean', function (cb) {
    del(['./dist']).then(function () { cb(); });
});

gulp.task('load', function(cb) {
    assemble.partials('./src/assemble/partials/**/*.hbs');
    assemble.layouts('./src/assemble/layouts/**/*.hbs');
    assemble.pages('./src/assemble/pages/**/*.hbs');
    assemble.data(['./src/assemble/data/*.{json,yml}']);
    assemble.option('layout', 'default');

    assemble.preLayout( /./, function ( view, next ) {
        // if the layout is not defined, use the default one ...
        if (!view.layout && assemble.options.layout) {
            view.layout = assemble.options.layout;
        }
        next();
    } );
    cb();
});

gulp.task('assemble', ['load'], function() {

    assemble.helper('md', require('helper-md'));

    return assemble.toStream('pages')
        .pipe(assemble.renderFile())
        .pipe(extname())
        .pipe(assemble.dest('./dist'));
});

gulp.task('default',     ['assemble']);

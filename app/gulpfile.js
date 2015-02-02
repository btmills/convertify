var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
//var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var to5ify = require('6to5ify');
//var uglify = require('gulp-uglify');
var less = require('gulp-less');

var paths = {
    scripts: {
    	index: './src/index.js',
    	src: './src/*.js',
    	js: '../www/js'
    },
    styles: {
        less: './less/**/*.less',
        css: '../www/css'
    }
};

gulp.task('scripts', function () {
  browserify(paths.scripts.index, { debug: true })
    .transform(to5ify)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    //.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    //.pipe(uglify())
    //.pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(paths.scripts.js));
});

gulp.task('less', function () {
    gulp.src(paths.styles.less)
        .pipe(less({ paths: [__dirname] }))
        .pipe(gulp.dest(paths.styles.css));
});

gulp.task('default', ['scripts', 'less']);

gulp.task('watch', ['default'], function () {
	gulp.watch(paths.scripts.src, ['scripts']);
    gulp.watch(paths.styles.less, ['less']);
});

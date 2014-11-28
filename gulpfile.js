var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var should = require('should');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var paths = {
    main: './src/main.js',
    build: './build',
    sources: './src/**/*.js',
    tests: './test/**/*.js',
    html: './build/index.html',
    es5shim: './node_modules/es5-shim'
};

gulp.task('build', function () {
    return gulp.src(paths.main)
        .pipe(browserify({
            debug: true
        }))
        .pipe(gulp.dest(paths.build));
});

gulp.task('build-dist', function () {
    return gulp.src(paths.main)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest(paths.build));
});

gulp.task('connect', ['build'], function () {
    connect.server({
        livereload: true,
        root: [paths.build, paths.es5shim]
    });
});

gulp.task('reload', ['build'], function () {
    gulp.src(paths.sources)
        .pipe(connect.reload());
});

gulp.task('serve', ['connect'], function () {
    return gulp.watch([paths.html, paths.sources], ['reload']);
});

gulp.task('lint', function () {
    return gulp.src(paths.sources)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('test', ['lint'], function () {
    return gulp.src(paths.tests, {read: false})
        .pipe(mocha({
            globals: {
                should: should
            }
        }))
        .on('error', keepCalmAndCarryOn);

    function keepCalmAndCarryOn(err) {
        console.error(err);
        this.emit('end');
    }
});

gulp.task('test-watch', ['test'], function () {
    return gulp.watch([paths.sources, paths.tests], ['test']);
});

gulp.task('default', ['build']);

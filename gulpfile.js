var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

var paths = {
    main: './src/main.js',
    build: './build',
    watched: [
        './src/**.js',
        './build/index.html'
    ]
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
        root: paths.build
    });
});

gulp.task('reload', ['build'], function () {
    gulp.src(paths.watched)
        .pipe(connect.reload());
});

gulp.task('serve', ['connect'], function () {
    return gulp.watch(paths.watched, ['reload']);
});

gulp.task('default', ['build']);

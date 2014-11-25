var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');

var paths = {
    main: './src/main.js',
    build: './build',
    watched: [
        './src/**.js',
        './index.html'
    ]
};

gulp.task('build', function () {
    return gulp.src(paths.main)
        .pipe(browserify())
        .pipe(gulp.dest(paths.build));
});

gulp.task('connect', ['build'], function () {
    connect.server({
        livereload: true
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

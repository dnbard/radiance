var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var connect = $.connectMulti;
var devServer = connect();
var rjs = require('gulp-requirejs');
var fileinclude = require('gulp-file-include');
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');

gulp.task('connect-dev', devServer.server({
    root: ['app'],
    port: 8989
}));

gulp.task('clean', function() {
    return gulp.src(['dist'], {read: false})
        .pipe($.rimraf());
});

gulp.task('watch', ['connect-dev'], function() {
    gulp.watch(['app/**/*.html'], ['html']);

    gulp.watch([
        'app/**/*.html',
        'app/**/*.js',
        'app/**/*.css'
    ], function(event) {
        return gulp.src(event.path)
            .pipe(plumber())
            .pipe(devServer.reload());
    });
});

gulp.task('build', function() {
    gulp.start('compress');
});

gulp.task('compress', ['html', 'scripts'], function() {
    gulp.src(['dist/scripts/app.js', 'dist/scripts/vendor.js'])
        .pipe($.uglify())
        .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('html', ['base'], function() {
    gulp.src(['./app/app.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './app/partials'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./app'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('base', ['static', 'fonts', 'images', 'styles']);

gulp.task('static', function() {
    gulp.src('app/static/*')
        .pipe(gulp.dest('dist/static/'));
});

gulp.task('fonts', function() {
    gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function() {
    gulp.src('app/images/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('styles', function() {
    gulp.src('app/styles/*.css')
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function() {
    rjs({
        baseUrl: 'app/scripts/',
        out: 'app.js',
        paths:{
            q: '../bower_components/q/q',
            pubsub: '../bower_components/pubsub-js/src/pubsub',
            ko: '../bower_components/knockout/dist/knockout',
            jquery: '../bower_components/jquery/dist/jquery',
            lodash: '../bower_components/lodash/dist/lodash',
            phaser: '../bower_components/phaser/build/phaser'
        },
        shim:{
            phaser:{
                exports: 'Phaser'
            }
        },
        name: 'app'
    }).pipe(gulp.dest('dist/scripts/'));
});

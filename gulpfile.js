'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');

// Concatenate and minify JS
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Parse and minify SASS/SCSS
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

// Fingerprint our assets
var merge = require('merge-stream');
var hash = require('gulp-hash');

// Delete files on each build
var del = require('del');


gulp.task('css', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets'));
});


gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./assets'));
});


gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
});


gulp.task('build', ['css', 'js'], function() {
  // Clean the /dist folder
  del(['./dist/**/*']);

  // Minify the assets
  var streams = merge(
    gulp.src('assets/script.js')
      .pipe(uglify()),
    gulp.src('assets/style.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
  );

  // Fingerprint them
  streams.pipe(hash())
    .pipe(gulp.dest('./dist'))
    .pipe(hash.manifest('assets.json'))
    .pipe(gulp.dest('.'));
});

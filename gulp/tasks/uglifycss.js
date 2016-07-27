var gulp = require('gulp');
var uglifycss = require('gulp-uglifycss');
var config = require('../config').uglifycss;
 
gulp.task('uglifycss', function () {
  gulp.src(config.src)
    .pipe(uglifycss({
      "max-line-len": 80
    }))
    .pipe(gulp.dest(config.dest));
});
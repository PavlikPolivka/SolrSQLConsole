var uglify = require('gulp-uglifyjs');
var gulp = require('gulp');
var config = require('../config').uglifyjs;
 
gulp.task('uglifyjs', function() {
  gulp.src(config.src)
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
});
var gulp = require('gulp');
var config = require('../config').htmlRelease;

gulp.task('htmlRelease', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

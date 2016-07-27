var gulp = require('gulp');
gulp.task('release', ['htmlRelease', 'uglifycss', 'uglifyjs' ]);
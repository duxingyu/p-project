const gulp = require('gulp');
const sass = require('gulp-sass');

//---------------------sass编译-----------------

gulp.task('scss', function() {
  return gulp.src('suning/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('suning/css'));
});

gulp.task('sass:watch', ['scss'], function() {
  gulp.watch('suning/sass/*.scss', ['scss']);
});
gulp.task('sass', ['sass:watch']);

gulp.task('default', ['scss']);

const gulp = require('gulp'),
  // browserSync = require('browser-sync').create(),
  cleanCss = require('gulp-clean-css'),
  plugins = require('gulp-load-plugins')(),
  basedir = 'suning/';

//---------------------sass编译,监控------------------

gulp.task('scss', function() {
  return gulp.src(`${basedir}sass/*.scss`)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest(`${basedir}css`));
});

gulp.task('sass:watch', ['scss'], function() {
  gulp.watch(`${basedir}sass/*.scss`, ['scss']);
});

gulp.task('sass', ['sass:watch']);

//---------------------压缩js---------------------

gulp.task('js', function() {
  return gulp.src(`${basedir}js/*.js`)
    .pipe(plugins.babel({
      presets: ['es2015']
    }))
    .pipe(plugins.uglify())
    // .pipe(plugins.concat('src.js'))
    .pipe(plugins.rename(function(path) {
      path.basename += '.min';
      return path;
    }))
    .pipe(gulp.dest(`dist/${basedir}js`));
});

//------------加前缀、压缩css---------------

gulp.task('mincss', function() {
  return gulp.src(`${basedir}css/*.css`)
    // .pipe(plugins.autoprefixer({
    //   browsers: ['last 2 versions'],
    //   cascade: false
    // }))
    .pipe(cleanCss({
      compatibility: 'ie7'
    }))
    .pipe(plugins.rename(function(path) {
      path.basename += '.min';
      return path;
    }))
    .pipe(gulp.dest(`dist/${basedir}css`));
});

//---------------压缩HTML----------------

gulp.task('minhtml', function() {
  return gulp.src(`${basedir}*.html`)
    .pipe(plugins.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(plugins.rename(function(path) {
      path.basename += '.min';
      return path;
    }))
    .pipe(gulp.dest(`dist/${basedir}`));
});

//---------------图片压缩----------------

gulp.task('minimg', function() {
  return gulp.src(`${basedir}img/**/*`)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(`dist/${basedir}img`));
});

gulp.task('default', ['mincss', 'minhtml', 'minimg', 'js']);

//--------------浏览器自动刷新---------------
/*
gulp.task('serve', ['sersass'], function() {

  browserSync.init({
    server: {
      server: 'suning'
    }
  });

  gulp.watch(`${basedir}sass/*.scss`, ['scss']);
  gulp.watch(`${basedir}suning.html`).on('change', browserSync.reload);
});

gulp.task('sersass', function() {
  return gulp.src(`${basedir}sass/*.scss`)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest(`${basedir}css`))
    .pipe(browserSync.stream());
});

gulp.task('livereload', ['serve']);*/

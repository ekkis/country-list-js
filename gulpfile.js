let gulp = require('gulp');
let browserify = require('browserify');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify-es').default;
let sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var streamify = require('gulp-streamify');

gulp.task('default', function() {
  var b = browserify({
    entries: './src/index.js',
    debug: true,
  });
  return b.bundle()
          .pipe(source('./src/index.js'))
          .pipe(buffer())
          .pipe(sourcemaps.init({loadmaps: true}))
          .pipe(streamify(uglify()))
          .on('error', console.log)
          .pipe(rename('country.min.js'))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('./dist'));
});
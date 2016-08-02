var browserify  = require('browserify');
var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var header      = require('gulp-header');
var header_info = require('fs').readFileSync('./reasoner.meta.js', 'utf8') + '\n';

gulp.task('default', function() {
  return browserify('./src/top.js')
    .bundle()
    .pipe(source('reasoner.js'))
    .pipe(header(header_info))
    .pipe(gulp.dest('./'));
});

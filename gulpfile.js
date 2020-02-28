const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const exec = require('child_process').exec;

const filesConcatArray = [
  'node_modules/cytoscape/dist/cytoscape.min.js',
  'node_modules/numeric/numeric-1.2.6.min.js',
  'node_modules/layout-base/layout-base.js',
  'node_modules/cose-base/cose-base.js',
  'node_modules/cytoscape-fcose/cytoscape-fcose.js',
  'icons.js',
  'code.js',
];

gulp.task('icons', function(cb) {
  exec('node ./convert.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('concat', (done) => {
  gulp.src(filesConcatArray)
      .pipe(concat('code-full.min.js'))
      .pipe(gulp.dest('dist'))
      .on('error', gutil.log);
  done();
});

gulp.task('default', gulp.series('icons', 'concat'));


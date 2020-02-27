const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');

const arrCode = [    
    'node_modules/cytoscape/dist/cytoscape.min.js',
    'node_modules/numeric/numeric-1.2.6.min.js',
    'node_modules/layout-base/layout-base.js',
    'node_modules/cose-base/cose-base.js',
    'node_modules/cytoscape-fcose/cytoscape-fcose.js',
    'code.js',
];

gulp.task('client', (done) => {
  gulp.src(arrCode)
    .pipe(concat('code-full.min.js'))
    .pipe(gulp.dest('dist'))
    .on('error', gutil.log);
  done();
});

gulp.task('default', gulp.series('client'));


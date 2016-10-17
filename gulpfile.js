/**
 * Module Dependencies
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

/**
 * Gulp Tasks
 */


gulp.task('browser-sync', ['nodemon'], function() {
  console.log('browser-sync on 5000');
  browserSync.init(null,{
    proxy: "localhost:8080",  // local node app address
    port: 5050,  // use *different* port than above
    files: ["./public/**/*.{html,htm,css,js}"],
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['public/*.html'], reload);
  
});
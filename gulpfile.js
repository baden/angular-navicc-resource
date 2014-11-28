var gulp = require('gulp'),
    bump = require('gulp-bump'),
    header = require('gulp-header'),
    include = require('gulp-include'),
    jshint = require('gulp-jshint'),
    jsonlint = require('gulp-jsonlint'),
    karma = require('karma').server,
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    zip = require('gulp-zip');

var pkg = require('./bower.json'),
    fs = require('fs');

/* jshint camelcase:false:start */
function dev() {
  return uglify({
    mangle: false,
    compress: true,
    preserveComments: 'some',
    output: {
      beautify: true,
      indent_level: 2,
      ascii_only: true,
      comments: false,
      width: 80
    }
  });
}

function prod() {
  return uglify({
    mangle: true,
    preserveComments: 'some',
    compress: {
      global_defs: 'angular'
    }
  });
}
/* jshint camelcase:false:end */

function min(path) {
  path.basename += '.min';
}

function banner() {
  var today = new Date();
  var license = fs.readFileSync('./LICENSE').toString()
    .split('\n').splice(3).join('\n');
  var str = [
    '/**!',
    ' * <%= pkg.title %> v<%= pkg.version %>',
    ' * <%= pkg.homepage %>',
    ' * Copyright (c) <%= today.getFullYear() %> <%= pkg.author %>',
    ' * <%= license.replace(/\\n/gm, "\\n * ") %>',
    ' */',
    ''].join('\n');

  return header(str, {pkg: pkg, today: today, license: license});
}

gulp.task('build', function() {
  gulp.src('src/*.js')
    .pipe(include())
    // Dev file
    .pipe(dev())
    .pipe(banner())
    .pipe(gulp.dest('dist/'))
    // Prod file
    .pipe(rename(min))
    .pipe(prod())
    .pipe(banner())
    .pipe(gulp.dest('dist/'));
});

gulp.task('pack', ['test', 'build'], function() {
  gulp.src('dist/*.js')
    .pipe(zip(pkg.name + '-v' + pkg.version + '.zip'))
    .pipe(gulp.dest('build/'));

  gulp.src('*.json')
    .pipe(bump({version: pkg.version}))
    .pipe(gulp.dest('./'));
});

gulp.task('lint', function() {
  gulp.src('*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());

  gulp.src(['gulpfile.js', 'src/**/*.js', 'test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', ['lint'], function(done) {
  // Start karma
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, function (exitCode) {
    done(exitCode);
  });
});

gulp.task('default', function(done) {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['lint', 'build']);
  // Start karma with watch options
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    autoWatch: true,
    singleRun: false
  }, function (exitCode) {
    done(exitCode);
  });
});

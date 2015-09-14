'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

var options = {
  src: 'src',
  dist: 'www',
  tmp: '.tmp',
  e2e: 'e2e',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
    exclude: [/jquery/],
    dependencies: {
      'ace-builds': '1.2.0'
    },
    overrides: {
      'ace-builds': {
        main: ['src-noconflict/ace.js', 'src-noconflict/mode-markdown.js', 'src-noconflict/mode-yaml.js']
      },
      'it-date-time-picker': {
        main: ['dist/itDateTimePicker.js', 'dist/styles/itDateTimePicker.css']
      }
    }
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

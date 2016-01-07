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
      'codemirror': {
        main: ['lib/codemirror.js', 'lib/codemirror.css', 'addon/mode/overlay.js', 'mode/markdown/markdown.js', 'mode/gfm/gfm.js', 'mode/yaml/yaml.js']
      },
      'moment': {
        main: ['moment.js', 'locale/zh-cn.js', 'locale/en-gb.js', 'locale/ru.js']
      },
      'inline-attachment': {
        main: ['src/inline-attachment.js', 'src/codemirror.inline-attachment.js']
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

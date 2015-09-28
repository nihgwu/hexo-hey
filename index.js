'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveStatic = require('serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

hexo.extend.filter.register('server_middleware', function (app) {
  app.use('/admin', (0, _serveStatic2['default'])(_path2['default'].join(__dirname, 'www')));

  if (hexo.config.admin.cors) {
    app.use((0, _cors2['default'])({
      origin: hexo.config.admin.cors
    }));
  }
  app.use(_bodyParser2['default'].urlencoded({
    extended: true
  }));
  app.use(_bodyParser2['default'].json({
    limit: '10mb'
  }));

  app.use(function (req, res, next) {
    res.status = function (code) {
      res.statusCode = code;
      return res;
    };
    res.send = function (data) {
      res.end(data);
    };
    res.json = function (data) {
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify(data));
    };
    next();
  });

  app.use('/api', (0, _api2['default'])(app, hexo));
});
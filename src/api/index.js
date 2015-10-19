'use strict';

import path from 'path';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './api';

hexo.extend.filter.register('server_middleware', function(app) {
  if (!hexo.config.admin) {
    return;
  }
  app.use('/admin', serveStatic(path.join(__dirname, 'www')));

  if (hexo.config.admin.cors) {
    app.use(cors({
      origin: hexo.config.admin.cors
    }));
  }
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json({
    limit: '10mb'
  }));

  app.use((req, res, next) => {
    res.status = function(code) {
      res.statusCode = code;
      return res;
    };
    res.send = function(data) {
      res.end(data);
    };
    res.json = function(data) {
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify(data));
    };
    next();
  });

  app.use('/api', api(app, hexo));
});

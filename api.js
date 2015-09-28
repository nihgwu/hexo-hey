'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _connectRoute = require('connect-route');

var _connectRoute2 = _interopRequireDefault(_connectRoute);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function router(api, hexo) {
  var Post = hexo.model('Post');
  var Tag = hexo.model('Tag');
  var Category = hexo.model('Category');

  api.post('/login', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var user = hexo.config.admin;
    if (name === user.name && password === user.password) {
      var token = _jsonwebtoken2['default'].sign(user.password, user.secret, {
        expiresInMinutes: user.expire
      });
      res.json({
        token: token
      });
    } else {
      res.status(400).send('Error name or password');
    }
  });

  api.get('/posts', function (req, res) {
    var posts = Post.sort('-date').toArray().map(function (post) {
      return {
        id: post._id,
        title: post.title,
        slug: post.slug,
        layout: post.layout,
        link: post.permalink,
        published: post.published,
        categories: post.categories.toArray().map(function (category) {
          return category.name;
        }),
        tags: post.tags.toArray().map(function (tag) {
          return tag.name;
        }),
        date: post.date
      };
    });
    res.json(posts);
  });

  api.get('/posts/:slug', function (req, res) {
    var slug = req.params.slug;
    var post = Post.findOne({
      slug: slug
    });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    post = {
      id: post._id,
      title: post.title,
      slug: post.slug,
      layout: post.layout,
      link: post.permalink,
      published: post.published,
      content: post._content,
      categories: post.categories.toArray().map(function (category) {
        return category.name;
      }),
      tags: post.tags.toArray().map(function (tag) {
        return tag.name;
      }),
      date: post.date,
      excerpt: post.excerpt
    };
    res.json(post);
  });

  api.post('/posts', function (req, res) {
    if (req.body.id) {
      var id = req.body.id;
      var _post = Post.get(id);
      if (!_post) {
        return res.status(404).send('Post not found');
      }
      _fs2['default'].unlinkSync(hexo.source_dir + _post.source);
    }
    var post = {
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
      layout: req.body.layout,
      date: req.body.date,
      categories: req.body.categories,
      tags: req.body.tags
    };
    hexo.post.create(post).then(function (data) {
      var source = data.path.slice(hexo.source_dir.length);
      hexo.source.process(source).then(function () {
        var post = Post.findOne({
          source: source
        });
        post = {
          id: post._id,
          title: post.title,
          slug: post.slug,
          layout: post.layout,
          link: post.permalink,
          published: post.published,
          content: post._content,
          categories: post.categories.toArray().map(function (category) {
            return category.name;
          }),
          tags: post.tags.toArray().map(function (tag) {
            return tag.name;
          }),
          date: post.date,
          excerpt: post.excerpt
        };
        res.json(post);
      })['catch'](function (err) {
        console.log(err);
        res.status(500).send('Failed to create post');
      });
    })['catch'](function (err) {
      console.log(err);
      res.status(500).send('Failed to create post');
    });
  });

  api['delete']('/posts/:id', function (req, res) {
    var id = req.params.id;
    var post = Post.get(id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    _fs2['default'].unlinkSync(hexo.source_dir + post.source);

    hexo.source.process().then(function () {
      res.status(200).send('Post deleted');
    })['catch'](function (err) {
      console.log(err);
      res.status(500).send('Failed to delete post');
    });
  });

  api.get('/categories', function (req, res) {
    var categories = Category.toArray().map(function (category) {
      return category.name;
    });
    res.json(categories);
  });

  api.get('/tags', function (req, res) {
    var tags = Tag.toArray().map(function (tag) {
      return tag.name;
    });
    res.json(tags);
  });

  api.get('/config', function (req, res) {
    var hexoConfigPath = hexo.config_path;
    var hexoConfig = _fs2['default'].readFileSync(hexoConfigPath, 'utf8');

    var themeConfigPath = hexo.theme_dir + '_config.yml';
    var themeConfig = _fs2['default'].readFileSync(themeConfigPath, 'utf8');
    res.json({
      hexoConfig: hexoConfig,
      themeConfig: themeConfig
    });
  });

  api.post('/config', function (req, res) {
    var hexoConfig = req.body.hexoConfig;
    var themeConfig = req.body.themeConfig;
    var themeConfigPath = hexo.theme_dir + '_config.yml';
    _fs2['default'].writeFileSync(themeConfigPath, themeConfig, 'utf8');
    res.json({
      hexoConfig: hexoConfig,
      themeConfig: themeConfig
    });
  });

  api.post('/upload', function (req, res) {
    if (!req.file || !req.file.filename) {
      res.status(400).json({
        error: 'Error while uploading file'
      });
      return;
    }
    hexo.source.process(req.file.filename).then(function () {
      process.nextTick(function () {
        res.json({
          filename: hexo.config.url + '/' + req.file.filename
        });
      });
    })['catch'](function () {
      res.status(400).json({
        error: 'Error while uploading file'
      });
    });
  });
}

exports['default'] = function (app, hexo) {

  app.use('/api', (0, _expressJwt2['default'])({
    secret: hexo.config.admin.secret
  }).unless({
    path: ['/api/login']
  }));

  var storage = _multer2['default'].diskStorage({
    destination: function destination(req, file, cb) {
      cb(null, hexo.source_dir);
    },
    filename: function filename(req, file, cb) {
      var ext = file.originalname.substring(file.originalname.lastIndexOf('.')) || '.png';
      var filename = 'images/' + Date.now() + ext;
      cb(null, filename);
    }
  });
  var upload = (0, _multer2['default'])({
    storage: storage
  });
  app.use('/api/upload', upload.single('file'));

  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send('Unauthorized');
    } else if (err) {
      return res.status(500).send('Error occured');
    }
    return next();
  });

  return (0, _connectRoute2['default'])(function (api) {
    router(api, hexo);
  });
};

module.exports = exports['default'];
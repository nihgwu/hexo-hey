'use strict';

import fs from 'fs';
import jwt from 'jsonwebtoken';
import jwtExpress from 'express-jwt';
import connectRoute from 'connect-route';
import multer from 'multer';

function router(api, hexo) {
  let Post = hexo.model('Post');
  let Tag = hexo.model('Tag');
  let Category = hexo.model('Category');

  api.post('/login', (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let user = hexo.config.admin;
    if (name === user.name && password === user.password) {
      let token = jwt.sign(user.password, user.secret, {
        expiresInMinutes: user.expire
      });
      res.json({
        token
      });
    } else {
      res.status(400).send('Error name or password');
    }
  });

  api.get('/posts', (req, res) => {
    let posts = Post.sort('-date').toArray().map(post => {
      return {
        id: post._id,
        title: post.title,
        slug: post.slug,
        layout: post.layout,
        link: post.permalink,
        published: post.published,
        categories: post.categories.toArray().map(category => category.name),
        tags: post.tags.toArray().map(tag => tag.name),
        date: post.date
      };
    });
    res.json(posts);
  });

  api.get('/posts/:slug', (req, res) => {
    let slug = req.params.slug;
    let post = Post.findOne({
      slug
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
      categories: post.categories.toArray().map(category => category.name),
      tags: post.tags.toArray().map(tag => tag.name),
      date: post.date,
      excerpt: post.excerpt
    };
    res.json(post);
  });

  api.post('/posts', (req, res) => {
    if (req.body.id) {
      let id = req.body.id;
      let post = Post.get(id);
      if (!post) {
        return res.status(404).send('Post not found');
      }
      fs.unlinkSync(hexo.source_dir + post.source);
    }
    let post = {
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
      layout: req.body.layout,
      date: req.body.date,
      categories: req.body.categories,
      tags: req.body.tags,
    };
    hexo.post.create(post).then(data => {
      let source = data.path.slice(hexo.source_dir.length);
      hexo.source.process(source).then(() => {
        process.nextTick(() => {
          let post = Post.findOne({
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
            categories: post.categories.toArray().map(category => category.name),
            tags: post.tags.toArray().map(tag => tag.name),
            date: post.date,
            excerpt: post.excerpt
          };
          res.json(post);
        });
      }).catch(err => {
        console.log(err);
        res.status(500).send('Failed to create post');
      });
    }).catch(err => {
      console.log(err);
      res.status(500).send('Failed to create post');
    });
  });

  api.delete('/posts/:id', (req, res) => {
    let id = req.params.id;
    let post = Post.get(id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    fs.unlinkSync(hexo.source_dir + post.source);

    hexo.source.process().then(() => {
      process.nextTick(() => {
        res.status(200).send('Post deleted');
      });
    }).catch(err => {
      console.log(err);
      res.status(500).send('Failed to delete post');
    });
  });

  api.get('/categories', (req, res) => {
    let categories = Category.toArray().map(category => {
      return category.name;
    });
    res.json(categories);
  });

  api.get('/tags', (req, res) => {
    let tags = Tag.toArray().map(tag => {
      return tag.name;
    });
    res.json(tags);
  });

  api.get('/config', (req, res) => {
    let hexoConfigPath = hexo.config_path;
    let hexoConfig = fs.readFileSync(hexoConfigPath, 'utf8');

    let themeConfigPath = hexo.theme_dir + '_config.yml';
    let themeConfig = fs.readFileSync(themeConfigPath, 'utf8');
    res.json({
      hexoConfig,
      themeConfig
    });
  });

  api.post('/config', (req, res) => {
    let hexoConfig = req.body.hexoConfig;
    let themeConfig = req.body.themeConfig;
    let themeConfigPath = hexo.theme_dir + '_config.yml';
    fs.writeFileSync(themeConfigPath, themeConfig, 'utf8');
    res.json({
      hexoConfig,
      themeConfig
    });
  });

  fs.stat(hexo.source_dir + 'images/', (err) => {
    if (err) {
      fs.mkdirSync(hexo.source_dir + 'images/');
    }
  });
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, hexo.source_dir);
    },
    filename: (req, file, cb) => {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.')) || '.png';
      let filename = 'images/' + Date.now() + ext;
      cb(null, filename);
    }
  });
  let upload = multer({
    storage: storage
  }).single('file');
  api.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json({
          error: 'Error while uploading file'
        });
        return;
      }
      hexo.source.process(req.file.filename).then(() => {
        process.nextTick(() => {
          res.json({
            filename: hexo.config.url + '/' + req.file.filename
          });
        });
      }).catch(() => {
        res.status(400).json({
          error: 'Error while processing file'
        });
      });
    });
  });
}

export default function(app, hexo) {

  app.use('/api', jwtExpress({
    secret: hexo.config.admin.secret
  }).unless({
    path: ['/api/login']
  }));

  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send('Unauthorized');
    } else if (err) {
      return res.status(500).send('Error occured');
    }
    return next();
  });

  return connectRoute(api => {
    router(api, hexo);
  });
}

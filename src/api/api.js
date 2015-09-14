'use strict';

import fs from 'fs';
import jwt from 'jsonwebtoken';
import jwtExpress from 'express-jwt';
import connectRoute from 'connect-route';

function router(api, hexo) {
  let Post = hexo.model('Post');
  let Tag = hexo.model('Tag');
  let Category = hexo.model('Category');

  api.post('/login', (req, res) => {
    var name = req.body.name;
    var password = req.body.password;
    var user = hexo.config.admin;
    if (name === user.name && password === user.password) {
      var token = jwt.sign(user.password, user.secret, {
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
    var post = {
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
      layout: req.body.layout,
      date: req.body.date,
      categories: req.body.categories,
      tags: req.body.tags,
    };
    hexo.post.create(post).then(data => {
      var source = data.path.slice(hexo.source_dir.length);
      hexo.source.process(source).then(() => {
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
          categories: post.categories.toArray().map(category => category.name),
          tags: post.tags.toArray().map(tag => tag.name),
          date: post.date,
          excerpt: post.excerpt
        };
        res.json(post);
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
      res.status(200).send('Post deleted');
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

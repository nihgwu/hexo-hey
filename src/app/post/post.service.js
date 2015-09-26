'use strict';

class PostService {
  /** @ngInject */
  constructor($http, $q, Config) {
    angular.extend(this, {
      $http, $q, Config
    });

    this.posts = [];
    this.categories = [];
    this.tags = [];
  }

  getPosts() {
    if (this.posts.length) {
      return this.$q.resolve(this.posts);
    }
    return this.$http.get(this.Config.APIURL + '/posts').then(res => {
      this.posts = res.data;
      return res.data;
    });
  }

  getPost(slug) {
    var post = this.posts.find(post => post.slug === slug);
    if (post && !angular.isUndefined(post.content)) {
      return this.$q.resolve(post);
    }
    return this.$http.get(this.Config.APIURL + '/posts/' + slug).then(res => {
      var post = this.posts.find(post => post.slug === slug) || {};
      return angular.extend(post, res.data);
    });
  }

  updatePost(post) {
    return this.$http.post(this.Config.APIURL + '/posts/', post).then(res => {
      this.posts = [];
      this.categories = [];
      this.tags = [];
      return res.data;
    });
  }

  deletePost(id) {
    return this.$http.delete(this.Config.APIURL + '/posts/' + id).then(res => {
      this.posts = [];
      this.categories = [];
      this.tags = [];
      return res.data;
    });
  }

  getCategories() {
    if (this.categories.length) {
      return this.$q.resolve(this.categories);
    }
    return this.$http.get(this.Config.APIURL + '/categories').then(res => {
      this.categories = res.data;
      return res.data;
    });
  }

  getTags() {
    if (this.tags.length) {
      return this.$q.resolve(this.tags);
    }
    return this.$http.get(this.Config.APIURL + '/tags').then(res => {
      this.tags = res.data;
      return res.data;
    });
  }
}

export default PostService;

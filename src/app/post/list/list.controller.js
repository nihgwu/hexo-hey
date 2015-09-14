'use strict';

class PostListCtrl {
  /** @ngInject */
  constructor($state, $mdSidenav, PostService) {
    angular.extend(this, {
      $state, $mdSidenav, PostService
    });

    PostService.getPosts().then(data => {
      this.posts = data;
      if ($state.is('post.list') && this.posts.length) {
        $state.go('post.detail', {
          slug: this.posts[0].slug
        });
      }
    });
  }

  detail(post) {
    this.$mdSidenav('postsMenu').close();
    this.$state.go('post.detail', {
      slug: post.slug
    });
  }
}

export default PostListCtrl;

'use strict';

class PostListCtrl {
  /** @ngInject */
  constructor($state, $mdSidenav, PostService) {
    angular.extend(this, {
      $state, $mdSidenav, PostService
    });

    this.searchText = '';

    PostService.getPosts().then(data => {
      this.posts = data;
      this.filteredPosts = data;
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

  search(text) {
    if (!text) {
      this.filteredPosts = this.posts;
      return;
    }
    text = text.toLowerCase();
    this.filteredPosts = this.posts.filter(post => {
      if (post.title.toLowerCase().indexOf(text) !== -1) {
        return true;
      }
      if (post.categories.filter(x => x.toLowerCase().indexOf(text) !== -1).length > 0) {
        return true;
      }
      if (post.tags.filter(x => x.toLowerCase().indexOf(text) !== -1).length > 0) {
        return true;
      }
    });
  }
}

export default PostListCtrl;

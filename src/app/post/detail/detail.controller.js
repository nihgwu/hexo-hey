'use strict';

class PostDetailCtrl {
  /** @ngInject */
  constructor($state, post) {
    angular.extend(this, {
      $state, post
    });
  }

  edit() {
    this.$state.go('post.edit', {
      slug: this.post.slug
    });
  }
}

export default PostDetailCtrl;

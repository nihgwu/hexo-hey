'use strict';

class PostDetailCtrl {
  /** @ngInject */
  constructor($state, post) {
    Object.assign(this, {
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

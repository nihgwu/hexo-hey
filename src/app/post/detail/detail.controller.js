'use strict';

class PostDetailCtrl {
  /** @ngInject */
  constructor($state, $stateParams, PostService) {
    this.$state = $state;
    this.slug = $stateParams.slug;

    PostService.getPost(this.slug).then(data => this.post = data)
      .catch(() => this.$state.go('post.list'));
  }

  edit() {
    this.$state.go('post.edit', {
      slug: this.post.slug
    });
  }
}

export default PostDetailCtrl;

'use strict';

class PostCtrl {
  /** @ngInject */
  constructor($state) {
    this.$state = $state;
  }

  create() {
    this.$state.go('post.create');
  }
}

export default PostCtrl;

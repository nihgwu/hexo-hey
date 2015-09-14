'use strict';

class PostCtrl {
  /** @ngInject */
  constructor($state) {
    this.$state = $state;
  }

  create() {
    this.$state.go('post.create');
  }

  aceLoaded(editor) {
    editor.$blockScrolling = Infinity;
    editor.getSession().setUseWorker(false);
    editor.getSession().setUseWrapMode(true);
    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
  }
}

export default PostCtrl;

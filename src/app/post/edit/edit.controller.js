'use strict';

class PostEditCtrl {
  /** @ngInject */
  constructor($window, $cookies, $timeout, $state, $stateParams, $mdSidenav, $mdDialog, $translate, Config, Toast, PostService, post) {
    Object.assign(this, {
      $window, $cookies, $timeout, $state, $stateParams, $mdSidenav, $mdDialog, $translate, Config, Toast, PostService, post
    });

    this.slug = $stateParams.slug;
    this.searchText = null;
    this.selectedItem = null;
    this.navId = 'settingsView';
    this.codemirrorLoaded = this.codemirrorLoaded.bind(this);
    this.updating = false;

    $timeout(() => {
      this.refresh = true;
    }, 0);

    PostService.getCategories().then(data => this.categories = data);
    PostService.getTags().then(data => this.tags = data);
  }

  checkUnique(form) {
    if (this.post.slug === this.slug) {
      return form.slug.$setValidity('unique', true);
    }
    this.PostService.getPosts().then(posts => {
      let post = posts.find(post => post.slug === this.post.slug);
      let unique = angular.isUndefined(post);
      if (this.post.slug === this.slug) {
        unique = true;
      }
      form.slug.$setValidity('unique', unique);
    });
  }

  update(publish) {
    if (this.updating) {
      return;
    }
    if (!this.post.title) {
      this.$translate('INPUT_TITLE').then(INPUT_TITLE => {
        this.Toast.show(INPUT_TITLE);
      });
      this.closeSettings();
      return;
    }
    this.updating = true;
    let post = Object.assign({}, this.post);
    if (angular.isUndefined(publish)) {
      post.layout = this.post.published ? 'post' : 'draft';
    } else {
      post.layout = publish ? 'post' : 'draft';
    }
    post.date = new Date(this.post.date.replace(' ', 'T'));
    this.PostService.updatePost(post).then(data => {
      this.$translate('SUCCESS_POST_UPDATE').then(SUCCESS_POST_UPDATE => {
        this.Toast.show(SUCCESS_POST_UPDATE);
      });
      this.$state.go('post.detail', {
        slug: data.slug
      });
    }).catch(() => {
      this.$translate('ERROR_POST_UPDATE').then(ERROR_POST_UPDATE => {
        this.Toast.show(ERROR_POST_UPDATE);
      });
    }).finally(() => {
      this.updating = false;
    });
  }

  cancel() {
    this.$state.go('post.list');
  }

  remove(ev) {
    this.$translate(['DELETE_POST', 'CONFIRM_DELETE_POST', 'DELETE', 'CANCEL', 'SUCCESS_POST_DELETE']).then(translations => {
      let confirm = this.$mdDialog.confirm()
        .title(translations.DELETE_POST)
        .textContent(translations.CONFIRM_DELETE_POST)
        .ariaLabel('Delete post')
        .ok(translations.DELETE)
        .cancel(translations.CANCEL)
        .targetEvent(ev);

      this.$mdDialog.show(confirm).then(() => {
        this.PostService.deletePost(this.post.id).then(() => {
          this.Toast.show(translations.SUCCESS_POST_DELETE);
          this.$state.go('post.list');
        }).catch(() => {
          this.$translate('ERROR_POST_DELETE').then(ERROR_POST_DELETE => {
            this.Toast.show(ERROR_POST_DELETE);
          });
        });
      });
    });
  }

  showSettings() {
    this.$mdSidenav(this.navId)
      .toggle()
      .then(function() {});
  }

  closeSettings() {
    this.$mdSidenav(this.navId).close();
  }

  codemirrorLoaded(editor) {
    let options = {
      uploadUrl: this.Config.APIURL + '/upload',
      progressText: '![Uploading image...]()',
      urlText: '![image]({filename})',
      extraHeaders: {
        Authorization: 'Bearer ' + this.$cookies.get('token')
      }
    };
    this.$window.inlineAttachment.editors.codemirror4.attach(editor, options);
  }
}

export default PostEditCtrl;

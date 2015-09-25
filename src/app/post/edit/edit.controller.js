'use strict';

class PostEditCtrl {
  /** @ngInject */
  constructor($mdSidenav, $mdDialog, $state, $stateParams, $filter, $translate, Toast, PostService) {
    angular.extend(this, {
      $mdSidenav, $mdDialog, $state, $stateParams, $filter, $translate, Toast, PostService
    });

    this.slug = $stateParams.slug;
    this.searchText = null;
    this.selectedItem = null;
    this.navId = 'settingsView';
    if (!this.slug) {
      this.post = {
        title: 'Untitled',
        slug: 'untitled-' + new Date().getTime(),
        date: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        tags: [],
        categories: []
      };
    } else {
      PostService.getPost(this.slug).then(data => {
          if (data.content.indexOf('\n') === 0) {
            data.content = data.content.slice(1);
          }
          data.date = $filter('date')(data.date, 'yyyy-MM-dd HH:mm:ss');
          this.post = Object.assign({}, data);
        })
        .catch(() => this.$state.go('post.list'));
    }
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
    let post = Object.assign({}, this.post);
    if (angular.isUndefined(publish)) {
      post.layout = this.post.published ? 'post' : 'draft';
    } else {
      post.layout = publish ? 'post' : 'draft';
    }
    post.date = new Date(this.post.date);
    this.PostService.updatePost(post).then(data => {
      this.$translate('SUCCESSPOSTUPDATE').then(SUCCESSPOSTUPDATE => {
        this.Toast.show(SUCCESSPOSTUPDATE);
      });
      this.$state.go('post.detail', {
        slug: data.slug
      });
    }).catch(() => {
      this.$translate('ERRORPOSTUPDATE').then(ERRORPOSTUPDATE => {
        this.Toast.show(ERRORPOSTUPDATE);
      });
    });
  }

  cancel() {
    this.$state.go('post.list');
  }

  remove(ev) {
    this.$translate(['DELETEPOST', 'CONTENTDELETEPOST', 'DELETE', 'CANCEL', 'SUCCESSPOSTDELETE']).then(translations => {
      var confirm = this.$mdDialog.confirm()
        .title(translations.DELETEPOST)
        .content(translations.CONTENTDELETEPOST)
        .ariaLabel('Delete post')
        .ok(translations.DELETE)
        .cancel(translations.CANCEL)
        .targetEvent(ev);

      this.$mdDialog.show(confirm).then(() => {
        this.PostService.deletePost(this.post.id).then(() => {
          this.Toast.show(translations.SUCCESSPOSTDELETE);
          this.$state.go('post.list');
        }).catch(() => {
          this.$translate('ERRORPOSTDELETE').then(ERRORPOSTDELETE => {
            this.Toast.show(ERRORPOSTDELETE);
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
}

export default PostEditCtrl;

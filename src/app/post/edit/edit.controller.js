'use strict';

class PostEditCtrl {
  /** @ngInject */
  constructor($mdSidenav, $mdDialog, $state, $stateParams, $filter, $translate, PostService) {
    angular.extend(this, {
      $mdSidenav, $mdDialog, $state, $stateParams, $filter, $translate, PostService
    });

    this.slug = $stateParams.slug;
    this.searchText = null;
    this.selectedItem = null;
    this.navId = 'settingsView';
    if (!this.slug) {
      this.post = {
        title: 'Untitled',
        slug: 'untitled',
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

  update(publish) {
    if (angular.isUndefined(publish)) {
      this.post.layout = this.post.published ? 'post' : 'draft';
    } else {
      this.post.layout = publish ? 'post' : 'draft';
    }
    this.post.date = new Date(this.post.date);
    this.PostService.updatePost(this.post).then(data => {
      this.$state.go('post.detail', {
        slug: data.slug
      });
    });
  }

  cancel() {
    this.$state.go('post.list');
  }

  remove(ev) {
    this.$translate(['DELETEPOST', 'CONTENTDELETEPOST', 'DELETE', 'CANCEL']).then(translations => {
      var confirm = this.$mdDialog.confirm()
        .title(translations.DELETEPOST)
        .content(translations.CONTENTDELETEPOST)
        .ariaLabel('Delete post')
        .ok(translations.DELETE)
        .cancel(translations.CANCEL)
        .targetEvent(ev);

      this.$mdDialog.show(confirm).then(() => {
        this.PostService.deletePost(this.post.id).then(() => {
          this.$state.go('post.list');
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

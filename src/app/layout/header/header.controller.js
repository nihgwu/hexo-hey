'use strict';

class HeaderCtrl {
  /** @ngInject */
  constructor($state, $mdSidenav, AuthService) {
    angular.extend(this, {
      $state, $mdSidenav, AuthService
    });
  }

  logout() {
    this.AuthService.logout();
  }

  openSidebar() {
    if (this.$state.is('post.edit')) {
      return this.$state.go('post.detail', {
        id: this.$state.params.id
      });
    } else if (this.$state.is('post.create') || this.$state.is('settings')) {
      return this.$state.go('post.list');
    }
    return this.$mdSidenav('postsMenu').toggle();
  }
}

export default HeaderCtrl;

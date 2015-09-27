'use strict';

class HeaderCtrl {
  /** @ngInject */
  constructor($state, $mdSidenav, $window, $translate, amMoment, AuthService) {
    Object.assign(this, {
      $state, $mdSidenav, $window, $translate, amMoment, AuthService
    });

    this.languages = [{
      key: 'en-GB',
      value: 'EN'
    }, {
      key: 'zh-CN',
      value: '中'
    }];
  }

  selectLanguage(language) {
    this.$translate.use(language);
    this.amMoment.changeLocale(language);
    this.$window.localStorage.language = language;
  }

  logout() {
    this.AuthService.logout();
  }

  openSidebar() {
    if (this.$state.is('post.edit')) {
      return this.$state.go('post.detail', {
        slug: this.$state.params.slug
      });
    } else if (this.$state.is('post.create') || this.$state.is('settings')) {
      return this.$state.go('post.list');
    }
    return this.$mdSidenav('postsMenu').toggle();
  }
}

export default HeaderCtrl;

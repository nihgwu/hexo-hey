'use strict';

class LoginCtrl {
  /** @ngInject */
  constructor($state, $mdToast, AuthService) {
    angular.extend(this, {
      $state, $mdToast, AuthService
    });
    this.user = {};
  }

  login() {
    this.AuthService.login(this.user).then(() => {
      this.$state.go('post.list');
    }).catch(err => {
      this.$mdToast.show(
        this.$mdToast.simple()
        .content(err)
        .hideDelay(3000)
      );
    });
  }
}

export default LoginCtrl;

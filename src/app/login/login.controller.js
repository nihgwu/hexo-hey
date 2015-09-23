'use strict';

class LoginCtrl {
  /** @ngInject */
  constructor($state, Toast, AuthService) {
    angular.extend(this, {
      $state, Toast, AuthService
    });
    this.user = {};
  }

  login() {
    this.AuthService.login(this.user).then(() => {
      this.$state.go('post.list');
    }).catch(err => this.Toast.show(err));
  }
}

export default LoginCtrl;

'use strict';

class LoginCtrl {
  /** @ngInject */
  constructor($state, $translate, Toast, AuthService) {
    Object.assign(this, {
      $state, $translate, Toast, AuthService
    });
    this.user = {};
  }

  login() {
    this.AuthService.login(this.user).then(() => {
      this.$state.go('post.list');
    }).catch(() => {
      this.$translate('ERROR_USER').then(ERROR_USER => {
        this.Toast.show(ERROR_USER);
      });
    });
  }
}

export default LoginCtrl;

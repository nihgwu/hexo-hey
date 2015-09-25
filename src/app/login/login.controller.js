'use strict';

class LoginCtrl {
  /** @ngInject */
  constructor($state, $translate, Toast, AuthService) {
    angular.extend(this, {
      $state, $translate, Toast, AuthService
    });
    this.user = {};
  }

  login() {
    this.AuthService.login(this.user).then(() => {
      this.$state.go('post.list');
    }).catch(() => {
      this.$translate('ERRORUSER').then(ERRORUSER => {
        this.Toast.show(ERRORUSER);
      });
    });
  }
}

export default LoginCtrl;

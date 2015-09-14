'use strict';

import LoginCtrl from './login.controller';

let LoginModule = angular
  .module('hey.login', [])
  .controller('LoginCtrl', LoginCtrl)

.config(($stateProvider) => {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'vm',
      noAuth: true
    });
});

export default LoginModule;

'use strict';

import AuthService from './auth.service';
import AuthInterceptor from './authinterceptor.service';

let AuthModule = angular
  .module('hey.auth', [])
  .service('AuthService', AuthService)
  .factory('AuthInterceptor', AuthInterceptor.Factory);

export default AuthModule;

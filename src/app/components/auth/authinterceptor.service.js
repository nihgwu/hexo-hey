'use strict';
let that;
class AuthInterceptor {
  constructor($q, $cookies, $location, $timeout) {
    angular.extend(this, {
      $q, $cookies, $location, $timeout
    });
    that = this;
  }

  request(config) {
    config.headers = config.headers || {};
    if (that.$cookies.get('token')) {
      config.headers.Authorization = 'Bearer ' + that.$cookies.get('token');
    }
    return config;
  }

  responseError(response) {
    if (response.status === 401) {
      // remove any stale tokens
      that.$cookies.remove('token');

      // use timeout to perform location change
      // in the next digest cycle
      that.$timeout(function() {
        that.$location.path('/login');
      }, 0);

      return that.$q.reject(response);
    }
    return that.$q.reject(response);
  }

  /** @ngInject */
  static Factory($q, $cookies, $location, $timeout) {
    return new AuthInterceptor($q, $cookies, $location, $timeout);
  }
}

export default AuthInterceptor;

'use strict';

class AuthService {
  /** @ngInject */
  constructor($state, $http, $q, $cookies, Config) {
    angular.extend(this, {
      $state, $http, $q, $cookies, Config
    });
  }

  get isLogin() {
    return !angular.isUndefined(this.$cookies.get('token'));
  }

  login(user) {
    var deferred = this.$q.defer();
    this.$http.post(this.Config.APIURL + '/login', {
      name: user.name,
      password: user.password
    }).success(data => {
      this.$cookies.put('token', data.token);
      deferred.resolve(data);
    }).error(err => {
      this.logout();
      deferred.reject(err);
    });
    return deferred.promise;
  }

  logout() {
    this.$cookies.remove('token');
    this.$state.go('login');
  }
}

export default AuthService;

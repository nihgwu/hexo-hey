'use strict';

class AuthService {
  /** @ngInject */
  constructor($state, $http, $q, $cookies, Config) {
    Object.assign(this, {
      $state, $http, $q, $cookies, Config
    });
  }

  get isLogin() {
    return !angular.isUndefined(this.$cookies.get('token'));
  }

  login(user) {
    let q = this.$q.defer();
    this.$http.post(this.Config.APIURL + '/login', {
      name: user.name,
      password: user.password
    }).success(data => {
      this.$cookies.put('token', data.token);
      q.resolve(data);
    }).error(err => {
      this.logout();
      q.reject(err);
    });
    return q.promise;
  }

  logout() {
    this.$cookies.remove('token');
    this.$state.go('login');
  }
}

export default AuthService;

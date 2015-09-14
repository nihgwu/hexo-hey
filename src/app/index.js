'use strict';

import AuthModule from './components/auth/auth';
import LoginModule from './login/login';
import SettingsModule from './settings/settings';
import PostModule from './post/post';

angular
  .module('hey', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngSanitize',
    'ngMaterial',
    'ui.router',
    'hc.marked',
    'ui.ace',
    'angularMoment',
    AuthModule.name,
    LoginModule.name,
    SettingsModule.name,
    PostModule.name
  ])

.run(($rootScope, $location, $timeout, $mdMedia, AuthService) => {
  $rootScope.$mdMedia = $mdMedia;

  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function(event, next) {
    if (next.noAuth) {
      return;
    }

    if (!AuthService.isLogin) {
      event.preventDefault();
      $timeout(function() {
        $location.path('/login');
      }, 0);
    }
  });
})

.constant('Config', {
  APIURL: 'http://localhost:4000/api'
})

.config(($mdThemingProvider) => {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue')
    .accentPalette('orange')
    .warnPalette('deep-orange');
})

.config(($mdIconProvider) => {
  let icons = ['logo', 'code', 'pound', 'gear-a', 'plus', 'log-out', 'edit', 'eye', 'eye-disabled', 'more', 'close', 'checkmark'];
  icons.forEach(icon => {
    $mdIconProvider.icon(icon, `assets/icons/${icon}.svg`);
  });
})

.config((markedProvider) => {
  markedProvider.setOptions({
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true
  });
})

.config(($urlMatcherFactoryProvider, $locationProvider, $httpProvider, $urlRouterProvider) => {
  //$httpProvider.defaults.withCredentials = true;
  //$urlMatcherFactoryProvider.strictMode(false);
  //$locationProvider.html5Mode(true);

  $httpProvider.interceptors.push('AuthInterceptor');

  $urlRouterProvider.otherwise('/posts');
});

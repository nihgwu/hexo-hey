'use strict';

import AuthModule from './components/auth/auth';
import ToastModule from './components/toast/toast';
import LoginModule from './login/login';
import SettingsModule from './settings/settings';
import PostModule from './post/post';

import ThemeConfig from './config/theme.config';
import IconConfig from './config/icon.config';
import MarkdownConfig from './config/markdown.config';
import TranslateConfig from './config/translate.config';

angular
  .module('hey', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngSanitize',
    'ngMaterial',
    'ui.router',
    'hc.marked',
    'ui.codemirror',
    'angularMoment',
    'pascalprecht.translate',

    AuthModule.name,
    ToastModule.name,
    LoginModule.name,
    SettingsModule.name,
    PostModule.name
  ])

.run(($rootScope, $location, $timeout, $window, $mdMedia, $translate, AuthService, amMoment) => {
  $rootScope.$mdMedia = $mdMedia;

  let language = $window.localStorage.language || $window.navigator.language;
  $translate.use(language);
  amMoment.changeLocale(language);

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
  $rootScope.$on('$routeChangeError', function(arg1, arg2, arg3, arg4) {
    if (arg4.status === 404) {
      $timeout(function() {
        $location.path('/posts');
      }, 0);
    }
  });
})

.constant('Config', {
  APIURL: '/api'
})

.config(ThemeConfig)

.config(IconConfig)

.config(MarkdownConfig)

.config(TranslateConfig)

.config(($urlMatcherFactoryProvider, $locationProvider, $httpProvider, $urlRouterProvider) => {
  //$httpProvider.defaults.withCredentials = true;
  //$urlMatcherFactoryProvider.strictMode(false);
  //$locationProvider.html5Mode(true);

  $httpProvider.interceptors.push('AuthInterceptor');

  //$urlRouterProvider.otherwise('/posts');
  $urlRouterProvider.otherwise($injector => {
    let $state = $injector.get('$state');
    $state.go('post.list');
  });
});

'use strict';

import AuthModule from './components/auth/auth';
import ToastModule from './components/toast/toast';
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
    'pascalprecht.translate',

    AuthModule.name,
    ToastModule.name,
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
  APIURL: '/api'
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

.config(($translateProvider) => {
  $translateProvider.translations('en', {
    'USERNAME': 'Username',
    'PASSWORD': 'Password',
    'LOGIN': 'Login',
    'LOGOUT': 'Logout',
    'POSTS': 'Posts',
    'SETTINGS': 'Settings',
    'NEWPOST': 'New post',
    'THEMECONFIG': 'Theme config',
    'HEXOCONFIG': 'Hexo config',
    'POSTSETTINGS': 'Post settings',
    'SLUG': 'Slug',
    'DATE': 'Date',
    'CATEGORY': 'Category',
    'TAG': 'Tag',
    'UPDATE': 'Update',
    'PUBLISH': 'Publish',
    'UNPUBLISH': 'Unpublish',
    'SAVEDRAFT': 'Save draft',
    'CANCEL': 'Cancel',
    'DELETE': 'Delete',
    'DELETEPOST': 'Delete post',

    'PUBLISHED': 'Publised at',
    'DRAFT': 'Draft',

    'INPUTUSERNAME': 'Please input the username',
    'INPUTPASSWORD': 'Please input the password',
    'INPUTSLUG': 'Please input the slug',
    'INPUTSLUGEXIST': 'Slug already exists',
    'INPUTDATE': 'Should be in yyyy-MM-dd( HH:mm:ss) format',
    'INPUTSEARCH': 'Filter by title, category or tag',

    'CONTENTDELETEPOST': 'Do you really want to delete this post?',

    'SUCCESSTHEMECONFIGUPDATE': 'Theme config updated',
    'SUCCESSPOSTDELETE': 'Post deleted',
    'SUCCESSPOSTUPDATE': 'Post updated',

    'ERRORUSER': 'Error username or password',
    'ERRORTHEMECONFIGUPDATE': 'Theme config update error',
    'ERRORPOSTUPDATE': 'Update post error',
    'ERRORPOSTDELETE': 'Delete post error'
  });

  $translateProvider.translations('zh-CN', {
    'USERNAME': '用户名',
    'PASSWORD': '密码',
    'LOGIN': '登录',
    'LOGOUT': '退出',
    'POSTS': '文章',
    'SETTINGS': '设置',
    'NEWPOST': '新建',
    'THEMECONFIG': '主题设置',
    'HEXOCONFIG': '博客设置',
    'POSTSETTINGS': '文章设置',
    'SLUG': '别名',
    'DATE': '时间',
    'CATEGORY': '分类',
    'TAG': '标签',
    'UPDATE': '更新',
    'PUBLISH': '发布',
    'UNPUBLISH': '取消发布',
    'SAVEDRAFT': '存草稿',
    'CANCEL': '取消',
    'DELETE': '删除',
    'DELETEPOST': '删除文章',

    'PUBLISHED': '发布于',
    'DRAFT': '草稿',

    'INPUTUSERNAME': '请输入用户名',
    'INPUTPASSWORD': '请输入密码',
    'INPUTSLUG': '请输入别名',
    'INPUTSLUGEXIST': '别名已存在',
    'INPUTDATE': '时间格式 yyyy-MM-dd( HH:mm:ss)',
    'INPUTSEARCH': '根据标题、分类或标签过滤',

    'CONTENTDELETEPOST': '确定删除这篇文章？',

    'SUCCESSTHEMECONFIGUPDATE': '主题设置更新成功',
    'SUCCESSPOSTDELETE': '文章删除成功',
    'SUCCESSPOSTUPDATE': '文章更新成功',

    'ERRORUSER': '用户名或密码错误',
    'ERRORTHEMECONFIGUPDATE': '主题设置更新失败',
    'ERRORPOSTUPDATE': '更新文章失败',
    'ERRORPOSTDELETE': '删除文章失败'
  });

  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.fallbackLanguage('en');
  $translateProvider.determinePreferredLanguage();
})

.config(($urlMatcherFactoryProvider, $locationProvider, $httpProvider, $urlRouterProvider) => {
  //$httpProvider.defaults.withCredentials = true;
  //$urlMatcherFactoryProvider.strictMode(false);
  //$locationProvider.html5Mode(true);

  $httpProvider.interceptors.push('AuthInterceptor');

  //$urlRouterProvider.otherwise('/posts');
  $urlRouterProvider.otherwise($injector => {
    var $state = $injector.get('$state');
    $state.go('post.list');
  });
});

'use strict';

import PostListCtrl from './list.controller';

let PostListModule = angular
  .module('hey.post.list', [
    'ui.router'
  ])
  .controller('PostListCtrl', PostListCtrl)

.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('post.list', {
      url: '',
      parent: 'post',
      templateUrl: 'app/post/list/list.html',
      controller: 'PostListCtrl',
      controllerAs: 'list'
    });

  $urlRouterProvider.when('/posts/', '/posts');
});

export default PostListModule;

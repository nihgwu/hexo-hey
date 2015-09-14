'use strict';

import LayoutModule from '../layout/layout';
import PostListModule from './list/list';
import PostDetailModule from './detail/detail';
import PostEditModule from './edit/edit';
import PostCtrl from './post.controller';
import PostService from './post.service';

let PostModule = angular
  .module('hey.post', [
    'ui.router',
    LayoutModule.name,
    PostListModule.name,
    PostDetailModule.name,
    PostEditModule.name
  ])
  .controller('PostCtrl', PostCtrl)
  .service('PostService', PostService)

.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('post', {
      url: '/posts',
      parent: 'root',
      abstract: true,
      templateUrl: 'app/post/post.html',
      controller: 'PostCtrl',
      controllerAs: 'post'
    });

  $urlRouterProvider.when('/posts/', '/posts');
});

export default PostModule;

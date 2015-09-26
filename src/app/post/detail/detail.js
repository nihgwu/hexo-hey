'use strict';

import PostDetailCtrl from './detail.controller';

let PostDetailModule = angular
  .module('hey.post.detail', [])
  .controller('PostDetailCtrl', PostDetailCtrl)

.config(($stateProvider) => {
  $stateProvider
    .state('post.detail', {
      url: '/:slug',
      parent: 'post.list',
      templateUrl: 'app/post/detail/detail.html',
      controller: 'PostDetailCtrl',
      controllerAs: 'detail',
      resolve: {
        post: ($stateParams, PostService) => {
          return PostService.getPost($stateParams.slug)
        }
      }
    });
});

export default PostDetailModule;

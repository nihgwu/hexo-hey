'use strict';

import PostEditCtrl from './edit.controller';

let PostEditModule = angular
  .module('hey.post.edit', [])
  .controller('PostEditCtrl', PostEditCtrl)

.config(($stateProvider) => {
  $stateProvider
    .state('post.create', {
      url: '/create/new',
      parent: 'post',
      templateUrl: 'app/post/edit/edit.html',
      controller: 'PostEditCtrl',
      controllerAs: 'vm'
    })
    .state('post.edit', {
      url: '/:slug/edit',
      parent: 'post',
      templateUrl: 'app/post/edit/edit.html',
      controller: 'PostEditCtrl',
      controllerAs: 'vm'
    });
});

export default PostEditModule;

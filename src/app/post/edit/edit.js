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
      controllerAs: 'vm',
      resolve: {
        post: ($filter) => {
          return {
            title: 'Untitled',
            slug: 'untitled-' + Date.now(),
            date: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            tags: [],
            categories: []
          };
        }
      }
    })
    .state('post.edit', {
      url: '/:slug/edit',
      parent: 'post',
      templateUrl: 'app/post/edit/edit.html',
      controller: 'PostEditCtrl',
      controllerAs: 'vm',
      resolve: {
        post: ($q, $stateParams, $filter, PostService) => {
          let q = $q.defer();
          PostService.getPost($stateParams.slug).then(data => {
            let post = Object.assign({}, data);
            if (post.content.startsWith('\n')) {
              post.content = post.content.slice(1);
            }
            post.date = $filter('date')(post.date, 'yyyy-MM-dd HH:mm:ss');
            q.resolve(post);
          }).catch(() => q.reject());
          return q.promise;
        }
      }
    });
});

export default PostEditModule;

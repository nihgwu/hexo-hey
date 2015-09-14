'use strict';

import AuthModule from '../components/auth/auth';
import HeaderCtrl from './header/header.controller';

let layoutModule = angular
  .module('hey.layout', [
    'ui.router',
    AuthModule.name
  ])
  .controller('HeaderCtrl', HeaderCtrl)
  .config(($stateProvider) => {
    $stateProvider.state({
      name: 'root',
      url: '',
      abstract: true,
      views: {
        '': {
          templateUrl: 'app/layout/layout.html',
        },
        'header@root': {
          templateUrl: 'app/layout/header/header.html',
          controller: 'HeaderCtrl',
          controllerAs: 'header'
        }
      }
    });
  });

export default layoutModule;

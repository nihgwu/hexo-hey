'use strict';

import SettingsCtrl from './settings.controller';
import SettingsService from './settings.service';

let SettingsModule = angular
  .module('hey.settings', [])
  .controller('SettingsCtrl', SettingsCtrl)
  .service('SettingsService', SettingsService)

.config(($stateProvider) => {
  $stateProvider
    .state('settings', {
      url: '/settings',
      parent: 'root',
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsCtrl',
      controllerAs: 'vm',
      resolve: {
        config: ($q, SettingsService) => {
          let q = $q.defer();
          SettingsService.getConfig().then(data => {
            let config = Object.assign({}, data);
            q.resolve(config);
          }).catch(() => q.reject());
          return q.promise;
        }
      }
    });
});

export default SettingsModule;

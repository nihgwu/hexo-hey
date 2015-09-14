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
      controllerAs: 'vm'
    });
});

export default SettingsModule;

'use strict';

class SettingsCtrl {
  /** @ngInject */
  constructor($timeout, $state, $translate, Toast, SettingsService, config) {
    Object.assign(this, {
      $timeout, $state, $translate, Toast, SettingsService, config
    });

    this.$timeout(() => {
      this.refresh = true;
    }, 0);
  }

  updateConfig() {
    this.SettingsService.updateConfig(this.config).then(() => {
      this.$translate('SUCCESSTHEMECONFIGUPDATE').then(SUCCESSTHEMECONFIGUPDATE => {
        this.Toast.show(SUCCESSTHEMECONFIGUPDATE);
      });
    }).catch(() => {
      this.$translate('ERRORTHEMECONFIGUPDATE').then(ERRORTHEMECONFIGUPDATE => {
        this.Toast.show(ERRORTHEMECONFIGUPDATE);
      });
    });
  }
}

export default SettingsCtrl;

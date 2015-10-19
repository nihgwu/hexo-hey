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
      this.$translate('SUCCESS_THEME_CONFIG_UPDATE').then(SUCCESS_THEME_CONFIG_UPDATE => {
        this.Toast.show(SUCCESS_THEME_CONFIG_UPDATE);
      });
    }).catch(() => {
      this.$translate('ERROR_THEME_CONFIG_UPDATE').then(ERROR_THEME_CONFIG_UPDATE => {
        this.Toast.show(ERROR_THEME_CONFIG_UPDATE);
      });
    });
  }
}

export default SettingsCtrl;

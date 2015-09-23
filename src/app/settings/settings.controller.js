'use strict';

class SettingsCtrl {
  /** @ngInject */
  constructor($state, $mdToast, $translate, Toast, SettingsService) {
    angular.extend(this, {
      $state, $mdToast, $translate, Toast, SettingsService
    });

    SettingsService.getConfig().then(data => {
      this.config = angular.extend({}, data);
    });
  }

  updateConfig() {
    this.SettingsService.updateConfig(this.config).then(() => {
      this.$translate('SUCCESSTHEMECONFIGUPDATE').then(SUCCESSTHEMECONFIGUPDATE => {
        this.Toast.show(SUCCESSTHEMECONFIGUPDATE);
      });
    });
  }

  themeConfigLoaded(editor) {
    editor.$blockScrolling = Infinity;
    editor.getSession().setUseWorker(false);
    editor.getSession().setUseWrapMode(true);
    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
  }

  hexoConfigLoaded(editor) {
    editor.$blockScrolling = Infinity;
    editor.getSession().setUseWorker(false);
    editor.getSession().setUseWrapMode(true);
    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
    editor.setReadOnly(true);
  }
}

export default SettingsCtrl;

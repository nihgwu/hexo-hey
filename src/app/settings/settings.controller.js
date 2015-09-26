'use strict';

class SettingsCtrl {
  /** @ngInject */
  constructor($timeout, $state, $translate, Toast, SettingsService, config) {
    angular.extend(this, {
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

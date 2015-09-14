'use strict';

class SettingsCtrl {
  /** @ngInject */
  constructor($state, $mdToast, SettingsService) {
    angular.extend(this, {
      $state, $mdToast, SettingsService
    });

    SettingsService.getConfig().then(data => {
      this.config = angular.extend({}, data);
    });
  }

  updateConfig() {
    this.SettingsService.updateConfig(this.config).then(() => {
      this.$mdToast.show(
        this.$mdToast.simple()
        .content('Theme config updated')
        .hideDelay(3000)
      );
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

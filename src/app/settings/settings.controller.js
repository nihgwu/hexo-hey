'use strict';

class SettingsCtrl {
  /** @ngInject */
  constructor($state, $mdToast, $translate, SettingsService) {
    angular.extend(this, {
      $state, $mdToast, $translate, SettingsService
    });

    SettingsService.getConfig().then(data => {
      this.config = angular.extend({}, data);
    });
  }

  updateConfig() {
    this.SettingsService.updateConfig(this.config).then(() => {
      this.$translate('CONTENTTHEMECONFIGUPDATE').then(CONTENTTHEMECONFIGUPDATE => {
        this.$mdToast.show(
          this.$mdToast.simple()
          .content(CONTENTTHEMECONFIGUPDATE)
          .hideDelay(3000)
        );
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

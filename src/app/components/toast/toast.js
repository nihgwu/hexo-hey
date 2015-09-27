'use strict';

class Toast {
  /** @ngInject */
  constructor($mdToast) {
    Object.assign(this, {
      $mdToast
    });
  }

  show(content) {
    return this.$mdToast.show(
      this.$mdToast.simple()
      .content(content)
      .hideDelay(2000)
    );
  }

  hide() {
    this.$mdToast.hide();
  }
}

let ToastModule = angular
  .module('hey.toast', [])
  .service('Toast', Toast);

export default ToastModule;

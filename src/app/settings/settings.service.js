'use strict';

class SettingsService {
  /** @ngInject */
  constructor($http, $q, Config) {
    Object.assign(this, {
      $http, $q, Config
    });
    this.config = {};
  }
  getConfig() {
    if (this.config.hexoConfig) {
      return this.$q.resolve(this.config);
    }
    return this.$http.get(this.Config.APIURL + '/config').then(res => {
      this.config = res.data;
      return res.data;
    });
  }

  updateConfig(config) {
    return this.$http.post(this.Config.APIURL + '/config', config).then(res => {
      this.config = res.data;
      return res.data;
    });
  }
}

export default SettingsService;

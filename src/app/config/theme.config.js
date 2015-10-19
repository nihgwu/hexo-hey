'use strict';

/** @ngInject */
function ThemeConfig($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue')
    .accentPalette('orange')
    .warnPalette('deep-orange');
}

export default ThemeConfig;

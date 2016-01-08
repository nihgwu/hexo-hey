'use strict';

/** @ngInject */
function IconConfig($mdIconProvider) {
  let icons = ['logo', 'code', 'pound', 'gear-a', 'plus', 'log-out', 'edit', 'eye', 'eye-disabled', 'more', 'close', 'checkmark', 'shuffle', 'flag'];
  icons.forEach(icon => {
    $mdIconProvider.icon(icon, `assets/icons/${icon}.svg`);
  });
}

export default IconConfig;

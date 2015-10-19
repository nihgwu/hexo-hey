'use strict';

/** @ngInject */
function MarkdownConfig(markedProvider) {
  markedProvider.setOptions({
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true
  });
}

export default MarkdownConfig;

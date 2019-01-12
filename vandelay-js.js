const path = require('path');

module.exports = {
  includePaths: [path.join(__dirname, 'src')],
  excludePatterns: [
    "**/*.test.*",
    /.*\/fonts\/.*/,
    /.*\/registerServiceWorker.js/,
  ],
  importGroups: ['constants', 'utils', 'services', 'components'],
  trailingComma: true,
  multilineImportStyle: 'single',
  maxImportLineLength: 121,
};

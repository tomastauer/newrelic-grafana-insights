const path = require('path');

module.exports.getWebpackConfig = config => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      '@src': path.resolve(__dirname, './src/'),
      '@app': path.resolve(__dirname, './src/app/'),
      '@domain': path.resolve(__dirname, './src/domain/'),
    },
  },
});

const path = require('path');

module.exports = {
  server: {
    command: path.join(__dirname, '../node_modules/.bin/nodemon'),
    options: [
      require.resolve('konstructor/app'),
      '--watch', 'app',
      '--quiet',
    ],
    environment: {
    },
  },
  assets: {
    command: path.join(__dirname, '../node_modules/.bin/webpack'),
    options: [
      '--watch',
      '--colors',
      '--hide-modules',
      `--config=${path.join(__dirname, '../node_modules/laravel-mix/setup/webpack.config.js')}`,
    ],
    environment: {
    },
  },
  keys: ['<%= developmentSecretKeyBase %>'],
  liveReload: true,
};

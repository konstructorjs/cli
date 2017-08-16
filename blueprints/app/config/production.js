const path = require('path');

module.exports = {
  server: {
    command: 'node',
    options: [
      require.resolve('konstructor/app'),
    ],
    environment: {
    },
  },
  assets: {
    command: path.join(__dirname, '../node_modules/.bin/webpack'),
    options: [
      '-p',
      `--config=${path.join(__dirname, '../node_modules/laravel-mix/setup/webpack.config.js')}`,
    ],
    environment: {
    },
  },
  keys: [process.env.SECRET_KEY_BASE],
};

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
    command: path.join(__dirname, '../node_modules/.bin/brunch'),
    options: [
      'build',
      '--production',
    ],
    environment: {
    },
  },
  keys: [process.env.SECRET_KEY_BASE],
};

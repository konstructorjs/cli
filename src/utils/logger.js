const chalk = require('chalk');

module.exports = {
  logBase(message) {
    console.log();
    console.log(`> ${message}`);
  },

  logChild(message) {
    console.log(`  ${message}`);
  },

  logError(message) {
    console.log(chalk.red(`${message}`.toUpperCase()));
  },
};

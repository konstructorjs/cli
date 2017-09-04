
const chalk = require('chalk');
const uuidV4 = require('uuid/v4');

const secret = async () => {
  const key = uuidV4();
  console.log();
  console.log(key);
  console.log();
};

module.exports.command = 'secret';
module.exports.desc = 'generate a secret key';

module.exports.handler = () => {
  secret().catch((err) => {
    console.log(chalk.red(err));
  });
};

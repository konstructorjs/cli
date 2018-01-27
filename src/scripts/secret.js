const uuidV4 = require('uuid/v4');
const { logBase, logChild, logError } = require('../utils/logger');

const secret = async () => {
  logBase('generating key');
  const key = uuidV4();
  logChild('key generated');
  logChild(key);
  console.log();
};

module.exports.command = 'secret';
module.exports.desc = 'generate a secret key';

module.exports.handler = () => {
  secret().catch((err) => {
    logError(`${err}`);
    console.log();
    process.exit(1);
  });
};

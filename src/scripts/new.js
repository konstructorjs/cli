const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const kopy = require('kopy');
const uuidV4 = require('uuid/v4');

const { logBase, logChild, logError } = require('../utils/logger');

const create = async (args) => {
  const rawName = args.name;
  const name = rawName.replace(/[^0-9a-z-]/gi, '');
  const underscoredName = name.replace(/-/g, '_');

  const currentDirectory = process.cwd();
  const futurePath = path.join(currentDirectory, name);

  if (fs.existsSync(futurePath)) {
    const moveOldFolder = await inquirer.prompt({
      type: 'confirm',
      name: 'move',
      message: `folder ${name} exists. would you like us the move it to backup folder?`,
      default: false,
    });

    if (moveOldFolder.move) {
      const backup = path.join(currentDirectory, `${name}_backup`);
      if (fs.existsSync(backup)) {
        throw new Error(`folder ${name}_backup already exists.`);
      } else {
        fs.renameSync(futurePath, backup);
      }
    } else {
      throw new Error('folder exists. please remove it and try again.');
    }
  }

  try {
    fs.mkdirSync(futurePath);
  } catch (err) {
    throw new Error('unable to create folder.');
  }

  logBase('generating project');

  const developmentSecretKeyBase = uuidV4();
  const files = await kopy(path.join(__dirname, '../../blueprints/app'), name, {
    data: {
      rawName,
      name,
      underscoredName,
      developmentSecretKeyBase,
    },
  });

  const greenCreate = chalk.green('[create]');
  files.fileList.forEach((file) => {
    if (file === '..gitignore') {
      fs.renameSync(path.join(name, file), path.join(name, '.gitignore'));
      logChild(`${greenCreate} .gitignore`);
    } else {
      logChild(`${greenCreate} ${file}`);
    }
  });

  const greenRun = chalk.green('[run]');
  const greenVisit = chalk.green('[visit]');

  logBase('getting started');
  logChild(`${greenRun} cd ${name}`);
  logChild(`${greenRun} npm install`);
  logChild(`${greenRun} npm run dev`);
  logChild(`${greenVisit} http://localhost:3000`);

  console.log();
  process.exit(0);
};

module.exports.command = 'new <name>';
module.exports.desc = 'generate a new konstructor project';
module.exports.builder = {
  name: {
    describe: 'the name of the project. must be one word and should not start with a number',
  },
};
module.exports.handler = (args) => {
  create(args).catch((err) => {
    logError(`${err}`);
    console.log();
    process.exit(1);
  });
};

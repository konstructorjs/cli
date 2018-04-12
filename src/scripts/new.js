/* eslint-disable no-restricted-syntax, no-await-in-loop, no-restricted-syntax */
const chalk = require('chalk');
const git = require('nodegit');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const util = require('util');
const ejs = require('ejs');
const glob = require('glob');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const { logBase, logChild, logError } = require('../utils/logger');

const rmdir = dir => new Promise((resolve, reject) => {
  rimraf(dir, (err) => {
    if (err) {
      return reject(err);
    }
    return resolve();
  });
});

const getFiles = dir => new Promise((resolve, reject) => {
  glob(path.join(dir, '**/*.*'), { dot: true }, (err, files) => {
    if (err) {
      return reject(err);
    }
    return resolve(files);
  });
});

const create = async (args) => {
  const rawName = args.name;
  const name = rawName.replace(/[^0-9a-z-]/gi, '');

  console.log(chalk.bold.underline('konstructor cli'));
  console.log(`node ${chalk.bold(process.version)}`);

  const currentDirectory = process.cwd();
  const futurePath = path.join(currentDirectory, name);

  if (fs.existsSync(futurePath)) {
    throw new Error('folder exists. please remove it and try again.');
  }

  try {
    fs.mkdirSync(futurePath);
  } catch (err) {
    throw new Error('unable to create folder.');
  }

  logBase('cloning project');
  await git.Clone('https://github.com/konstructorjs/template', futurePath);
  await rmdir(path.join(futurePath, './.git'));
  const files = await getFiles(futurePath);

  const greenCreate = chalk.green('[create]');

  for (const file of files) {
    logChild(`${greenCreate} ${path.relative(futurePath, file)}`);
    const data = await readFile(file);
    const output = ejs.render(data.toString(), {
      name,
    });
    await writeFile(file, output);
  }

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
    logError(`${err.stack}`);
    console.log();
    process.exit(1);
  });
};

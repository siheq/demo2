'use strict';

const config = require('../config');
const chalk = require('chalk');
const mongoose = require('mongoose');

let loadModels = function () {
  require('../model/demo.model');
};

async function connect () {
  loadModels();
  let url;
  if (config.db.options.user) {
    url = `mongodb://${config.db.options.user}:${config.db.options.pass}@${config.db.uri}`;
  }
  else {
    url = `mongodb://${config.db.uri}`;
  }
  console.log(`connect iot mongodb url ${url}`);
  let db = await mongoose.connect(url).catch(error => {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(error);
  });
  // Enabling mongoose debug mode if required
  mongoose.set('debug', !!config.db.debug);
  return db;
}

async function disconnect (cb) {
  await mongoose.disconnect().catch(error => {
    console.log(error);
    console.info(chalk.red('Can not disconnected from MongoDB!'));
  });
  console.info(chalk.yellow('Disconnected from MongoDB.'));
}

module.exports = {
  connect,
  disconnect,
};

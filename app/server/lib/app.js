'use strict';

const config = require('../config');
const mongoose = require('./mongoose');
const express = require('./express');
const chalk = require('chalk');
const graceful = require('graceful');

let server = null;

async function init () {
  const db = await mongoose.connect();
  return express.init(db);
};

async function start () {
  let app = await init();
  let serverUrl = `${process.env.NODE_ENV === 'secure' ? 'https://' : 'http://'}` + `${config.host}:${config.port}`;
  let packageInfo = require('../package.json');
  server = app.listen(config.port, () => {
    console.log(chalk.green(`APP name:         ${packageInfo.name}`));
    console.log(chalk.green(`APP version:      ${packageInfo.version}`));
    console.log(chalk.green(`Environment:      ${process.env.NODE_ENV}`));
    console.log(chalk.green(`Server:           ${serverUrl}`));
    console.log(chalk.green(`default Database:         ${config.db.uri}`));
    console.log(chalk.green(`Server started successfully!`));
  });

  // listen terminal signal and handle it .e.g. kill
  process.on('SIGTERM', gracefulShutdown);
  // listen INT signal  and handle it. e.g. Ctrl-C
  process.on('SIGINT', gracefulShutdown);
  graceful({
    servers: [app],
    error: function (err, throwErrorCount) {
      console.error('Graceful catch onuncaughtException: %d times, log error here, and system will be shutdown by Graceful, error is: %s ', throwErrorCount, err.stack);
    },
    killTimeout: '30s',
  });
}

// this function is called when you want the server to die gracefully
// any other system level destroy function can be applied here
// i.e. wait for existing connections
function gracefulShutdown () {
  console.log(`Received shutdown signal, shutting down gracefully.`);
  server.close();
  mongoose.disconnect();
  process.exit();
  // if after
  setTimeout(function () {
    console.error(`Could not close connections in time, forcefully shutting down`);
    process.exit();
  }, 10 * 1000);
}

module.exports = {
  init,
  start,
};

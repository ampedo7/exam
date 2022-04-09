const chalk = require('chalk');
const express = require('./services/express');
const http = require('http');
const https = require('https');

const config = require('./config');

// Establish an SQL server connection, instantiating all models and schemas
const startDatabase = () =>
  new Promise((resolve, reject) => {
    let orm = {};
    try {
      orm = require('./services/sequelize');
      orm.sync().then(() => {
        resolve(orm);
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });

/**
 *  Lists all available routes
 * @return {object}
 */
const listAllRoutes = async (app) => {
  try {
    routes = require('./services/routes');
    routes(app);

    return app;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Establish ExpressJS powered web server
 * @return {object} app
 */
const startExpress = async () => {
  try {
    const app = await express.start();
    return app;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Bootstrap the required services
 * @return {Object} db, orm, and app instances
 */
const bootstrap = async () => {
  let orm;
  let app;

  try {
    orm = await startDatabase();
  } catch (e) {
    orm = {};
  }

  try {
    // start database connection from here
    app = await startExpress();

    await listAllRoutes(app);
  } catch (e) {
    throw new Error(`unable to initialize Node ExpressJS : ${e}`);
  }

  return {
    app,
    orm,
  };
};

/**
 * log server configuration
 */
const logConfiguration = () => {
  // Create server URL
  const server = `${
    (config.secure && config.secure.credentials ? 'https://' : 'http://') +
    process.env.NODE_HOST
  }:${process.env.PORT}`;
  // Logging initialization
  console.log();
  console.log(chalk.bold.yellow(config.app.title));
  console.log('-----------------------------------------');
  console.log(
    chalk.green(
      `ENVIRONMENT:     ${
        process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
      }`
    )
  );
  console.log(chalk.green(`API Server:      ${server}`));
  console.log('-----------------------------------------');
};

exports.bootstrap = bootstrap;

exports.start = async () => {
  let app;
  let orm;
  let server;

  try {
    ({ app, orm } = await bootstrap());
  } catch (e) {
    throw new Error(e);
  }

  try {
    if (config.secure && config.secure.credentials)
      server = await https
        .createServer(config.secure.credentials, app)
        .listen(process.env.PORT, process.env.NODE_HOST);
    else
      server = await http
        .createServer(app)
        .listen(process.env.PORT, process.env.NODE_HOST);

    // disable later on
    if (process.env.NODE_LOG_CONFIG === 'true') logConfiguration();

    return {
      app,
      orm,
      server,
    };
  } catch (e) {
    throw new Error(e);
  }
};

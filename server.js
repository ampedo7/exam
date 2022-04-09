/**
 * Module dependencies.
 */

// DOTENV
require('dotenv').config();

const chalk = require('chalk');
const app = require('./src/app');

app.start().catch((e) => {
  console.info(chalk.red(`server failed: ${e.message}`));
  throw (e);
});
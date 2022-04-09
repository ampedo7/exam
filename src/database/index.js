const Sequelize = require('sequelize');
const databaseConfig = require('./connection');

let DB;

try {
  DB = new Sequelize(databaseConfig);
  console.log('yawa la');
} catch (e) {
  console.log('qwewqe');
  throw new Error(e);
}

module.exports = DB;

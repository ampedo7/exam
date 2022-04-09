// DOTENV
require('dotenv').config();

const config = {
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  logging: process.env.DB_ENABLE_LOGS === 'true' ? true : false,
};

if (process.env.DB_DIALECT)
  config.retry = {
    max: 10,
  };

module.exports = config;

const _ = require('lodash');
const defaultConfig = require('./development');

module.exports = _.merge(defaultConfig, {
  app: {
    title: 'DOLORES API - Production Environment',
    description: 'DOLORES API',
    keywords: 'dolores api, sirak dolores',
  },
  secure: {
    ssl: false,
    privateKey: '',
    certificate: '',
    caBundle: '',
  },
  cors: {
    origin: [
      'http://localhost:3000',
      'https://blog.keanocarpeso.com',
      'https://admin.blog.keanocarpeso.com',
      'http://blog.keanocarpeso.com',
      'http://admin.blog.keanocarpeso.com',
    ],
    credentials: true,
  },
  jwt: {
    httpOnly: true,
    secure: true,
    ephemeral: true,
    domain: '.keanocarpeso.com', //real domain
  },
  blacklists: {},
  whitelists: {},
  uploads: {},
  database: {
    shouldMigrateAndReset: false,
    shouldMigrate: false,
    shouldSeed: true,
  },
});

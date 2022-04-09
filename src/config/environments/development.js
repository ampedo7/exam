module.exports = {
  app: {
    title: 'edo technologies API',
    description: 'edo technologies API',
    keywords: 'edo technologies api, web',
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
      'http://188.166.222.93',
      'http://139.59.235.247',
    ],
    credentials: true,
  },
  jwt: {
    httpOnly: true,
    secure: false,
    ephemeral: true,
    domain: 'localhost',
  },
  blacklists: {},
  whitelists: {},
  uploads: {},
  database: {
    shouldMigrateAndReset: false,
    shouldMigrate: false,
    shouldSeed: true,
  },
};

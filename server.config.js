module.exports = {
  apps: [
    {
      // script: 'nodemon dotenv/config server.js',
      script: './server.js',
      // instances: 0,
      // exec_mode: 'cluster',
      // watch: true,
      env: {
        NODE_ENV: 'production',
        //   PORT: '5555'
      },
    },
  ],
};

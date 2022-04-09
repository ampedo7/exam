/**
 * Module dependencies.
 */
require('module-alias/register');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const config = require('../config');
const publicRoutes = require('../routes/publicRoutes');
const privateRoutes = require('../routes/privateRoutes');

const responseService = require('./response');

const initLocalVariables = (app) => {
  // // Setting application local variables
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  app.locals.env = process.env.NODE_ENV;

  const server = `${
    (config.secure && config.secure.credentials ? 'https://' : 'http://') +
    process.env.NODE_HOST
  }:${process.env.PORT}`;
  app.locals.api_url = server;

  if (config.secure && config.secure.ssl === true)
    app.locals.secure = config.secure.ssl;
};

const initMiddleware = (app) => {
  app.use(
    compress({
      filter(req, res) {
        return /json|text|javascript|css|font|svg/.test(
          res.getHeader('Content-Type')
        );
      },
      level: 9,
    })
  );

  const corsOptions = {
    origin: config.cors.origin || [],
    credentials: config.cors.credentials || false,
    optionsSuccessStatus: config.cors.optionsSuccessStatus || 200,
    allowedHeaders: [
      'Accept-Version',
      'Authorization',
      'Credentials',
      'Content-Type',
    ],
  };
  app.use(
    bodyParser.urlencoded({
      extended: false,
      limit: '50mb',
      parameterLimit: 100000,
    })
  );
  app.use(
    bodyParser.json({ limit: '50mb', limit: '50mb', parameterLimit: 100000 })
  );
  // app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser('sirak-dolores-jwt-askdhansdma'));
  // app.use(cookieParser('3scleet4yvoirr)thraqu+neo5hag%'));
  app.use(cors(corsOptions));
};

const initHelmet = (app) => {
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(
    helmet.hsts({
      maxAge: 15778476000, // 6mos
      includeSubDomains: true,
      force: true,
    })
  );
  app.disable('x-powered-by');
};

// incase we want a static html..
const initStaticRoutes = (app) => {
  app.use(
    '/',
    express.static(path.resolve('./src/storage'), { maxAge: 86400000 })
  );
};

const initRoutes = (app) => {
  publicMappedRoutes = mapRoutes(publicRoutes, 'src/app/controllers/');
  app.use('/', publicMappedRoutes);

  privateMappedRoutes = mapRoutes(privateRoutes, 'src/app/controllers/', [[]]);
  app.use('/api', privateMappedRoutes);
};

const initReponse = (app) => {
  app.use(responseService());
};

const start = () => {
  // Initialize express app
  const app = express();

  initLocalVariables(app);
  initMiddleware(app);
  initHelmet(app);
  initReponse(app);
  initRoutes(app);
  initStaticRoutes(app);

  return app;
};

module.exports = {
  start,
};

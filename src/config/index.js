/**
 * Module dependencies.
 */
const union = require('lodash/union');
const isArray = require('lodash/isArray');
const isString = require('lodash/isString');
const merge = require('lodash/merge');


const glob = require('glob');
const fs = require('fs');
const path = require('path');
// const objectPath = require('object-path');

/**
 * Get files by glob patterns
 */
const getGlobbedPaths = (globPatterns, excludes) => {
  // URL paths regex
  /* eslint no-useless-escape:0 */
  const urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
  let output = [];
  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (isArray(globPatterns)) {
    globPatterns.forEach((globPattern) => {
      output = union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map((file) => {
          if (isArray(excludes)) {
            excludes((exlude) => {
              file = file.replace(exlude, '');
            });
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = union(output, files);
    }
  }
  return output;
};



/**
 * Initialize global configuration files
 */
const initFiles = (config, files) => {
  config.files = {}; // Appending files
  config.files.models = getGlobbedPaths(files.models);
};

/**
 * Check if we need to use https
 * @param config
 */
const initHttpsMode = (config) => {
  if (!config.secure || config.secure.ssl !== true) return true;
  
  const key = fs.existsSync(path.resolve(config.secure.key));
  const cert = fs.existsSync(path.resolve(config.secure.cert));

  if (!key || !cert) {
    config.secure.ssl = false;
  } else {
    config.secure.credentials = {
      key: fs.readFileSync(path.resolve(config.secure.key)),
      cert: fs.readFileSync(path.resolve(config.secure.cert)),
    };
  }
};

const initConfig = () => {

  const files = require(path.join(process.cwd(), './src/config/files'));
  // Get the current config
  const _path = path.join(process.cwd(), './src/config', 'environments', process.env.NODE_ENV || 'development');

  let defaultConfig;
  if (fs.existsSync(`${_path}.js`)) defaultConfig = require(_path);
  else {
    defaultConfig = require(path.join(process.cwd(), './src/config', 'environments', 'development'));
  }
  const environmentConfigVars = {};
  // Merge config files
  const config = merge(defaultConfig, environmentConfigVars);

  initFiles(config, files);

  initHttpsMode(config);
 
  config.utils = {
    getGlobbedPaths,
  };
  return config;
};

/**
 * Set configuration object
 */
module.exports = initConfig();
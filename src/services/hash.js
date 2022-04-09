const Hashids = require('hashids/cjs');

module.exports = () => new Hashids('doloreshalt', 12);

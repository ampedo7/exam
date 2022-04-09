const jwt = require('jsonwebtoken');

const secret = 'pedo-dolores-jwt-askdhansdma';
// process.env.NODE_ENV === 'production'
//   ? process.env.JWT_SECRET
//   : 'dev-jwt-hushogroummai2qweshlew6';

const jwtService = () => {
  const issue = (payload) =>
    jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRE_IN });
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

  return {
    issue,
    verify,
  };
};

module.exports = jwtService;

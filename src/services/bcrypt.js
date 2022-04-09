const bcrypt = require('bcryptjs');

const bcryptService = () => {
  const password = (user) => {
    const saltLength = 10;
    const salt = bcrypt.genSaltSync(saltLength);

    let userPassword = user;
    if (typeof user.password !== 'undefined') {
      userPassword = user.password;
    }
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
  };

  const comparePassword = (pw, hash) => (
    bcrypt.compareSync(pw, hash)
  );

  return {
    password,
    comparePassword,
  };
};

module.exports = bcryptService;

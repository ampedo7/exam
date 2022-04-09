'use strict';
const bcrypt = require('../../services/bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          uuid: uuidv4(),
          first_name: 'Keano',
          last_name: 'Carpeso',
          password: bcrypt().password('keano'),
          email: 'keano@gmail.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};

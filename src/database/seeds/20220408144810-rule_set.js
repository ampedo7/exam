('use strict');
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(
      'moment ->',
      // moment().format('YYYY-MM-DD')
      moment().subtract(3, 'months').format('YYYY-MM-DD')
    );
    return queryInterface.bulkInsert(
      'rule_sets',
      [
        {
          identifier: 'flat_rate',
          title: 'Flat Rate',
          cash_back: 2,
          redemption_limit: 50,
          min_transaction: 50,
          budget: 1000,
          start_date: moment().subtract(3, 'months').format('YYYY-MM-DD'),
          end_date: moment().add(3, 'months').format('YYYY-MM-DD'),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rule_sets', null, {});
  },
};

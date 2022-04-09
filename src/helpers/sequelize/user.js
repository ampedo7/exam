const slugify = require('slugify');
const sequelize = require('@services/sequelize');

const getUser = async () => {
  const user = await sequelize.user.findOne({
    where: { id: 1 },
    attributes: ['id', 'first_name', 'last_name'],
    // include: [
    //   {
    //     model: sequelize.rule_set,
    //     as: 'rules',
    //     attributes: [
    //       'cash_back',
    //       'redemption_limit',
    //       'min_transaction',
    //       'budget',
    //       'start_date',
    //       'end_date',
    //     ],
    //   },
    // ],
  });
  return user;
};

module.exports = {
  getUser,
};

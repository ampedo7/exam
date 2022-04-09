const slugify = require('slugify');
const sequelize = require('@services/sequelize');
const col = require('Sequelize').col;
const fn = require('Sequelize').fn;

const createCashBack = async (data) => {
  const cash_back = await sequelize.cash_back.create(data);
  return cash_back;
};

const getChashBack = async () => {
  const rule_set = await sequelize.cash_back.findAll({
    where: {
      user_id: 1,
    },
    // order: [['cash_back', 'DESC']],
    attributes: ['id', 'amount'],
    include: [
      {
        model: sequelize.transaction,
        as: 'transaction',
        attributes: ['id', 'item', 'amount'],
      },
      {
        model: sequelize.rule_set,
        as: 'rule_set',
        attributes: ['id', 'title', 'cash_back'],
      },
    ],
  });
  return rule_set;
};

module.exports = {
  createCashBack,
  getChashBack,
};

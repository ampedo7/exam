const slugify = require('slugify');
const sequelize = require('@services/sequelize');
const Op = require('Sequelize').Op;
const col = require('Sequelize').col;

const getRuleSet = async () => {
  const rule_set = await sequelize.rule_set.findOne({
    where: {
      start_date: {
        [Op.lt]: col(new Date()),
      },
      end_date: {
        [Op.gt]: col(new Date()),
      },
    },
    order: [['cash_back', 'DESC']],
    attributes: [
      'id',
      'cash_back',
      'redemption_limit',
      'min_transaction',
      'budget',
    ],
  });
  return rule_set;
};

const createRuleSet = async (data) => {
  const rule_set = await sequelize.rule_set.create(data);
  return rule_set;
};
module.exports = {
  getRuleSet,
  createRuleSet,
};

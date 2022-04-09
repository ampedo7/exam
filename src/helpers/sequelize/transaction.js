const slugify = require('slugify');
const sequelize = require('@services/sequelize');

const create = async (amount) => {
  const transaction = await sequelize.transaction.create({
    user_id: 1,
    item: 'item-' + Math.floor(Math.random() * 10),
    amount,
  });
  return transaction;
};

module.exports = {
  create,
};

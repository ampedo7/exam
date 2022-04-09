'use strict';
module.exports = (sequelize, DataTypes) => {
  const cash_back = sequelize.define(
    'cash_back',
    {
      user_id: DataTypes.INTEGER,
      transaction_id: DataTypes.INTEGER,
      rule_set_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
    },
    {}
  );
  cash_back.associate = function (models) {
    models.cash_back.belongsTo(models.transaction, {
      as: 'transaction',
      foreignKey: 'transaction_id',
      onDelete: 'cascade',
    });
    models.cash_back.belongsTo(models.rule_set, {
      as: 'rule_set',
      foreignKey: 'rule_set_id',
      onDelete: 'cascade',
    });
    models.cash_back.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'user_id',
      onDelete: 'cascade',
    });
  };
  return cash_back;
};

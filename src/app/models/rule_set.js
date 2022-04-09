'use strict';
module.exports = (sequelize, DataTypes) => {
  const rule_set = sequelize.define(
    'rule_set',
    {
      identifier: DataTypes.STRING,
      title: DataTypes.STRING,
      cash_back: DataTypes.INTEGER,
      redemption_limit: DataTypes.INTEGER,
      min_transaction: DataTypes.INTEGER,
      budget: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {}
  );
  rule_set.associate = function (models) {
    // associations can be defined here
  };

  return rule_set;
};

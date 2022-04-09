'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define(
    'transaction',
    {
      user_id: DataTypes.INTEGER,
      item: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {}
  );
  transaction.associate = function (models) {
    // associations can be defined here
  };
  return transaction;
};

const sequelize = require('@services/sequelize');
const { responseServerError } = require('@helpers/shared/common');
const { getChashBack } = require('@helpers/sequelize/cash_back');
const validator = require('@helpers/libs/validator');
const CashbackController = () => {
  const index = async (req, res) => {
    try {
      const cash_back = await getChashBack();
      return res.formatter.ok({
        message: 'index',
        cash_back,
      });
    } catch (err) {
      responseServerError(res, null, err);
      return;
    }
  };

  const show = async (req, res, next) => {
    try {
      return res.formatter.ok({
        message: 'show',
      });
    } catch (err) {
      responseServerError(res, null, err);
    }
  };

  const store = async (req, res) => {
    try {
      return res.formatter.ok({
        message: 'store',
      });
    } catch (err) {
      responseServerError(res, null, err);
      return;
    }
  };
  const destroy = async (req, res) => {
    try {
      return res.formatter.ok({
        message: 'destroy',
      });
    } catch (err) {
      responseServerError(res, null, err);
    }
  };
  return {
    index,
    show,
    store,
    destroy,
  };
};

module.exports = CashbackController;

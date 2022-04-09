const sequelize = require('@services/sequelize');
const { responseServerError } = require('@helpers/shared/common');
const { create } = require('@helpers/sequelize/transaction');
const { getUser } = require('@helpers/sequelize/user');
const { getRuleSet } = require('@helpers/sequelize/rule_set');
const { createCashBack } = require('@helpers/sequelize/cash_back');
const validator = require('@helpers/libs/validator');
const { validationResult } = require('express-validator');
const TransactionController = () => {
  const index = async (req, res) => {
    try {
      return res.formatter.ok({
        message: 'index',
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
      // validator().validateResult(req, res);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.formatter.badRequest({ errors: errors.array() });
      }

      const form = req.body;
      const amount = form.amount;
      const user = await getUser();

      //create transaction
      const transaction = await create(amount);

      const rule_set = await getRuleSet();
      let rule_set_id = 0;
      let cash_back = 0;

      //if has rule set create cashback
      if (rule_set) {
        rule_set_id = rule_set.id;
        cash_back = rule_set.cash_back;
        const cb_percent = cash_back / 100;
        const _amount = amount * cb_percent;
        const data = {
          user_id: user.id,
          transaction_id: transaction.id,
          rule_set_id,
          amount: _amount,
        };

        const create_cb = await createCashBack(data);
      }

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

module.exports = TransactionController;

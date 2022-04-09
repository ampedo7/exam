const { validate } = require('@helpers/validation/validator');

const publicRoutes = {
  'GET /': 'UserController.index',
  'GET /cashback': 'CashbackController.index',

  //transaction
  // 'POST /transaction': 'TransactionController.store',
  'POST /transaction': {
    path: 'TransactionController.store',
    middlewares: [validate('transaction')],
  },

  //rule set
  // 'POST /ruleset': 'RulesetController.store',
  'POST /ruleset': {
    path: 'RulesetController.store',
    middlewares: [validate('rule_set')],
  },
};

module.exports = publicRoutes;

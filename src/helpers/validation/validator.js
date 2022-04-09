const validator = require('@helpers/libs/validator');

exports.validate = (method) => {
  switch (method) {
    case 'rule_set':
      return rule_set();
      break;
    case 'transaction':
      return transaction();
      break;
    default:
      return [];
  }
};

const rule_set = () => {
  return [
    validator().required('title'),
    validator().isNumber('cash_back'),
    validator().isNumber('redemption_limit'),
    validator().isNumber('min_transaction'),
    validator().date('start_date'),
    validator().date('end_date'),
  ];
};
const transaction = () => {
  return [validator().isNumber('amount')];
};

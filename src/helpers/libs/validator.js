const { body, validationResult } = require('express-validator');
const moment = require('moment');

const validator = () => {
  const required = (field) =>
    body(field)
      .notEmpty()
      .withMessage(`${field.replace('_', ' ')} is required`);

  const isEmail = (field) => body(field).isEmail().withMessage(`Invalid Email`);

  const isNumber = (field) =>
    body(field)
      .isNumeric()
      .isInt({ min: 1 })
      .withMessage(`Invalid Number or must be greater than 0`);

  const date = (field) =>
    body(field)
      .isISO8601()
      .toDate()
      .withMessage(`Should be valid date format yyyy-mm-dd`);

  const validateResult = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.formatter.badRequest({ errors: errors.array() });
      return;
    }
  };

  return {
    required,
    isEmail,
    isNumber,
    date,
    validateResult,
  };
};

module.exports = validator;

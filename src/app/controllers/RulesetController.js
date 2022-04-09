const sequelize = require('@services/sequelize');
const { responseServerError } = require('@helpers/shared/common');
const { createRuleSet } = require('@helpers/sequelize/rule_set');
const slugify = require('slugify');
const validator = require('@helpers/libs/validator');
const { validationResult } = require('express-validator');
const RulesetController = () => {
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.formatter.badRequest({ errors: errors.array() });
      }

      const form = req.body;
      form.identifier = slugify(form.title.toLowerCase(), '_');

      const rule_set = await createRuleSet(form);

      return res.formatter.ok({
        message: 'successfully created rule set',
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

module.exports = RulesetController;

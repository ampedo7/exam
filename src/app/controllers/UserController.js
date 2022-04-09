const sequelize = require('@services/sequelize');
const { responseServerError } = require('@helpers/shared/common');
const UserController = () => {
  const index = async (req, res) => {
    try {
      return res.formatter.ok({
        msg: 'wew',
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
      const detailedErrMsg =
        err.parent && err.parent.sqlMessage ? err.parent.sqlMessage : '';
      return res.formatter.serverError({
        msg: 'Internal server errors.',
        title: 'Oops, something went wrong!',
        detailed_msg: detailedErrMsg,
      });
    }
  };

  const store = async (req, res) => {
    try {
      let form = req.body;
      const _user = req.user;
      const company_id = _user.company.id;
      const email = form.email;
      let checkUser = await getUser({ email });
      if (checkUser)
        return res.formatter.badRequest({
          msg: 'Bad Request.',
          title: 'Email already exist!',
        });
      let user = await createUser(company_id, form);
      return res.formatter.ok({
        message: 'store',
        user,
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
      return res.formatter.serverError('Internal server errors.');
    }
  };
  return {
    index,
    show,
    store,
    destroy,
  };
};

module.exports = UserController;

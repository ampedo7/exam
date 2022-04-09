const slugify = require('slugify');

const slug = (item, options) => slugify(item, options);

const responseServerError = (res, title = null, err = '') => {
  let detailedErrMsg =
    err.parent && err.parent.sqlMessage ? err.parent.sqlMessage : '';

  if (!detailedErrMsg) detailedErrMsg = err.stack;

  return res.formatter.serverError({
    msg: 'Internal server errors.',
    title: title ? title : 'Oops, something went wrong!',
    detailedErrMsg,
  });
};

module.exports = {
  slug,
  responseServerError,
};

const slugify = require('slugify');

const getNameFromEmail = (email) => {
  const name = slugify(email.substring(0, email.lastIndexOf("@")), { lower: true, replacement: '_'});
  const domain = email.substring(email.lastIndexOf("@") +1);
  return {
    name,
    domain
  }
}

const slug = (item, options) => slugify(item, options);

const paginate = ( _page=1, _per_page ) => {
  if ( !_per_page ) {
    _per_page = process.env.PAGINATE_PER_PAGE || 25;
  }

  const page     = parseInt(_page);
  const per_page = parseInt(_per_page);
  const offset   = (page - 1) * per_page;
  const limit    = parseInt(per_page);

  return {
      page,
      per_page,
      offset,
      limit,
  };
};

module.exports = {
  getNameFromEmail,
  slug,
  paginate
}
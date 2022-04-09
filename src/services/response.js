const methods = require('../methods/response');

// module.exports = responseService;
const generateErrorResponse = ({ errors }) => ({
  errors,
});

const generateSuccessResponse = ({ data, meta }) => ({
  meta,
  data,
});

const generatePaginateSuccessResponse = ({ data, meta={} }) => {

  const page  = meta.page || 1;
  let perpage = meta.per_page || process.env.PAGINATE_PER_PAGE || 25;
      perpage = parseInt(perpage)

  let count = 1;
  if ( data.rows ) {
    count = data.count;
    data  = data.rows;
  } else {
    count = data.length;
  }
  return {
    data,
    meta: {
      perPage : perpage,
      current : page,
      total   : count,
      lastPage: Math.ceil(count / perpage)
    },
  }
}

const generateFormatters = (res) => {
  const formatter = {};
  let responseBody = {};
  
  methods.map((method) => {
    if (method.isSuccess) {
      formatter[method.name] = (data, meta) => {
        responseBody = ( method.isPaginate ) 
                       ? generatePaginateSuccessResponse({ data, meta })
                       : generateSuccessResponse({ data, meta });
        res.status(method.code).json(responseBody);
      };
    } else {
      formatter[method.name] = (errors) => {
        responseBody = generateErrorResponse({ errors });
        res.status(method.code).json(responseBody);
      };
    }
  });
  return formatter;
};

const responseService = () => (req, res, next) => {
  res.formatter = generateFormatters(res);
  next();
};


module.exports = responseService;

module.exports = function (app) {
  const Table = require('cli-table');
  const table = new Table({ head: ['Method', 'URL'] });
  // console.log('\nAll Routes ');
  // console.log('\n********************************************');
  var route,
    routes = [];
  app._router.stack.forEach(function (middleware) {
    if (middleware.route) {
      // routes registered directly on the app
      middleware.route &&
        table.push([middleware.route.stack[0].method, middleware.route.path]);
    } else if (middleware.name === 'router') {
      // router middleware
      middleware.handle.stack.forEach(function (handler) {
        route = handler.route;
        // console.log('\n' + route.stack[0]);
        route && table.push([route.stack[0].method, route.path]);
      });
    }
  });

  // console.log(table.toString());
  // console.log('process.env.DB_HOST -> ', process.env.DB_HOST);
  return table;
};

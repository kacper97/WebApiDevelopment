  module.exports = function(app) {
      app.use('/api/customers', require('./api/customers/index'));
    };
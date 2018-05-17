const demoController = require('./controller/demo.controller');

module.exports = function (app) {
 if (process.env.NODE_ENV === 'int' || process.env.NODE_ENV === 'production') {
   app.route('/').get(demoController.render);
 }
};

const demoService = require('../service/demo.service');

module.exports.render = (req, res, next) => {
  // demoService.save();
  // res.json('Hello');
  res.render('index');
};

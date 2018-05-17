const demoRepository = require('../repository/demo.repository');
module.exports = {
  save () {
    demoRepository.save();
  },
};

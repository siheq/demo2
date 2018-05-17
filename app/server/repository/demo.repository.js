const demo = require('../model/demo.model');

module.exports = {
  save () {
    let tmp = new demo({hello: 'hello'});
    tmp.save(err => {
      if (err) {
        console.log('save error');
      }
    });
  },
};

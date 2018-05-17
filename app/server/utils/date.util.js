const moment = require('moment');
module.exports = {
  now () {
    return new Date();
  },
  addDays (date, days) {
    return moment(date).add(days, 'days')._d;
  },
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: String,
  hello: String,
});

const demoModel = mongoose.model('demo', schema, 'demo');
module.exports = demoModel;

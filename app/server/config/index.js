const env = process.env.NODE_ENV;
let config;
try {
  config = require(`./${env}`);
}
catch (error) {
  console.log(error);
}
module.exports = config;

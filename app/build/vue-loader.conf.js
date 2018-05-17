var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'int'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? true
      : false,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}

var merge = require('webpack-merge')
var path = require('path');

module.exports = {
  env: {
    NODE_ENV: '"int"',
  },
  port: 8081,
  proxyTable: {
    // '/api': {
    //   port: 3003,
    //   target: `http://ciot-dom_dev.flin.digital.cargosmart.com`,
    //   changeOrigin: true,
    //   pathRewrite: {},
    // },
    // '/socket.io': {
    //   target: `http://ciot-dom_dev.flin.digital.cargosmart.com`,
    //   changeOrigin: true,
    //   pathRewrite: {},
    //   ws: true,
    // },
  },
  db: {
    uri: 'itciotmongo01:27017/iot',
    options: {
      user: 'iot_owner',
      pass: 'iot_owner',
    },
  },
  host: '0.0.0.0',
  log: {
    format: 'dev',
    fileLogger: {
      directoryPath: process.cwd(),
      fileName: 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false,
    },
  },
  sessionCookie: {
    maxAge: 24 * (60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  },
  proxy: {
    url: 'http://itcswebproxy:4000',
  },
  index: path.resolve(__dirname, '../dist/index.html'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  // assetsRoot: path.resolve('dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/dist/',
  productionSourceMap: true,
  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report,
}
var path = require('path');

module.exports = {
  env: {
    NODE_ENV: '"'+(process.env.NODE_ENV?process.env.NODE_ENV:'development')+'"'
  },
  // index: path.resolve(__dirname, '../dist/index.html'),
  // index: '../dist/index.html',
  // assetsRoot: path.resolve(__dirname, '../dist'),
  assetsRoot: path.resolve('dist'),
  // assetsRoot: '../dist',
  assetsSubDirectory: 'static',
  assetsPublicPath: '"/dist/"',
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
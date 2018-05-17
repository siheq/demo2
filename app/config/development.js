module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  db: {
    uri: 'localhost:27017/gps',
    options: {
      user: 'deviot',
      pass: 'deviot',
    },
  },
  port: 3022,
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
  port: 3021,
  autoOpenBrowser: true,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  cssSourceMap: false,
  proxyTable: {
    '/api': {
      target: `http://localhost:3022`,
      changeOrigin: true,
      pathRewrite: {},
    },
    '/socket.io': {
      // target: `http://ciot-dom_dev.flin.digital.cargosmart.com`,
      target: `http://localhost:3010`,
      changeOrigin: true,
      pathRewrite: {},
      ws: true,
    },
  },
};

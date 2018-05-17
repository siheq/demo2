module.exports = {
  db: {
    uri: 'mongodb://itciotmongo01:27017/event',
    options: {
      user: 'iot_owner',
      pass: 'iot_owner',
    },
  },
  port: 5000,
  host: '0.0.0.0',
  log: {
    format: 'combined',
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
  sessionSecret: 'ciot',
  proxy: {
    url: 'http://itcswebproxy:4000',
  },
};

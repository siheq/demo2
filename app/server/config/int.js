module.exports = {
  db: {
    uri: 'itciotmongo01:27017/iot',
    options: {
      user: 'iot_owner',
      pass: 'iot_owner',
    },
  },
  port: 5000,
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
};

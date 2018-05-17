module.exports = {
  db: {
    uri: 'localhost:27017/demo',
    options: {
      user: '',
      pass: '',
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
    }
  },
  sessionCookie: {
    maxAge: 24 * (60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  },
};

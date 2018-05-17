module.exports = {
  db: {
    uri: '10.222.48.147:27017/gps',
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
};

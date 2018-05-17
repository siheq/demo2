'use strict';

let config = require('../config');
let express = require('express');
let morgan = require('morgan');
let logger = require('./logger');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let cookieParser = require('cookie-parser');
let flash = require('connect-flash');
let path = require('path');
let _ = require('lodash');
// let session = require('express-session');
// let MongoStore = require('connect-mongo')(session);

module.exports.initMiddleware = function (app) {
  if (_.has(config, 'log.format')) {
    app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
  }

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Disable views cache
    app.set('view cache', false);
  }
  else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(cookieParser());
  app.use(flash());
};

module.exports.initModulesServerRoutes = function (app) {
  require('../app.server.routes.js')(app);
};

module.exports.initErrorHandler = function (app) {
  app.use(function (err, req, res, next) {
    if (!err) {
      return next();
    }
    console.error(err.stack);
    res.status(500).json({
      code: 500,
      message: err.stack,
    });
  });
};

module.exports.initStaticResource = function (app) {
  app.use('/', express.static(path.resolve('public')));
};

// module.exports.initSession = function (app, db) {
//   let mongoStore = new MongoStore({
//     mongooseConnection: db.connection,
//     collection: 'sessions',
//   });
//   app.use(session({
//     saveUninitialized: true,
//     resave: true,
//     rolling: true,
//     secret: config.sessionSecret,
//     cookie: {
//       maxAge: config.sessionCookie.maxAge,
//       httpOnly: config.sessionCookie.httpOnly,
//       secure: config.sessionCookie.secure && config.secure.ssl,
//     },
//     name: config.sessionKey,
//     store: mongoStore,
//   }));
//   return mongoStore;
// };

module.exports.initSocket = function (server, sessionStore) {
  // let init = require('./socket.io.js').init;
  // init(server, sessionStore);
  require('../utils/gpsevent.socket').init(server);
};

module.exports.init = function (db) {
  let app = express();
  let server = require('http').Server(app);
  this.initStaticResource(app);
  // let sessionStore = this.initSession(app, db);
  // this.initSocket(server, sessionStore);
  this.initMiddleware(app);
  this.initModulesServerRoutes(app);
  this.initErrorHandler(app);
  return server;
};

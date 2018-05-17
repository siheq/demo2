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
var opn = require('opn');
let _ = require('lodash');
// let session = require('express-session');
// let MongoStore = require('connect-mongo')(session);
var webpack = require('webpack');
var webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'int')
  ? require('../build/webpack.prod.conf')
  : require('../build/webpack.dev.conf');
var proxyMiddleware = require('http-proxy-middleware');
// var autoOpenBrowser = !!config.dev.autoOpenBrowser;
// var port = process.env.PORT || config.dev.port;

module.exports.initMiddleware = function (app) {
  if (_.has(config, 'log.format')) {
    app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
  }
  var proxyTable = config.proxyTable;
  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Disable views cache
    app.set('view cache', false);
    var compiler = webpack(webpackConfig);

    var devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      quiet: true,
    });

    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: false,
      heartbeat: 2000,
    });

    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // hotMiddleware.publish({ action: 'reload' })
        cb();
      });
    });

    // serve webpack bundle output
    app.use(devMiddleware);

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware);

    // var uri = 'http://localhost:' + port;
    // devMiddleware.waitUntilValid(() => {
    //   console.log('> Listening at ' + uri + '\n');
    //   // when env is testing, don't need open it
    //   if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    //     opn(uri);
    //   }
    //   _resolve();
    // });
  }
  else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'int') {
    app.engine('html', require('ejs').__express);
    app.set('view engine', 'html');
    app.set('views','dist');
    app.locals.cache = 'memory';
  }

  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];
    if (typeof options === 'string') {
      options = {target: options};
    }
    app.use(proxyMiddleware(options.filter || context, options));
  });

  app.use(require('connect-history-api-fallback')());


  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(cookieParser());
  app.use(flash());
};

module.exports.initModulesServerRoutes = function (app) {
  require('../server/app.server.routes')(app);
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
  // app.use('/', express.static(path.resolve('public')));
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'int') {
    var staticPath1 = path.posix.join('/dist/', 'static')
    app.use(staticPath1, express.static('.'+'/dist/'+'/static'))
  } else {
    var staticPath = path.posix.join(config.assetsPublicPath, config.assetsSubDirectory)
    app.use('/favicon.ico', express.static('./' + config.assetsSubDirectory + '/favicon.ico'));
    app.use(staticPath, express.static('.'+config.assetsPublicPath+'/static'))
  }
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

module.exports.init = function (app, db) {
  this.initModulesServerRoutes(app);
  this.initStaticResource(app);
  // let sessionStore = this.initSession(app, db);
  // this.initSocket(server, sessionStore);
  this.initMiddleware(app);
  this.initErrorHandler(app);
  return app;
};

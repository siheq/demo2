require('./check-versions')()
process.env.NODE_ENV = 'production';
var config = require('../config')

var express = require('express')


var app = express();
require('../lib/app').start(app);


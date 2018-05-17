
process.env.NODE_ENV = 'development';
var config = require('../config');

var express = require('express');


var app = express();
require('../lib/app').start(app);


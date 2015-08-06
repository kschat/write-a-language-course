'use strict';

require('babel/register');

var fs = require('fs');
var path = require('path');
var moduleFiles = fs.readdirSync('./lib');

module.exports = moduleFiles.reduce(function(acc, file) {
  acc[file] = require(path.resolve('./lib', file));

  return acc;
}, {});

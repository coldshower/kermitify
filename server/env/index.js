var path = require('path');

var prodConfigPath = require(__dirname + './production.js');
var devConfigPath = require(__dirname + './development.js');

if (process.env.NODE_ENV === 'production') {
  module.exports = require(prodConfigPath);
} else {
  module.exports = require(devConfigPath);
}
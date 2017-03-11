var path = require('path');

var prodConfigPath = path.join(__dirname, '/production');
var devConfigPath = path.join(__dirname, '/development');

if (process.env.NODE_ENV === 'production') {
  module.exports = require(prodConfigPath);
} else {
  module.exports = require(devConfigPath);
}
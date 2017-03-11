var Sequelize = require('sequelize');
var env = require('../env');
var db = new Sequelize(env.DATABASE_URL);

var Meme = db.define('meme', {
  me: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: '',
    validate: {
      notEmpty: true
    }
  },
  innerMe: {
    type: Sequelize.TEXT,
    defaultValue: '',
  }
});

module.exports = db;
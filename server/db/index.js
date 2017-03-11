var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/kermitify');

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
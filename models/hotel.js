var Sequelize = require('sequelize');
var db = require('./index');
var Place = require('../models/place');

var Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  num_stars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  amenities: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Hotel.belongsTo(Place);

module.exports = Hotel;

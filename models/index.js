const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tripplanner', {
	logging: false
});

const Place = require('./place');
const Hotel = require('./hotel');
const Restaurant = require('./restaurant');
const Activity = require('./activity');


Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports = db;

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tripplanner', {
	logging: false
});

const Hotel = db.define('hotel', {

	name: {
		type: Sequelize.STRING,
		allowNull: false
	},

	num_stars: {
		type: Sequelize.INTEGER,
		validate: {
			max: 5,
			min: 1
		}
	},

	amenities: {
		type: Sequelize.STRING,
		allowNull: false
	},

});

module.exports = Hotel;

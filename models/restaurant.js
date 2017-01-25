const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tripplanner', {
	logging: false
});

const Restaurant = db.define('restaurant', {

	name: {
		type: Sequelize.STRING,
		allowNull: false
	},

	cuisine: {
		type: Sequelize.STRING,
		allowNull: false
	},

	price: {
		type: Sequelize.INTEGER,
		validate: {
			max: 5,
			min: 1
		}
	}

});

module.exports = Restaurant;
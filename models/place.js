const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tripplanner', {
	logging: false
});

const Place = db.define('place', {

	address: {
		type: Sequelize.STRING,
		allowNull: false
	},

	city: {
		type: Sequelize.STRING,
		allowNull: false
	},

	state: {
		type: Sequelize.STRING,
		validate: {
			len: 2
		}
	},

	phone: {
		type: Sequelize.STRING,
		validate: {
			is: /\d{3}-\d{3}-\d{4}/
		}
	},

	location: {
		type: Sequelize.ARRAY(Sequelize.FLOAT),
		allowNull: false
	}

});

module.exports = Place;

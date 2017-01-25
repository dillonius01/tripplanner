const router = require('express').Router();
const Hotel = require('./models/hotel');
const Activity = require('./models/activity');
const Restaurant = require('./models/restaurant');

router.get('/', (req, res, next) => {

	Promise.all([
		Hotel.findAll(),
		Activity.findAll(),
		Restaurant.findAll()
	])
	.then(results => {
		const hotels = results[0];
		const activities = results[1];
		const restaurants = results[2];
		res.render('index', { hotels, activities, restaurants });
	})
	.catch(next);

});

module.exports = router;
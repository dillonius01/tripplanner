var express = require('express');
var router = new express.Router();
var db = require('../models');
var Place = require('../models/place');
var Activity = require('../models/activity');
var Restaurant = require('../models/restaurant');
var Hotel = require('../models/hotel');
var Promise = require('bluebird');


router.get('/', function(req, res, next) {
console.log('Hello INSIDE GET')
	var gettingHotels = Hotel.findAll();
	var gettingActivities = Activity.findAll();
	var gettingRestaurants = Restaurant.findAll();

	Promise.all([gettingHotels, gettingActivities, gettingRestaurants])
	  .spread(function(hotels, activities, restaurants) {

	  	res.render('index', {
	  		hotels: hotels,
	  		activities: activities,
	  		restaurants: restaurants
	  	})
	  })
	  .catch(next)

});




module.exports = router;

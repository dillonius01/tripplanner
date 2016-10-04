var Express = require('express');
var app = new Express();

var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var router = require('./routes');
var db = require('./models');

var Place = require('./models/place');
var Activity = require('./models/activity');
var Restaurant = require('./models/restaurant');
var Hotel = require('./models/hotel');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

nunjucks.configure('views', {
	watch: true,
	express: app,
	noCache: true
})
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(Express.static('public'));
app.use(Express.static('bower_components'));
// when accessing bootstrap or jquery files, serves them up from within bower_components
app.use('/bootstrap', Express.static(__dirname + '/bower_components/bootstrap/dist'));
app.use('/jquery', Express.static(__dirname + '/bower_components/jquery/dist'));
app.use(router);


app.use(function(req, res, next) {
	var err = new Error('Page Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.error(err);
	res.render(
		'/error', {
			message: err.message
		}
	);
});

Promise.all([
	Hotel.sync(),
	Activity.sync(),
	Restaurant.sync(),
	Place.sync()
	])
  .then(
  	app.listen(8080, function() {
  	}))
  .catch(console.error);

var Express = require('express');
var app = new Express();

var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var router = require('./routes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// SEQUELIZE IN MODELS FOLDER



nunjucks.configure('views', {
	watch: true,
	express: app,
	noCache: true
})
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(Express.static('public'));

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

app.listen(8080);

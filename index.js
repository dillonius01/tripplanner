const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');
const PORT = 8080;

const db = require('./models');

const routes = require('./router');


// logging and parsing
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// nunjucks rendering engine
const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


app.use(('/public', express.static(path.join(__dirname, 'public'))));
app.use(('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist'))));
app.use(('/jQuery', express.static(path.join(__dirname, 'node_modules/jQuery/tmp'))));


app.use('/', routes);


app.use((req, res, next) => {
	const err = new Error('Page not found!');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500);
	res.render('error', {error: err});
});


db.sync()
.then(() => {
	console.log('Synced models!')
	app.listen(PORT, () => {
		console.log(`Rocking out on port ${PORT}`);
	});
})
.catch(console.error);

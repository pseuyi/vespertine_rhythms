const express = require('express');
const app = express();
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const Promise = require("bluebird");

const db = require('./models');
const Hotel = require('./models/hotel.js')
const Restaurant = require('./models/restaurant.js')
const Activity = require('./models/activity.js')
const Place = require('./models/place.js')

// logging middleware
app.use(volleyball);

// body-parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// nunjucks boilerplate
nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

// statically serve public folder
app.use(express.static(__dirname + '/public'));
// statically serve bower folder
app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist'));

// direct to routes
app.use(require('./routes'))

//not found middleware
app.use(function(req, res, next){
	const err = new Error('Not Found');
	err.status = 404;
	console.error(err);
	next(err);
});

app.use(function(req, res, next) {
	res.send('404: Page not Found', 404);
})

// error-handling middleware
app.use(function(err, req, res, next){
	if (res.headersSent) {
		return next(err)
	}
	res.status(500)
	res.render('error', {err: err});
});

db.sync()
.then(function(){
	console.log("synced with db");
})
app.listen(process.env.PORT || 3000, function(){
	console.log("serving up app.js...")
});

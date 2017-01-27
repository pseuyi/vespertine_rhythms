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
app.use(express.static(__dirname + '/bower_components'))

app.get('/', function(req, res, next){
	Promise.all([
		Hotel.findAll({include: [{model: Place, as: 'place'}]}),
		Restaurant.findAll({include: [{model: Place, as: 'place'}]}),
		Activity.findAll({include: [{model: Place, as: 'place'}]}),
	])
	.spread((hotels, restaurants, activities)=>{
		res.render('index', {
			hotels,
			restaurants,
			activities
		})
	})
	.catch(next)
});

// not found middleware
app.use(function(req, res, next){
	const err = new Error('Not Found');
	err.status = 404;
	console.error(err);
	next(err);
});

// error-handling middleware
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	console.error(err);
	res.render('error', {err: err});
});

db.sync()
.then(function(){
	console.log("synched with db");
	app.listen(3000, function(){
		console.log("app is listening on port 3000...")
	});
})
.catch(console.error);

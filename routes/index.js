const router = require('express').Router()
const axios = require('axios')

const Hotel = require('../models/hotel.js')
const Restaurant = require('../models/restaurant.js')
const Activity = require('../models/activity.js')
const Place = require('../models/place.js')
const Promise = require("bluebird")

module.exports = router

// foursquare tokens
const client_id = "TDIAGN5LQWKX0FHAHMBXLWDGOJPSZ51UGPIEAAPRZLRAHXYD"
const client_secret = "0DLE4W0TWM3UAMCK0HTDQ1MSIWGQOOLVC1ZCAOQ10OI4TTEG"
const distance = '100'
const category_id = '56aa371be4b08b9a8d57355c'

Date.prototype.format = function () {
  let m = this.getMonth() + 1
  let d = this.getDate();
  return [this.getFullYear(), (m>9 ? '' : '0') + m, (d>9 ? '' : '0') + d].join('')
}

let date = new Date()
date = date.format()

let fsRoute = `https://api.foursquare.com/v2/venues/search?ll=40.7,-74
  &categoryId=${category_id}
  &client_id=${client_id}
  &client_secret=${client_secret}
  &v=${date}`

router.get('/', function (req, res, next){
  let vapes
  axios.get(fsRoute)
  .then(response=>{
    vapes = response.data.response.venues
    //res.render('index', { vapes }) // json file of vape store metadata
  	Promise.all([
  		Hotel.findAll({include: [{model: Place, as: 'place'}]}),
  		Restaurant.findAll({include: [{model: Place, as: 'place'}]}),
  		Activity.findAll({include: [{model: Place, as: 'place'}]}),
  	])
  	.spread((hotels, restaurants, activities)=>{
  		res.render('index', {
  			hotels,
  			restaurants,
  			activities,
        vapes
  		})
  	})
  })
	.catch(next)
})

router.get('/vape', function (req, res, next) {
  axios.get(fsRoute)
  .then(response=>{
    let vapes = response.data.response.venues
    res.render('index', { vapes }) // json file of vape store metadata
  })
  .catch(next)
})

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
const distance = '5000'
const category_ids = ['56aa371be4b08b9a8d57355c', '4bf58dd8d48988d116941735', '4bf58dd8d48988d131941735']
const sw = '40.701645, -74.019423' // use intent=browse
const ne = '40.735277, -73.946038'

Date.prototype.format = function () {
  let m = this.getMonth() + 1
  let d = this.getDate();
  return [this.getFullYear(), (m>9 ? '' : '0') + m, (d>9 ? '' : '0') + d].join('')
}

const fsRoutes = []
const createfsRoute = id => {
  let date = new Date()
  date = date.format()
  let fsRoute = `https://api.foursquare.com/v2/venues/search?ll=40.7312,-73.9971
  &intent=browse
  &categoryId=${id}
  &client_id=${client_id}
  &client_secret=${client_secret}
  &sw=${sw}
  &ne=${ne}
  &v=${date}`
  fsRoutes.push(axios.get(fsRoute))
}


router.get('/', function (req, res, next){

  category_ids.forEach(id=>createfsRoute(id))
  Promise.all([...fsRoutes])
  .spread((vapes, bars, spirits)=>{
    res.render('index', { vapes: vapes.data.response.venues, bars: bars.data.response.venues, spirits: spirits.data.response.venues }) // json file of vape store metadata
  })
	.catch(next)
})

// router.get('/vape', function (req, res, next) {
//   axios.get(fsRoute)
//   .then(response=>{
//     let vapes = response.data.response.venues
//     res.render('index', { vapes }) // json file of vape store metadata
//   })
//   .catch(next)
// })

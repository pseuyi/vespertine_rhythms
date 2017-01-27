const Sequelize = require('sequelize');
const db = require('./index')

const Hotel = db.define('hotel', {
  name: Sequelize.STRING,
  num_stars: Sequelize.INTEGER,
  amenities: Sequelize.STRING
})

module.exports = Hotel

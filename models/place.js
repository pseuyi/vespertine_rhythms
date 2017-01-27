const Sequelize = require('sequelize');
const db = require('./')

const Place = db.define('place', {
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  phone: Sequelize.STRING,
  location: Sequelize.ARRAY(Sequelize.INTEGER)
})

module.exports = Place

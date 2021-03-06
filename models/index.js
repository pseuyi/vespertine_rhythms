const Sequelize = require('sequelize');
let db;
if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:   false
  })
} else {
  db = new Sequelize("postgres://localhost:5432/tripplanner")
}

module.exports = db

// models require db so need to come after exports
const Hotel = require('./hotel.js')
const Restaurant = require('./restaurant.js')
const Activity = require('./activity.js')
const Place = require('./place.js')

Hotel.belongsTo(Place)
Restaurant.belongsTo(Place)
Activity.belongsTo(Place)

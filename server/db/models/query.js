const Sequelize = require('sequelize')
const db = require('../db')

const Query = db.define('query', {
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.INTEGER
  }
})

module.exports = Query

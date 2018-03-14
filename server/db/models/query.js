const Sequelize = require('sequelize')
const db = require('../db')

const Query = db.define('query', {
  location: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Query

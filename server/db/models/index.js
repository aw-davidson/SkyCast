const User = require('./user')
const Query = require('./query')

Query.belongsTo(User)
User.hasMany(Query)

module.exports = {
  User,
  Query
}

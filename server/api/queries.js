const router = require('express').Router()
const {Query} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Query.findAll({
    where: req.query
  })
    .then(queries => res.json(queries))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Query.create(req.body)
    .then(query => res.json(query))
    .catch(next)
})

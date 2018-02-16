// construct router
const router = require('express').Router()

// import route handlers
const api = require('./api')

// add handlers to router

router.use((req, res, next) => {
  console.log('in routes index')
  next()
})

router.use('/api/v1', api)

module.exports = router
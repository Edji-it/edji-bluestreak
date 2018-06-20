// construct router
const router = require('express').Router()

// import route handlers
const api = require('./api')

// add handlers to router
router.use('/api', api)

module.exports = router
// construct router
const router = require('express').Router()

// import route handlers
const api = require('./api')

// add handlers to router
router.use('/api/v1', api)

module.exports = router
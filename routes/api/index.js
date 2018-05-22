// construct router
const router = require('express').Router()

// import route handlers
const v1 = require('./v1')

// add handlers to router
router.use('/v1', v1)

module.exports = router
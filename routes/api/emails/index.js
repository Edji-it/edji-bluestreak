// construct router
const router = require('express').Router()

// import route handlers
const postHandler = require('./post')

// attach handlers to router
router.post('/', postHandler)

module.exports = router
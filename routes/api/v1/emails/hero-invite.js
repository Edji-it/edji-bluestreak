// construct router
const router = require('express').Router()

// import route handlers
const listHandler = require('./list')

// // attach handlers to router
router.get('/', listHandler)

module.exports = router
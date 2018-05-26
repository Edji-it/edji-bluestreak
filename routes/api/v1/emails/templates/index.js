// construct router
const router = require('express').Router()

// authorization token checker
const authRequired = require('./../../../../../middleware/auth-required')

// import route handlers
const listHandler = require('./list')

// // attach handlers to router
router.get('/', authRequired, listHandler)

module.exports = router
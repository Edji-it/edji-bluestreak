// construct router
const router = require('express').Router()

// import route handlers
const emails = require('./emails')

// add handlers to router
router.use('/emails', emails)

module.exports = router

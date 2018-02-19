// construct router
const router = require('express').Router()

// import route handlers
const templatesRouter = require('./templates')
const postHandler = require('./post')

// attach handlers to router
router.use('/templates', templatesRouter)
router.post('/', postHandler)

module.exports = router
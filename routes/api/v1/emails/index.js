// construct router
const router = require('express').Router()

// import route handlers
const templatesRouter = require('./templates')
const sendEmailFromTemplate = require('./hero-invite')
const postHandler = require('./post')

// attach handlers to router
router.use('/templates', templatesRouter)
router.use('/sendit', sendEmailFromTemplate)
router.post('/', postHandler)

module.exports = router
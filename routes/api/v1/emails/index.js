// construct router
const router = require('express').Router()

// import route handlers
const templatesRouter = require('./templates')
const sendEmailFromTemplate = require('./mount-templates')

// attach handlers to router
router.use('/templates', templatesRouter)
router.use('/sendmail', sendEmailFromTemplate)

module.exports = router
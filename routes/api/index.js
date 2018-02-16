// construct router
const router = require('express').Router()

// import route handlers
const emails = require('./emails')

router.use((req, res, next) => {
  console.log('in api index')
  next()
})

// add handlers to router
router.use('/emails', emails)

module.exports = router
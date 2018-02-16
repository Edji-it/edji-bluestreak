// construct router
const router = require('express').Router()

// import route handlers
const postHandler = require('./post')

router.use((req, res, next) => {
  console.log('in emails index')
  next()
})

// attach handlers to router
router.post('/', postHandler)

module.exports = router
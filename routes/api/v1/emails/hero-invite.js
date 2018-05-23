// construct router
const router = require('express').Router()

// the mailer
const mailer = require('./../../../../aws').mailer

// import templates
const listHandler = require('./templates/list')
const TEMPLATE_NAMES = require('./templates/_templates').names

// tests email against regex
let emailRe = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
let validateEmail = function(email) {
    return emailRe.test(email)
}

// send an email from the template specified in the route
TEMPLATE_NAMES.forEach(((template) => {
  router.post("/" + template, function(req, res) {
    // pull in the request body info
    let vars = req.body.vars

    // send an email for each recipient
    vars.to.forEach((recipient) => {
      // get and setup the template file for each recipient
      let template_text_promise = require('./templates/_templates').GET(template + '.pug', {"name": recipient.name})

      template_text_promise.then((template_text) => {
        // make sure the email address is valid before we try to send it out
        if (validateEmail(recipient.email)) {
          // send an email out if validation checks out
          mailer.sendMail({
            from: vars.from,
            to: recipient.email,
            subject: vars.subject,
            html: template_text
          }, (err, info) => {
            if (err) {
              res.status(500).send({ error: err })
            } else {
              res.status(200).send({ info: info })
            }
          })
        }
      }, (err) => {
        console.log(err)
      })
    })
  })
}))

// test route that returns all template names
router.get("/", listHandler)

module.exports = router
// construct router
const router = require('express').Router()
const Q = require('q')

// project imports
const authRequired = require('./../../../../middleware/auth-required')
const TEMPLATE_NAMES = require('./templates/_templates').names
const helpers = require('./_mount-templates')
const templateGetter = require('./templates/_templates').GET

// set up all routes from all available templates
TEMPLATE_NAMES.forEach((template) => {
  // send an email from the template specified in the route
  router.post("/" + template, authRequired, (req, res) => {
    var promises = []
    // pull in the request body info
    let email_details = req.body

    if (!email_details.recipients) { return res.status(400).send({ error: 'no recipients included with request' }) }

    // send an email for each recipient
    email_details.recipients.forEach((recipient) => {
      // get and setup the template file for each recipient
      let template_text_promise = templateGetter(template + '.pug', { "values": recipient })
      .then((template_text) => {
          // make sure the email address is valid before we try to send it out
          if (helpers.validateEmail(recipient.email)) {
            let attachments = []
            let replyTo = ''
            /**
             * to add an attachment, add property attachment to the vars object and include:
             * @param attachment_name which is the name of the document being attached
             * @param attachment_type which is the typer of document being attached
             */
            if (recipient.vars.hasOwnProperty('attachment')) {
              attachments = [{
                filename: recipient.vars.attachment_name,
                path: recipient.vars.attachment,
                contentType: recipient.vars.attachment_type
              }]
            }
            // check if the vars object has a replyTo so we can give the person receiving email the option to reply back to an address
            if (recipient.vars.hasOwnProperty('replyTo')) {
              replyTo = recipient.vars.replyTo
            }
            // send an email out if validation checks out
            return helpers.sendEmail(email_details.from, recipient.email, email_details.subject, template_text, attachments, replyTo)
          } else {
            return {"error": {"MessageRejected": "invalid email address for " + recipient.email}}
          }
      })
      .catch((err) => {
        return res.status(500).send({ 
          message: 'error occurred during template',
          error: err
      })
      })
      promises.push(template_text_promise)
    })

    // resolve all of our promises at the end here
    Q.all(promises)
    .then((results) => {
      let error_count = 0
      let results_count = results.length

      // check through all of the results and if they are all errors, we're going to toss this to the catch
      results.forEach((result) => {
        if (result.error) {
          error_count+=1
        }
      })
      if (error_count == results_count) {
        throw error
      }
      res.status(200).send({ results: results })
    })
    .catch((err) => {
      res.status(500).send({ error: err })
    })
  })
})

module.exports = router
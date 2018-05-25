// construct router
const router = require('express').Router()
const Q = require('q')

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

/**
 * sends an email using AWS SES through nodemailer
 * @param {from} where is the email coming from (sender)
 * @param {to} where are the emails going (recipients)
 * @param {subject} subject line
 * @param {html} content of the email, from one of our templates
 * NOTE: according to AWS' documentation, the max recipient number is 50, so watch this
 */
function sendEmail(from, to, subject, html) {
  return new Promise((resolve, reject) => {
    mailer.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: html
    }, (err, success) => {
      if (err) {
        console.log(err)
        return resolve({"error": err})
      } else {
        return resolve({"success": success})
      }
    })
  })
}

// set up all routes from all available templates
TEMPLATE_NAMES.forEach((template) => {
  // send an email from the template specified in the route
  router.post("/" + template, (req, res) => {
    var promises = []
    // pull in the request body info
    let email_details = req.body

    // send an email for each recipient
    email_details.recipients.forEach((recipient) => {
      // get and setup the template file for each recipient
      let template_text_promise = require('./templates/_templates')
      .GET(template + '.pug', {"values": recipient})
      .then((template_text) => {
        // make sure the email address is valid before we try to send it out
        if (validateEmail(recipient.email)) {
          // send an email out if validation checks out
          return sendEmail(email_details.from, recipient.email, email_details.subject, template_text)
        } else {
          return {"error": {"MessageRejected": "invalid email address for " + recipient.email}}
        }
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
        throw results
      }
      res.status(200).send({ results: results })
    })
    .catch((err) => {
      res.status(500).send({ error: err })
    })
  })
})

module.exports = router
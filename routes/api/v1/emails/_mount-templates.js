// project imports
const mailer = require('./../../../../aws').mailer

// tests email against regex
let emailRe = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const validateEmail = function(email) {
  return emailRe.test(email)
}

/**
 * sends an email using AWS SES through nodemailer
 * @param {string} from where is the email coming from (sender)
 * @param {string} to where are the emails going (recipients)
 * @param {string} subject subject line
 * @param {string} html content of the email, from one of our templates
 * NOTE: according to AWS' documentation, the max recipient number is 50, so watch this
 */
const sendEmail = function(from, to, subject, html, attachments, replyTo) {
  return new Promise((resolve, reject) => {
    // email options that we setup from passed-in properties
    let mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html
    }
    // if attachments are there, let's set them up properly
    if (attachments && attachments.length>0) {
      mailOptions.attachments = attachments
    }
    // if a replyTo is specified, let's add that to the mailOptions as well
    if (replyTo && replyTo.length>0) {
      mailOptions.replyTo = replyTo
    }
    // send the email
    mailer.sendMail(mailOptions, (err, success) => {
      if (err) {
        console.error(err)
        return resolve({"error": err})
      } else {
        return resolve({"success": success})
      }
    })
  })
}

module.exports = {
  validateEmail,
  sendEmail
}
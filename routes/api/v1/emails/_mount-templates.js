// project imports
const mailer = require('./../../../../aws').mailer

// tests email against regex
let emailRe = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const validateEmail = function(email) {
  return emailRe.test(email)
}

/**
 * sends an email using AWS SES through nodemailer
 * @param {string} frome where is the email coming from (sender)
 * @param {string} to where are the emails going (recipients)
 * @param {string} subject subject line
 * @param {string} html content of the email, from one of our templates
 * NOTE: according to AWS' documentation, the max recipient number is 50, so watch this
 */
const sendEmail = function(from, to, subject, html) {
  return new Promise((resolve, reject) => {
    mailer.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: html
    }, (err, success) => {
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
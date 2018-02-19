const Mailchimp = require('mailchimp-api-v3')
const CONFIG = require('./config')

module.exports = new Mailchimp(CONFIG.MAILCHIMP.SECRET_KEY)
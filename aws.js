const nodemailer = require('nodemailer')
const SES = require('nodemailer-ses-transport')

const CONFIG = require('./config/config')

const options = {
  accessKeyId: CONFIG.SES.SES_KEY_ID,
  secretAccessKey: CONFIG.SES.SES_SECRET_KEY
}
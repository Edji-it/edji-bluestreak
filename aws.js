const nodemailer = require('nodemailer')
const AWS = require('aws-sdk')

// const CONFIG = require('./config/config')



// const SES = 



// const options = {
//   accessKeyId: CONFIG.SES.SES_KEY_ID,
//   secretAccessKey: CONFIG.SES.SES_SECRET_KEY,
//   region: "us-east-1"
// }

const mailer = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01',
    region: 'us-east-1'
  })
})

module.exports = {
  mailer: mailer
}
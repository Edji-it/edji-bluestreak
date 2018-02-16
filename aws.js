const nodemailer = require('nodemailer')
const AWS = require('aws-sdk')

const mailer = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01',
    region: 'us-east-1'
  })
})

module.exports = {
  mailer: mailer
}
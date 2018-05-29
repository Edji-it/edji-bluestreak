// package imports
const chai = require('chai')
const sinon = require('sinon')
const should = chai.should()

// project imports
const helpers = require('./_mount-templates')
const mailer = require('./../../../../aws').mailer

describe('_mount-templates', () => {
  describe('validateEmail', () => {
    it('should check that a list of valid emails return as valid', (done) => {
      const VALID_EMAILS = [
        'josh@edji.it',
        'corbin+10@edji.it',
        'cody.pumper@edji.it',
        'brennen@edji.com',
        'will@edji.it'
      ]

      VALID_EMAILS.forEach((email) => {
        let valid_email = helpers.validateEmail(email)
        valid_email.should.be.equal(true)
      })
      done()
    })
    it('should check that a list of invalid emails are invalid', (done) => {
      const INVALID_EMAILS = [
        '@edji.it',
        'corbin',
        'c@e',
        'brennen@.it',
        'willedji.it'
      ]

      INVALID_EMAILS.forEach((email) => {
        let invalid_email = helpers.validateEmail(email)
        invalid_email.should.be.equal(false)
      })
      done()
    })
  })

  describe('sendEmail', () => {
    it('should send an email with the correct email details', (done) => {
      let sendEmailStub = sinon.stub(mailer, 'sendMail').yields([null, "success"])

      let email_details = {
        from: 'test@edji.it',
        to: 'test2@edji.it',
        subject: 'Test Email',
        html: '<p>This is a test email</p>'
      }

      helpers.sendEmail(email_details.from, email_details.to, email_details.subject, email_details.html)
      .then(() => {
        // assertions
        sinon.assert.calledOnce(sendEmailStub)

        // params sent to call, in an array form
        let sendEmailParams = sendEmailStub.firstCall.args[0]
        // from
        sendEmailParams.from.should.be.equal(email_details.from)
        // to
        sendEmailParams.to.should.be.equal(email_details.to)
        // subject
        sendEmailParams.subject.should.be.equal(email_details.subject)
        // html
        sendEmailParams.html.should.be.equal(email_details.html)
        
        done()
      })
      .catch((err) => {
        done(new Error('email would not send when it should - ' + err))
      })

      sendEmailStub.restore()
    })
  })
})
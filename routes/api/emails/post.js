const mailer = require('./../../../aws').mailer

module.exports = function(req, res) {

  mailer.sendMail({
    from: 'corbin@edji.it',
    to: 'cody@edji.it',
    subject: 'From AWS!',
    text: 'I hope this message gets sent!',
    ses: { // optional extra arguments for SendRawEmail
        Tags: [{
            Name: 'what-is-this',
            Value: 'well-its-something'
        }]
    }
  }, (err, info) => {
    if (err) {
      res.status(500).send({ error: err })
    } else {
      res.status(200).send({ info: info })
    }
    // console.log(info.envelope);
    // console.log(info.messageId);
  })
}
const mailer = require('./../../../aws').mailer
const pug = require('pug')

module.exports = function(req, res) {

  mailer.sendMail({
    from: 'brennen@edji.it',
    to: 'corbin@edji.it',
    subject: 'From AWS!',
    text: 'I hope this message gets sent!'
  }, (err, info) => {
    console.log(info)
    if (err) {
      res.status(500).send({ error: err })
    } else {
      res.status(200).send({ info: info })
    }
    // console.log(info.envelope);
    // console.log(info.messageId);
  })
}
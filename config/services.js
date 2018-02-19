const joi = require('joi')

const serviceSchema = joi.object({
  AWS_ACCESS_KEY_ID: joi.string().required(),
  AWS_SECRET_ACCESS_KEY: joi.string().required(),
  MAILCHIMP_SECRET_ACCESS_KEY: joi.string().required()
})

const { error, value: serviceVars } = serviceSchema.validate(process.env, { allowUnknown: true })
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  SES: {
    KEY_ID: serviceVars.SES_KEY_ID,
    SECRET_KEY: serviceVars.SES_SECRET_KEY
  },
  MAILCHIMP: {
    SECRET_KEY: serviceVars.MAILCHIMP_SECRET_ACCESS_KEY
  }
}

module.exports = config
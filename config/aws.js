const joi = require('joi')

const awsSchema = joi.object({
  AWS_ACCESS_KEY_ID: joi.string().required(),
  AWS_SECRET_ACCESS_KEY: joi.string().required()
})

const { error, value: awsVars } = awsSchema.validate(process.env, { allowUnknown: true })
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  SES: {
    KEY_ID: awsVars.SES_KEY_ID,
    SECRET_KEY: awsVars.SES_SECRET_KEY
  }
}

module.exports = config
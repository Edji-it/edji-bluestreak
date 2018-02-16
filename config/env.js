const joi = require('joi')

const envSchema = joi.object({
  NODE_ENV: joi.strict()
    .allow(['development', 'production', 'test'])
    .required(),
  PORT: joi.number()
    .required()
})

const { error, value: envVars } = envSchema.validate(process.env, { allowUnknown: true })
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  ENV: envVars.NODE_ENV,
  SERVER: {
    PORT: envVars.PORT
  }
}

module.exports = config
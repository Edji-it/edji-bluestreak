const joi = require('joi')

const awsSchema = joi.object({
  
})

const { error, value: envVars } = joi.validate(process.env, awsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
}

module.exports = config
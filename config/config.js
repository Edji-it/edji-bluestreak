const env = require('./env')
const aws = require('./aws')

const config = Object.assign(
  {},
  env,
  aws
)

module.exports = config
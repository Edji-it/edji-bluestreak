const env = require('./env')
const aws = require('./aws')

const CONFIG = Object.assign(
  {},
  env,
  aws
)

module.exports = CONFIG
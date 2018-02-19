const env = require('./env')
const services = require('./services')

const CONFIG = Object.assign(
  {},
  env,
  services
)

module.exports = CONFIG
// constants
const TEMPLATE_NAMES = require('./_templates').names

/**
 * Goes through all available templates in the /templates/rsc folder and returns a list of templates
 */
module.exports = function(req, res) {
  return res.status(200).send({ templates: TEMPLATE_NAMES })
}
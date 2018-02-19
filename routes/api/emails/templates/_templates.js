// import packages
const fs = require('fs')

// constants
const TEMPLATE_DIR = __dirname + '/rsc'

/**
 * Reads the ./rsc directory and returns results
 * @param {function} callback (err, templates) function to which results are passed
 */
const getTemplateNames = function() {
  let pugTemplates = []

  fs.readdirSync(TEMPLATE_DIR).forEach((file) => {
    if (file.substr(file.length - 4, 4) == '.pug') {
      pugTemplates.push(file)
    }
  })
  return pugTemplates
}

const TEMPLATE_NAMES = getTemplateNames()

module.exports = {
  names: TEMPLATE_NAMES,
  dir: TEMPLATE_DIR
}
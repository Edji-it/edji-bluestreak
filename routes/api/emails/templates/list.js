// imports
const fs = require('fs')

// constants
const TEMPLATE_DIR = __dirname + '/rsc'

const getTemplateNames = function(callback) {
  let pugTemplates = []

  fs.readdir(TEMPLATE_DIR, (err, files) => {
    if (err) {
      return callback(err)
    } else if (!files) {
      return callback({ error: 'no template files located' })
    }

    files.forEach((file) => {
      if (file.substr(file.length - 4, 4) == '.pug') {
        pugTemplates.push(file)
      }
    })
    return callback(false, pugTemplates)
  })
}

/**
 * Goes through all available templates in the /templates/rsc folder and returns a list of templates
 */
module.exports = function(req, res) {
  getTemplateNames((err, templates) => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }

    return res.status(200).send({ templates: templates })
  })
}
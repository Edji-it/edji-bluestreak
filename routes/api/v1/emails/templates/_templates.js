// import packages
const fs = require('fs')
const pug = require('pug')

// constants
const TEMPLATE_DIR = __dirname + '/rsc'

/**
 * Reads the ./rsc directory and returns names of the files
 * @param {function} callback (err, templates) function to which results are passed
 */
const getTemplateNames = function() {
  let pugTemplates = []

  fs.readdirSync(TEMPLATE_DIR).forEach((file) => {
    if (file.substr(file.length - 4, 4) == '.pug') {
      pugTemplates.push(file.substr(0,file.length-4))
    }
  })
  return pugTemplates
}

/**
 * Reads the ./rsc directory and returns full filenames with extension
 * @param {function} callback (err, templates) function to which results are passed
 */
const getTemplateFiles = function() {
  let pugTemplates = []

  fs.readdirSync(TEMPLATE_DIR).forEach((file) => {
    if (file.substr(file.length - 4, 4) == '.pug') {
      pugTemplates.push(file)
    }
  })
  return pugTemplates
}

/**
 * Takes the names of all of the pug templates and preps the compiler functions
 * @param {string[]} names the template names in /rsc
 * @returns dictionary of functions which can receive objects to template according to https://pugjs.org/api/getting-started.html
 */
const getTemplateCompilers = function(names) {
  let compilers = {}
  let options = {
    "doctype": "html"
  }
  names.forEach((name) => {
    compilers[name] = pug.compileFile(TEMPLATE_DIR + '/' + name, options)
  })
  return compilers
}

const TEMPLATE_NAMES = getTemplateNames()
const TEMPLATE_FILES = getTemplateFiles()
const TEMPLATE_COMPILERS = getTemplateCompilers(TEMPLATE_FILES)

module.exports = {
  names: TEMPLATE_NAMES,
  dir: TEMPLATE_DIR,
  GET: function(name, values) {
    return new Promise((resolve, reject) => {
      let compileFunction = TEMPLATE_COMPILERS[name]
      if (!compileFunction) {
        return reject({ error: 'no such template exists' })
      }

      return resolve(compileFunction(values))
    })
  }
}
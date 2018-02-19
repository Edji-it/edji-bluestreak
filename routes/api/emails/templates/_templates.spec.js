// package imports
const chai = require('chai')
const should = chai.should()

// local imports
const templates = require('./_templates')

describe('_templates', () => {
  it('should have required properties', () => {
    templates.should.be.instanceOf(Object)
    templates.should.have.property('dir')
    templates.should.have.property('names')
  })

  describe('dir', () => {
    it('should be a string', () => {
      templates.dir.should.be.a('string')
      templates.dir.length.should.be.above(0)
    })
    it('should point to ./rsc', () => {
      templates.dir.indexOf('/rsc').should.be.above(-1)
    })
  })

  describe('names', () => {
    it('should be an array of strings', () => {
      templates.names.should.be.instanceOf(Array)
      templates.names.length.should.be.above(0)
      templates.names.forEach((name) => {
        name.should.be.a('string')
      })
    })
  })
})
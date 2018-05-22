// package imports
const chai = require('chai')
const should = chai.should()

// local imports
const templates = require('./_templates')

describe('_templates', () => {
  it('should have required properties', () => {
    templates.should.be.instanceOf(Object)
    templates.should.not.have.property('nothing')
    templates.should.have.property('dir')
    templates.should.have.property('names')
    templates.should.have.property('GET')
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

  describe('GET', () => {
    it('should be a function', () => {
      ( typeof templates.GET ).should.be.equal('function')
    })
    it('should return a promise', () => {
      let promise = templates.GET().catch((err) => { /** nothing - just shuts up unhandled rejection warning */ })
      promise.should.be.instanceOf(Promise)
    })
    it('should resolve with html when template exists', (done) => {
      templates.GET('test.pug', { name: 'Corbin' })
        .then((html) => {
          html.should.be.a('string')
          html.length.should.be.above(0)
          html.indexOf('Corbin').should.be.above(-1)
          html.indexOf('absolutely not here').should.be.equal(-1)
          done()
        })
        .catch((err) => {
          done(err)
        })
    })
    it('should not resolve with a template which does not exist', (done) => {
      templates.GET('nothing.pug', {  })
        .then((html) => {
          done('should not have resolved successfully')
        })
        .catch((err) => {
          done() // this is our expected outcome
        })
    })
  })
})
import assoc from '../assoc'
import get   from '../get'
import Immutable from 'immutable'

describe('assoc', function() {

  describe('Plain ole\' JavaScript', function() {
    let subject = { foo: 'bar' }

    it ('makes no change when assigned the same values', function() {
      assoc(subject, [ 'foo' ], 'bar').should.equal(subject)
    })

    it ('makes objects non-existant pathways', function() {
      let output = assoc(subject, [ 'different', 'path' ], 'bar')

      get(output, [ 'different', 'path' ]).should.equal('bar')
    })

    it ('it properly sets the value when given no pathway', function() {
      let output = assoc(subject, [], { reset: true})
      get(output, [ 'reset' ]).should.equal(true)
    })
  })

  describe('Immutable.Map', function() {
    let subject = Immutable.Map({ foo: 'bar' })

    it ('makes no change when assigned the same values', function() {
      assoc(subject, [ 'foo' ], 'bar').should.equal(subject)
    })

    it ('makes objects non-existant pathways', function() {
      let output = assoc(subject, [ 'different', 'path' ], 'bar')

      get(output, [ 'different', 'path' ]).should.equal('bar')
    })

    it ('it properly sets the value when given no pathway', function() {
      let output = assoc(subject, [], { reset: true})
      get(output, [ 'reset' ]).should.equal(true)
    })
  })

  describe('Immutable.Record', function() {
    let subject = Immutable.Record({ foo: 'bar' })()

    it ('makes no change when assigned the same values', function() {
      assoc(subject, [ 'foo' ], 'bar').should.equal(subject)
    })

    it ('throws an error on non-existant pathways', function(done) {
      try {
        assoc(subject, [ 'different', 'path' ], 'bar')
      } catch(x) {
        x.should.be.instanceOf(Error)
        done()
      }
    })
  })

  describe('Immutable.List', function() {
    let subject = Immutable.List([ 'foo', 'bar' ])

    it ('makes no change when assigned the same values', function() {
      assoc(subject, [ 0 ], 'foo').should.equal(subject)
    })

    it ('makes objects non-existant pathways', function() {
      let output = assoc(subject, [ 2, 'three' ], 'wut')

      get(output, [ 2, 'three' ]).should.equal('wut')
    })
  })
})

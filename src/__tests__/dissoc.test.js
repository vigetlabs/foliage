import dissoc   from '../dissoc'
import get       from '../get'
import Immutable from 'immutable'

describe('dissoc', function() {

  describe('Plain ole\' JavaScript', function() {
    let sample = { foo: 'bar' }

    it ('does not modify missing keys', function() {
      dissoc(sample, [ 'missing' ]).should.equal(sample)
    })

    it ('removes properties', function() {
      dissoc(sample, [ 'foo' ]).should.eql({})
    })

    it ('prunes empty objects', function() {
      dissoc({ one: { two: 'three' } }, [ 'one', 'two' ]).should.eql({})
    })
  })

  describe('Immutable.Map', function() {
    let sample = Immutable.Map({ foo: 'bar' })

    it ('does not modify missing keys', function() {
      dissoc(sample, [ 'missing' ]).should.equal(sample)
    })

    it ('removes properties', function() {
      let next = dissoc(sample, [ 'foo' ])
      next.size.should.equal(0)
    })
  })

  describe('Immutable.List', function() {
    let sample = Immutable.List([ 'one', 'two'])

    it ('does not modify missing keys', function() {
      let next = dissoc(sample, [ 0 ])
      next.get(0).should.equal('two')
    })
  })

})

import dissoc from '../dissoc'

describe('dissoc', function() {

  describe('when removing a value that is not already present', function() {

    it ('does nothing', function() {
      let sample = { foo: 'bar' }
      dissoc(sample, [ 'missing' ]).should.equal(sample)
    })

  })

  describe('when removing a key from a section', function() {

    it ('purges empty values', function() {
      let sample = { foo: { bip: 'baz' }}
      dissoc(sample, [ 'foo', 'bip' ]).should.eql({})
    })

  })

})

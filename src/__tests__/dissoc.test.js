import dissoc from '../dissoc'

describe('dissoc', function() {

  describe('when removing a value that is not already present', function() {

    it ('does nothing', function() {
      let sample = { foo: 'bar' }
      dissoc(sample, [ 'missing' ]).should.equal(sample)
    })

  })

})

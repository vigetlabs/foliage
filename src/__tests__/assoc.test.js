import assoc from '../assoc'

describe('assoc', function() {

  describe('when assigning a value that already is present', function() {

    it ('does nothing', function() {
      let sample = { foo: 'bar' }
      assoc(sample, [ 'foo' ], 'bar').should.equal(sample)
    })

  })

  describe('when assigning a deeper than a pathway that exists', function() {

    it ('sets the intermediary values to objects', function() {
      let sample = {}
      let output = assoc(sample, [ 'foo', 'step' ], 'bar')

      output.foo.step.should.equal('bar')
    })

  })

})

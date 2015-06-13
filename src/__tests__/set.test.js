let set = require('../set')

describe('set', function() {

  it ('supports plain strings', function() {
    let sample = { foo: 'bar' }
    set(sample, 'foo', 'bar').should.equal(sample)
  })

  it ('throws an error if attempting to set non-object values', function(done) {
    let sample = { foo: null }

    try {
      set(sample, [ 'foo', 'bar' ], 'baz')
    } catch(x) {
      x.should.be.instanceOf(TypeError)
      done()
    }
  })

  it ('makes no change when assigned the same values', function() {
    let sample = { foo: 'bar' }
    set(sample, [ 'foo' ], 'bar').should.equal(sample)
  })

  it ('makes objects non-existant pathways', function() {
    let sample = {}
    let output = set(sample, [ 'foo', 'step' ], 'bar')

    output.foo.step.should.equal('bar')
  })

  it ('it properly sets the value when given no pathway', function() {
    let sample = {}
    let output = set(sample, [], { foo: 'bar' })

    output.foo.should.equal('bar')
  })

})

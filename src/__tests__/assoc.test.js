import assoc from '../assoc'

describe('assoc', function() {

  it ('makes no change when assigned the same values', function() {
    let sample = { foo: 'bar' }
    assoc(sample, [ 'foo' ], 'bar').should.equal(sample)
  })

  it ('makes objects non-existant pathways', function() {
    let sample = {}
    let output = assoc(sample, [ 'foo', 'step' ], 'bar')

    output.foo.step.should.equal('bar')
  })

  it ('it properly sets the value when given no pathway', function() {
    let sample = {}
    let output = assoc(sample, [], { foo: 'bar' })

    output.foo.should.equal('bar')
  })

})

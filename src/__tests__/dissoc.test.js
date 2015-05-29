import dissoc from '../dissoc'

describe('dissoc', function() {

  it ('does not modify missing keys', function() {
    let sample = { foo: 'bar' }
    dissoc(sample, [ 'missing' ]).should.equal(sample)
  })

  it ('removes properties', function() {
    let sample = { foo: 'bar' }
    dissoc(sample, [ 'foo' ]).should.eql({})
  })

  it ('prunes empty objects', function() {
    let sample = { one: { two: 'three' } }
    dissoc(sample, [ 'one', 'two' ]).should.eql({})
  })

})

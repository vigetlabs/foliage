let remove = require('../remove')

describe('remove', function() {

  it ('supports plain strings', function() {
    let sample = { foo: 'bar' }
    remove(sample, 'foo', 'bar').should.eql({})
  })

  it ('properly prunes null values', function() {
    let sample = { foo: null }
    remove(sample, 'foo').should.eql({})
  })

  it ('does not modify missing keys', function() {
    let sample = { foo: 'bar' }
    remove(sample, [ 'missing' ]).should.equal(sample)
  })

  it ('removes properties', function() {
    let sample = { foo: 'bar' }
    remove(sample, [ 'foo' ]).should.eql({})
  })

  it ('prunes empty objects', function() {
    let sample = { one: { two: 'three' } }
    remove(sample, [ 'one', 'two' ]).should.eql({})
  })

})

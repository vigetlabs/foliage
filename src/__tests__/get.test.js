let get = require('../get')

describe('get', function() {
  let data = { first: 1 }

  it ('returns a given value', function() {
    get(data, [ 'first' ]).should.equal(1)
  })

  it ('handles plain string keypaths', function() {
    get(data, 'first').should.equal(1)
  })

  it ('returns a fallback if a path is undefined', function() {
    get({}, [ 'first' ], 'fiz').should.equal('fiz')
  })

  it ('does not return a fallback if a path is null', function() {
    expect(get({ first: null }, [ 'first' ], 'fiz')).to.equal(null)
  })
})

import values from '../values'
import { Map, Set } from 'immutable'

describe('Values', function() {

  it ('works for objects', function() {
    values({ a: 1, b: 2, c: 3 }).should.eql([1,2,3])
  })

  it ('works for arrays', function() {
    values([ 1, 2, 3 ]).should.eql([1,2,3])
  })

  it ('works for maps', function() {
    let sample = Map({ a: 1, b: 2, c: 3 })
    values(sample).should.eql([ 1, 2, 3])
  })

  it ('works for sets', function() {
    values(Set([1,2,3])).should.eql([1,2,3])
  })

})

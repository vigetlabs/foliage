import keys from '../keys'
import { Map, List } from 'immutable'

describe.only('Keys', function() {

  it ('works for objects', function() {
    keys({ a: 1, b: 2, c: 3 }).should.eql(['a', 'b', 'c'])
  })

  it ('works for arrays', function() {
    keys([ 'a', 'b', 'c' ]).should.eql([ '0', '1', '2' ])
  })

  it.only ('works for maps', function() {
    let sample = Map({ a: 1, b: 2, c: 3 })
    keys(sample).should.eql([ 'a', 'b', 'c'])
  })

  it ('works for lists', function() {
    keys(List([1, 2, 3])).should.eql([0, 1, 2])
  })

})

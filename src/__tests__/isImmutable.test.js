import isImmutable from '../isImmutable'
import { Map, List, Record, Set, Stack, Range, Repeat, Seq, Iterable } from 'immutable'

describe('isImmutable', function() {
  const YES = [ Map, List, Record({}), Set, Stack, Range, Repeat, Seq, Iterable ]
  const NO  = [ {}, [], true, false, 'string', undefined, null]

  NO.forEach(function(value) {
    it (`returns false for ${ value }`, function() {
      isImmutable(value).should.equal(false)
    })
  })

  YES.forEach(function(Struct) {
    it (`returns true for Immutable ${ Struct.name }`, function() {
      isImmutable(Struct()).should.equal(true)
    })
  })

})

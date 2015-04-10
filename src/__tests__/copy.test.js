import copy from '../copy'

describe('copy', function() {

  describe('when given an array', function() {

    it ('returns a duplicate of that array', function() {
      copy([1,2,3]).should.eql([1,2,3])
    })

  })

})

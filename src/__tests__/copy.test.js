import copy from '../copy'

describe('copy', function() {

  it ('duplicates arrays', function() {
    copy([1,2,3]).should.eql([1,2,3])
  })

})

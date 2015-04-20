import Foliage from '../Foliage'

describe('Foliage', function() {

  it ('passes properties down to children', function() {
    class Oak extends Foliage {
      test() {
        return true
      }
    }

    let oak   = new Oak()
    let acorn = oak.refine('acorns')

    acorn.test().should.equal(true)
  })

})

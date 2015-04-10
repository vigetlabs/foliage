import Foliage from '../index'

describe('Foliage', function() {

  it ('passes properties down to children', function() {
    class Oak extends Foliage {
      test() {
        return true
      }
    }

    let oak   = new Oak()
    let acorn = oak.get('acorns')

    acorn.test().should.equal(true)
  })

})

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

  it ('properly sets keys on children', function() {
    class Oak extends Foliage {}

    let oak   = new Oak({ acorns: {} })
    let acorn = oak.refine('acorns')

    acorn.set({ fiz: 'buz' })
    acorn.get('fiz').should.equal('buz')
  })

})

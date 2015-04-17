import Foliage from '../Foliage'

describe('Equality', function() {

  it ('compares equality across branches', function() {
    let plant = new Foliage({ foo: 'bar' })

    let a = plant.graft('foo')
    let b = plant.graft('foo')

    a.is(b).should.equal(true)
  })

  it ('compares equality across plants', function() {
    let a = new Foliage({ foo: 'bar' })
    let b = new Foliage({ foo: 'bar' })

    a.graft('foo').is(b.graft('foo')).should.equal(true)
  })

})

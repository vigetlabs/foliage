import Foliage from '../Foliage'

describe('Equality', function() {

  it ('compares equality across branches', function() {
    let plant = new Foliage({ foo: 'bar' })

    let a = plant.get('foo')
    let b = plant.get('foo')

    a.is(b).should.equal(true)
  })

  it ('compares equality across plants', function() {
    let a = new Foliage({ foo: 'bar' })
    let b = new Foliage({ foo: 'bar' })

    a.get('foo').is(b.get('foo')).should.equal(true)
  })

})

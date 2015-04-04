import Foliage from '../index'

describe('new Foliage', function() {

  let shallow = { first: 1 }
  let deep    = { first: { second: 2 } }

  describe('Foliage::get', function() {
    it ('returns a given value', function() {
      let plant = new Foliage(shallow)
      plant.get('first').should.equal(1)
    })

    it ('returns a nested given value', function() {
      let plant = new Foliage(deep)
      plant.get(['first', 'second']).should.equal(2)
    })
  })

  describe('Foliage::set', function() {
    it ('can set a new value', function() {
      let plant = new Foliage(shallow)

      plant.set('first', 'modified')
      plant.get('first').should.equal('modified')
    })
  })

  describe('Foliage::branch', function() {
    it ('gets a new Foliage instance at a key', function() {
      let plant  = new Foliage(shallow)
      let branch = plant.branch('first')

      branch.value().should.equal(1)
    })
  })

  describe('Foliage::trunk', function() {
    it ('can identify its root', function() {
      let plant  = new Foliage(shallow)
      let branch = plant.branch('first')

      branch.trunk().should.equal(plant)
    })
  })

  describe('Foliage::keys', function() {
    it ('returns top level keys', function() {
      let plant = new Foliage(deep)

      plant.keys().should.eql(['first'])
    })
  })

  describe('Foliage::values', function() {
    it ('returns top level values', function() {
      let plant = new Foliage(shallow)

      plant.values().should.eql([1])
    })
  })

  describe('Foliage::map', function() {
    it ('maps over top level values', function() {
      let plant = new Foliage(shallow)
      let incr = i => i + 1

      plant.map(incr).should.eql([2])
    })
  })

  describe('Foliage::filter', function() {
    it ('filters top level values', function() {
      let plant = new Foliage({ first: 1, second: 2 })
      let even  = n => (n % 2 === 0)

      plant.filter(even).should.eql([2])
    })
  })

  describe('Foliage::find', function() {
    it ('returns the first result of filter', function() {
      let plant = new Foliage({ first: 1, second: 2 })
      let even  = n => (n % 2 === 0)

      plant.find(even).should.eql(2)
    })
  })

  describe('Foliage::reduce', function() {
    it ('reduces over top level values', function() {
      let plant = new Foliage({ first: 1, second: 2 })
      let sum   = (a, b) => a + b

      plant.reduce(sum, 0).should.equal(3)
    })
  })

  describe('Foliage::value', function() {
    it ('returns the wrapped value of the instance', function() {
      let plant = new Foliage({ first: 1, second: 2 })

      plant.value().should.have.property('first', 1)
      plant.value().should.have.property('second', 2)
    })

    it ('aliases valueOf', function() {
      let plant = new Foliage({ first: 1, second: 2 })

      plant.value().should.equal(plant.valueOf())
    })
  })

})

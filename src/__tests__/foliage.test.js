import Foliage, { Cursor } from '../index'

describe('Foliage', function() {
  let shallow = { first: 1 }
  let deep    = { first: { second: 2, tertiary: true } }

  describe('Foliage::get', function() {

    it ('returns a given value', function() {
      let plant = new Foliage(shallow)
      let query = plant.get('first')

      query.valueOf().should.equal(1)
    })

    it ('returns a nested given value', function() {
      let plant = new Foliage(deep)
      plant.get(['first', 'second']).valueOf().should.equal(2)
    })

    it ('nests keys from the results of previous queries', function() {
      let plant  = new Foliage(deep)
      let first  = plant.get('first')
      let second = first.get('second')

      second.valueOf().should.equal(2)
    })

  })

  describe('Foliage::set', function() {
    it ('can set a new value', function() {
      let plant = new Foliage(shallow)

      plant.set('first', 'modified')
      plant.get('first').valueOf().should.equal('modified')
    })

    it ('assumes a single argument sets the entire state', function() {
      let plant = new Foliage({ fiz: 'buz'})
      let query = plant.get('fiz')

      query.set('foo')
      query.valueOf().should.equal('foo')

      plant.get('fiz').valueOf().should.equal('foo')
    })

    it ('sets the original state from a cursor', function() {
      let plant = new Foliage(deep)
      let query = plant.get('first')

      query.set('second', 'modified')

      plant.get([ 'first', 'second' ]).valueOf().should.equal('modified')
    })

    it ('triggers a change event on the cursor', function(done) {
      let plant = new Foliage(deep)
      let query = plant.get('first')

      query.listen(done)
      query.set('second', 'modified')
    })

    it ('triggers a change event on the parent', function(done) {
      let plant = new Foliage(deep)
      let query = plant.get('first')

      plant.listen(done)
      query.set('second', 'modified')
    })

    it ('does not trigger a change event on siblings', function(done) {
      let plant = new Foliage({ first: 'first', second: 'second' })
      let a = plant.get('first')
      let b = plant.get('second')

      b.listen(function() {
        throw "Sibling should not have triggered event"
      })

      a.listen(done)

      a.set('modified')
    })
  })

  describe('Foliage::remove', function() {
    it ('can remove a new value', function() {
      let plant = new Foliage(shallow)

      plant.remove('first')

      plant.valueOf().should.not.have.property('first')
    })

    it ('removes from original state in a cursor', function() {
      let plant = new Foliage(deep)
      let query = plant.get('first')

      query.remove('second')

      plant.valueOf().first.should.not.have.property('second')
    })
  })

  describe('Foliage::map', function() {
    let incr = i => i + 1

    it ('map over top level elements', function() {
      let plant = new Foliage([ 1, 2, 3])
      plant.map(incr).should.eql([ 2, 3, 4])
    })

    it ('map over cursors', function() {
      let plant = new Foliage({ first: [ 1, 2, 3] })
      let query = plant.get('first')

      query.map(incr).should.eql([ 2, 3, 4])
    })
  })

  describe('Foliage::reduce', function() {
    let sum = (a, b) => a + b

    it ('reduce over top level elements', function() {
      let plant = new Foliage([ 1, 2, 3])

      plant.reduce(sum, 0).should.eql(6)
    })

    it ('reduce over cursors', function() {
      let plant = new Foliage({ first: [ 1, 2, 3] })
      let query = plant.get('first')

      query.reduce(sum, 0).should.eql(6)
    })
  })

  describe('Foliage::filter', function() {
    let even = n => (n % 2 === 0)

    it ('filter out extraneous values', function() {
      let plant = new Foliage([ 1, 2, 3])

      plant.filter(even).should.eql([2])
    })

    it ('filters over cursors', function() {
      let plant = new Foliage({ first: [ 1, 2, 3] })
      let query = plant.get('first')

      query.filter(even).should.eql([2])
    })
  })

  describe('Foliage::find', function() {
    let even = n => (n % 2 === 0)

    it ('returns the first answer of a filter', function() {
      let plant = new Foliage([ 1, 2, 3, 4])

      plant.find(even).should.eql(2)
    })

    it ('finds over cursors', function() {
      let plant = new Foliage({ first: [ 1, 2, 3, 4] })
      let query = plant.get('first')

      query.find(even).should.eql(2)
    })
  })

  describe('Foliage::trunk', function() {
    it ('returns itself if it is the root', function() {
      let plant = new Foliage([ 1, 2, 3, 4])
      plant.trunk().should.equal(plant)
    })

    it ('returns its source if it is a cursor', function() {
      let plant = new Foliage({ first: [ 1, 2, 3, 4] })
      let query = plant.get('first')

      query.trunk().should.equal(plant)
    })
  })

  describe('Foliage::toJSON', function() {
    let data = [1,2,3,4]
    it ('returns the source value of it is root', function() {
      let plant = new Foliage(data)
      plant.toJSON().should.equal(data)
    })

    it ('returns the subset if it is a cursor', function() {
      let plant = new Foliage({ first: data })
      let query = plant.get('first')

      query.toJSON().should.equal(data)
    })
  })

})

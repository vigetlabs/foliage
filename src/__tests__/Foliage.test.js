import Foliage from '../Foliage'

describe('Foliage', function() {
  let shallow = { first: 1 }
  let deep    = { first: { second: 2, tertiary: true } }

  describe('Foliage::get', function() {

    it ('returns cursor to a given pathway', function() {
      let plant = new Foliage(shallow)
      let query = plant.get('first')

      query.getPath().should.eql(['first'])
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

  describe('Foliage::fetched', function() {
    it ('returns a given value', function() {
      let plant = new Foliage(shallow)
      plant.fetch('first').should.equal(1)
    })

    it ('returns a fallback if a path is not represented', function() {
      let plant = new Foliage()
      plant.fetch('first', 'fiz').should.equal('fiz')
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

    it ('defines pathways that have not been set yet', function() {
      let plant = new Foliage()
      let query = plant.get('first')

      query.set('second', 'modified')

      plant.get([ 'first', 'second' ]).valueOf().should.equal('modified')
    })

    it ('can set when assuming a pathway', function() {
      let plant = new Foliage()
      let query = plant.get('first')

      query.set('second', 'modified')

      plant.get([ 'first', 'second' ]).valueOf().should.equal('modified')
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

  describe('when no value is set for a key', function() {
    let plant = new Foliage()

    it ('returns an empty list when asking for keys', function() {
      plant.keys().should.eql([])
    })

    it ('returns an empty list when asking for values', function() {
      plant.values().should.eql([])
    })

    describe('when a cursor is empty', function() {
      let cursor = plant.get('fiz')

      it ('returns an empty list when asking for keys', function() {
        cursor.keys().should.eql([])
      })

      it ('returns an empty list when asking for values', function() {
        cursor.values().should.eql([])
      })
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

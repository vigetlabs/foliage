import Foliage from '../Foliage'

describe('Foliage', function() {
  let shallow = { first: 1 }
  let deep    = { first: { second: 2, tertiary: true } }

  it ('always starts with the same state', function() {
    new Foliage().is(new Foliage()).should.equal(true)
  })

  it ('can be inherited from', function(done) {
    class MyThing extends Foliage {
      constructor() {
        super()
        this.should.have.property('state')
        done()
      }
    }

    new MyThing('yes')
  })

  describe('When commiting new state', function() {
    it ('commits the same empty state on null', function(done) {
      let plant = new Foliage()

      plant.subscribe(function() {
        throw Error('Should not have emitted but did')
      })

      plant.commit(null)

      setTimeout(done, 100)
    })

    it ('commits nothing if given `undefined`', function(done) {
      let plant = new Foliage({ foo: 'bar' })

      plant.subscribe(function() {
        throw Error('Should not have emitted but did')
      })

      plant.commit()
      plant.commit(undefined)

      setTimeout(done, 100)
    })
  })

  describe('Foliage::set', function() {
    it ('can set a new value', function() {
      let plant = new Foliage(shallow)

      plant.set('first', 'modified')
      plant.get('first').should.equal('modified')
    })

    it ('assumes a single argument sets the entire state', function() {
      let plant = new Foliage()
      let query = plant.refine('fiz')

      query.set({ foo: 'bar' })
      query.get().should.have.property('foo', 'bar')

      plant.get('fiz').should.have.property('foo')
    })

    it ('sets the original state from a cursor', function() {
      let plant = new Foliage(deep)
      let query = plant.refine('first')

      query.set('second', 'modified')

      plant.get([ 'first', 'second' ]).should.equal('modified')
    })

    it ('defines pathways that have not been set yet', function() {
      let plant = new Foliage()
      let query = plant.refine('first')

      query.set('second', 'modified')

      plant.get([ 'first', 'second' ]).should.equal('modified')
    })

    it ('can set when assuming a pathway', function() {
      let plant = new Foliage({ route: {} })
      let query = plant.refine('route')

      query.set({ params: 'modified' })
      query.get('params').should.equal('modified')
      plant.get([ 'route', 'params' ]).should.equal('modified')
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
      let query = plant.refine('first')

      query.remove('second')

      plant.valueOf().first.should.not.have.property('second')
    })

    it ('does not leave an empty, enumerable value', function() {
      let plant = new Foliage(deep)
      let query = plant.refine('first')

      query.remove('second')
      query.values().length.should.equal(1)
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
      let cursor = plant.refine('fiz')

      it ('returns an empty list when asking for keys', function() {
        cursor.keys().should.eql([])
      })

      it ('returns an empty list when asking for values', function() {
        cursor.values().should.eql([])
      })
    })
  })

  describe('Foliage::refine', function() {

    it ('returns cursor to a given pathway', function() {
      let plant = new Foliage(shallow)
      let query = plant.refine('first')

      query.getPath().should.eql(['first'])
    })

    it ('returns a nested given value', function() {
      let plant = new Foliage(deep)
      plant.refine(['first', 'second']).valueOf().should.equal(2)
    })

    it ('nests keys from the results of previous queries', function() {
      let plant  = new Foliage(deep)
      let first  = plant.refine('first')
      let second = first.refine('second')

      second.get().should.equal(2)
    })

  })

  describe('Foliage::toJSON', function() {
    let data = [1,2,3,4]

    it ('returns the source value of it is root', function() {
      let plant = new Foliage(data)
      plant.toJSON().should.equal(data)
    })

    it ('returns the subset if it is a cursor', function() {
      let plant = new Foliage({ first: { second: data } })
      let query = plant.refine([ 'first', 'second' ])

      query.toJSON().should.equal(data)
    })
  })

  describe('Foliage::getRoot', function() {

    it ('returns the root plant', function() {
      let plant = new Foliage()
      let query = plant.refine('child')
      let subquery = query.refine('child')

      subquery.getRoot().should.equal(plant)
    })
  })

  describe('Foliage::values', function() {

    it ('properly handles fallbacks', function() {
      let plant = new Foliage({ foo: undefined })
      expect(plant.first()).to.equal(undefined)
    })
  })

  describe('Foliage::clear', function() {

    it ('nullifies the current value', function() {
      let plant = new Foliage({ foo: 'hey' })

      plant.clear()

      expect(plant.get('foo')).to.equal(undefined)
    })
  })

  describe('Foliage::update', function() {

    it ('can replace multiple keys at a point', function() {
      let plant = new Foliage({ foo: 'hey' })

      plant.update('foo', { one: 1, two: 2 })

      plant.get('foo').should.have.property('one', 1)
      plant.get('foo').should.have.property('two', 2)
    })

    it ('can replace multiple keys with no point', function() {
      let plant = new Foliage({ foo: 'hey' })

      plant.update({ foo: 'bar', baz: 'bip' })

      plant.get('foo').should.equal('bar')
      plant.get('baz').should.equal('bip')
    })

    it ('can operate on arrays', function() {
      let plant = new Foliage([ 'not updated' ])

      plant.update([ 'updated' ])

      plant.get(0).should.equal('updated')
    })
  })
})

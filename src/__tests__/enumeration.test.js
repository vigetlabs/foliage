import Foliage from '../Foliage'

describe('Foliage', function() {
  let array, object, tests

  beforeEach(function() {
    array = [1, 2, 3, 4 ]
    object = { a: 1, b: 2, c: 3, d: 4 }

    tests = new Foliage([
      [ 'map',    (i => i + 1) ],
      [ 'reduce', ((a, b) => a + b), 0],
      [ 'filter', (n => (n % 2 === 0)) ],
      [ 'some',   (i => i === 2) ],
      [ 'every',  (i => i < 10) ],
      [ 'join',   ', '],
      [ 'indexOf', 2]
    ])
  })

  it ('properly associates enumerable methods', function() {
    tests.forEach(function([method, ...args]) {
      describe(`Foliage::${method}`, function() {

        it ('works at the root level with arrays', function() {
          let plant    = new Foliage(array)
          let expected = array[method](...args)

          plant[method](...args).should.eql(expected)
        })

        it ('works at the root level with objects', function() {
          let plant    = new Foliage(object)
          let expected = plant.values()[method](...args)

          plant[method](...args).should.eql(expected)
        })

        it ('works at a sub-level with arrays', function() {
          let plant    = new Foliage({ body: array })
          let query    = plant.refine('body')
          let expected = array[method](...args)

          query[method](...args).should.eql(expected)
        })

        it ('works at a sub-level level with objects', function() {
          let plant    = new Foliage({ body : object })
          let query    = plant.refine('body')
          let expected = query.values()[method](...args)

          query[method](...args).should.eql(expected)
        })

      })
    })

    // Find must be tested separately because the native implementation is not
    // well supported
    describe('Foliage::find', function() {
      let even = n => (n % 2 === 0)

      it ('returns the first answer of an array filter', function() {
        let plant = new Foliage([ 1, 2, 3, 4])
        plant.find(even).should.eql(plant.filter(even).unshift())
      })

      it ('returns the first answer of an object filter', function() {
        let plant = new Foliage({ a: 1, b: 2, c: 3, d: 4 })
        plant.find(even).should.eql(plant.filter(even).unshift())
      })
    })

    describe('Foliage::first', function() {
      it ('returns the first value in an array', function() {
        let plant = new Foliage([ 1, 2, 3, 4])
        plant.first().should.equal(1)
      })

      it ('returns the first value in an object', function() {
        let plant = new Foliage({ a: 1, b: 2, c: 3, d: 4 })
        plant.first().should.equal(1)
      })
    })

    describe('Foliage::last', function() {
      it ('returns the last value in an array', function() {
        let plant = new Foliage([ 1, 2, 3, 4])
        plant.last().should.equal(4)
      })

      it ('returns the last value of an object', function() {
        let plant = new Foliage({ a: 1, b: 2, c: 3, d: 4 })
        plant.last().should.equal(4)
      })
    })

    describe('Foliage::size', function() {
      it ('returns the last value in an array', function() {
        let plant = new Foliage([ 1, 2, 3, 4])
        plant.size().should.equal(4)
      })

      it ('returns the last value of an object', function() {
        let plant = new Foliage({ a: 1, b: 2, c: 3 })
        plant.size().should.equal(3)
      })
    })

    describe('Foliage::includes', function() {
      it ('returns a boolean if a value is present in an array', function() {
        let plant = new Foliage([ 1, 2, 3, 4])
        plant.includes(1).should.equal(true)
        plant.includes('a').should.equal(false)
      })

      it ('returns a boolean if a value is present in an object', function() {
        let plant = new Foliage({ a: 1, b: 2, c: 3, d: 5 })
        plant.includes(1).should.equal(true)
        plant.includes('a').should.equal(false)
      })
    })
  })
})

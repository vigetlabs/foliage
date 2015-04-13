import Foliage from '../Foliage'

describe('Foliage', function() {
  let shallow = { first: 1 }
  let deep    = { first: { second: 2, tertiary: true } }

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

})

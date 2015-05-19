import Foliage from '../Foliage'

describe('Foliage Events', function() {

  it ('emits a change event whenever it commits', function(done) {
    let plant = new Foliage()

    plant.subscribe(function(state) {
      state.should.have.property('foo', 'bar')
      done()
    })

    plant.set('foo', 'bar')
  })

})

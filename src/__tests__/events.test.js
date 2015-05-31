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

  it ('does not emit changes when no modification occurs', function(done) {
    let plant = new Foliage({ foo: 'bar' })
    let mock  = sinon.mock()

    plant.subscribe(mock)
    plant.set('foo', 'bar')

    setTimeout(function() {
      mock.should.not.have.been.called
      done()
    }, 100)
  })

})

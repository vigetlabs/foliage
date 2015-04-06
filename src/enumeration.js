/**
 * Enumeration
 * A stand alone mixin for collection methods
 */

// Which methods should be pulled out of the array prototype?
const allowed = [ 'map', 'reduce', 'filter', 'some', 'every' ]

let enumeration = {

  values() {
    let value = this.valueOf()
    return Object.keys(value).map(key => value[key])
  },

  find() {
    return this.filter.apply(this, arguments)[0]
  }

}

allowed.forEach(function(key) {
  enumeration[key] = function(...args) {
    return this.values()[key](...args)
  }
})

export default enumeration

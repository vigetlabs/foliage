/**
 * Foliage
 */

let assoc  = require('./assoc')
let dissoc = require('./dissoc')
let get    = require('./get')

function Foliage (state) {
  this._path  = []
  this._root  = this
  this._state = state
}

Foliage.prototype = {

  getPath(key) {
    return key ? this._path.concat(key) : this._path
  },

  commit(state) {
    this._root._state = state
  },

  get(key) {
    return Object.create(this, {
      _path : { value: this.getPath(key) }
    })
  },

  set(key, value) {
    if (arguments.length === 1) {
      value = arguments[0]
      key   = undefined
    }

    this.commit(assoc(this._state, this.getPath(key), value))
  },

  remove(key) {
    this.commit(dissoc(this._state, this.getPath(key)))
  },

  fetch(key, fallback) {
    let val = this.get(key).valueOf()
    return val === undefined ? fallback : val
  },

  keys() {
    return Object.keys(this.valueOf() || {})
  },

  values() {
    return this.keys().map(this.fetch, this)
  },

  valueOf() {
    return get(this._state, this.getPath())
  },

  toJSON() {
    return this.valueOf()
  },

  toArray() {
    return this.values()
  },

  find() {
    return this.filter(...arguments)[0]
  }

}

// Add collection methods
let methods = [ 'map', 'reduce', 'filter', 'forEach' ]

methods.forEach(function(name) {
  Foliage.prototype[name] = function() {
    return this.toArray()[name](...arguments)
  }
})

module.exports = Foliage

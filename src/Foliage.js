/**
 * Foliage
 */

let assoc  = require('./assoc')
let dissoc = require('./dissoc')
let get    = require('./get')
let hasKey = require('./has')

function Foliage (state, fallback) {
  this._path  = []
  this._root  = this
  this._state = state
}

Foliage.prototype = {

  getPath(key) {
    return key ? this._path.concat(key) : this._path
  },

  getState() {
    return this._state
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

    this.commit(assoc(this.getState(), this.getPath(key), value))
  },

  remove(key) {
    this.commit(dissoc(this.getState(), this.getPath(key)))
  },

  has(key) {
    return hasKey(this.getState(), this.getPath(key))
  },

  fetch(key, fallback) {
    return this.has(key) ? this.get(key).valueOf() : fallback
  },

  keys() {
    return Object.keys(this.valueOf() || {})
  },

  values() {
    let value = this.valueOf()
    return this.keys().map(k => value[k])
  },

  valueOf() {
    return get(this.getState(), this.getPath())
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

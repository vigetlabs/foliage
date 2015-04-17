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

  getRoot() {
    return this._root
  },

  commit(state) {
    this._root._state = state
  },

  get(key, fallback) {
    return get(this._state, this.getPath(key), fallback)
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

  graft(key) {
    return Object.create(this, {
      _path : { value: this.getPath(key) }
    })
  },

  keys() {
    return Object.keys(this.valueOf() || {})
  },

  values() {
    return this.keys().map(i => this.get(i))
  },

  valueOf() {
    return get(this._state, this.getPath())
  },

  toJSON() {
    return this.valueOf()
  },

  is(branch) {
    return branch.valueOf() == this.valueOf()
  },

  find() {
    return this.filter(...arguments)[0]
  }

}

// Add collection methods
let methods = [ 'map', 'reduce', 'filter', 'forEach' ]

methods.forEach(function(name) {
  Foliage.prototype[name] = function() {
    return this.values()[name](...arguments)
  }
})

module.exports = Foliage

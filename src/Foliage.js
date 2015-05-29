/**
 * A tree data structure that spawns branches pointing to
 * various locations within itself.
 *
 * @param {Object} state - The initial state of the instance
 */

let Diode   = require('diode')
let adaptor = require('./adaptors')

function Foliage (state) {
  Diode(this)

  this._path = []
  this._root = this

  this.commit(state)
}

Foliage.prototype = {
  getPath(key) {
    return this._path.concat(key).filter(i => i !== undefined)
  },

  getRoot() {
    return this._root
  },

  commit(state) {
    this.getRoot()._state = state
    this.volley(state)
  },

  clear() {
    this.commit()
  },

  get(key, fallback) {
    return adaptor(this._state, 'get', this.getPath(key)) || fallback
  },

  set(key, value) {
    if (arguments.length === 1) {
      value = arguments[0]
      key   = undefined
    }

    this.commit(adaptor(this._state, 'set', this.getPath(key), value))
  },

  update(key, obj) {
    if (arguments.length === 1) {
      obj = arguments[0]
      key = undefined
    }

    for (let prop in obj) {
      this.set([ key, prop ], obj[prop])
    }
  },

  remove(key) {
    this.commit(adaptor(this._state, 'remove', this.getPath(key)))
  },

  refine(key) {
    return Object.create(this, {
      _path : { value: this.getPath(key) }
    })
  },

  keys() {
    return adaptor(this.valueOf(), 'keys')
  },

  values() {
    return adaptor(this.valueOf(), 'values')
  },

  valueOf() {
    return adaptor(this._state, 'get', this.getPath())
  },

  toJSON() {
    return this.valueOf()
  },

  is(branch) {
    return branch.valueOf() == this.valueOf()
  },

  find(fn, scope) {
    return this.filter(fn, scope)[0]
  },

  first() {
    return this.values().shift()
  },

  last() {
    return this.values().pop()
  },

  size() {
    return this.values().length
  }

}

// Add collection methods
let methods = [ 'sort', 'map', 'reduce', 'filter', 'forEach', 'some', 'every']

methods.forEach(function(name) {
  Foliage.prototype[name] = function() {
    return this.values()[name](...arguments)
  }
})

module.exports = Foliage

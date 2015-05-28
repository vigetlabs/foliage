/**
 * A tree data structure that spawns branches pointing to
 * various locations within itself.
 *
 * @param {Object} state - The initial state of the instance
 */

let assoc    = require('./assoc')
let dissoc   = require('./dissoc')
let getIn    = require('./get')
let Diode    = require('diode')
let keysOf   = require('./keys')
let valuesOf = require('./values')

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
    return getIn(this._state, this.getPath(key), fallback)
  },

  set(key, value) {
    if (arguments.length === 1) {
      value = arguments[0]
      key   = undefined
    }

    this.commit(assoc(this._state, this.getPath(key), value))
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
    this.commit(dissoc(this._state, this.getPath(key)))
  },

  refine(key) {
    return Object.create(this, {
      _path : { value: this.getPath(key) }
    })
  },

  keys() {
    return keysOf(this.valueOf())
  },

  values() {
    return valuesOf(this.valueOf())
  },

  valueOf() {
    return getIn(this._state, this.getPath())
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

  includes(value) {
    return this.indexOf(value) > -1
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
let methods = [ 'sort', 'map', 'reduce', 'filter', 'forEach', 'some', 'every', 'join', 'indexOf' ]

methods.forEach(function(name) {
  Foliage.prototype[name] = function() {
    return this.values()[name](...arguments)
  }
})

module.exports = Foliage

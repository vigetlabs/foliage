/**
 * Foliage
 */

import enumeration from './enumeration'
import assoc       from './assoc'
import dissoc      from './dissoc'
import get         from './get'

export default Foliage

function Foliage (state={}) {
  this._parent = this
  this._path   = []
  this._state  = state
}

Foliage.prototype = {

  getPath(key) {
    return key ? this._path.concat(key) : this._path
  },

  getState() {
    return this.getTrunk()._state
  },

  getTrunk() {
    return this._parent
  },

  commit(state) {
    this.getTrunk()._state = state
  },

  get(key) {
    let clone     = Object.create(this)

    clone._parent = this
    clone._path   = this.getPath(key)

    return clone
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

  valueOf() {
    let state = this.getState()
    return this._path.length ? get(state, this.getPath()) : state
  },

  toJSON() {
    return this.valueOf()
  },

  ...enumeration
}

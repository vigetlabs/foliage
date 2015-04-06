/**
 * Foliage
 */

import Cursor    from './Cursor'
import functions from './functions'
import sprout    from 'sprout-data'

export default Foliage

function Foliage (state) {
  this._state = state
}

Foliage.prototype = {
  ...functions,

  get(key) {
    return new Cursor(key, this)
  },

  set(key, value) {
    this._state = sprout.assoc(this._state, key, value)
  },

  remove(key) {
    this._state = sprout.dissoc(this._state, key)
  },

  trunk() {
    return this
  },

  valueOf() {
    return this._state
  }
}

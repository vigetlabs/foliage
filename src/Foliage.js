/**
 * Foliage
 */

import enumeration from './enumeration'
import sprout      from 'sprout-data'

export default Foliage

function Foliage (state, keys, source) {
  this._state  = state
  this._keys   = keys ? [].concat(keys) : []
  this._source = source || this
}

Foliage.prototype = {

  ...enumeration,

  state() {
    return this.isTrunk() ? this._state : this._source.state()
  },

  query(key) {
    return key ? this._keys.concat(key) : this._keys
  },

  get(key) {
    return new Foliage(this.state(), this.query(key), this._source)
  },

  commit(state) {
    this.trunk()._state = state
  },

  set(key, value) {
    let mod = sprout.assoc(this.state(), this.query(key), value)
    this.commit(mod)
  },

  remove(key) {
    let mod = sprout.dissoc(this.state(), this.query(key))
    this.commit(mod)
  },

  trunk() {
    return this._source
  },

  isTrunk() {
    return this._source === this
  },

  valueOf() {
    let state = this.state()
    return this._keys.length ? sprout.get(state, this.query()) : state
  },

  toJSON() {
    return this.valueOf()
  }

}

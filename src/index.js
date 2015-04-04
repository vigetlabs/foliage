/**
 * Foliage
 */

import sprout from 'sprout-data'

export default class Foliage {

  constructor(value, parent) {
    this._value  = value
    this._parent = parent
  }

  get(key, fallback) {
    return sprout.get(this._value, key, fallback)
  }

  set(key, value) {
    this._value = sprout.assoc(this._value, key, value)
  }

  branch(key, fallback) {
    return new Foliage(this.get(key, fallback), this)
  }

  trunk() {
    return this._parent ? this._parent.trunk() : this
  }

  keys() {
    return Object.keys(this._value)
  }

  values() {
    return this.keys().map(key => this.get(key), this)
  }

  map(fn, scope) {
    return this.values().map(fn, scope)
  }

  filter(fn) {
    return this.values().filter(fn)
  }

  find(fn) {
    return this.filter(fn)[0]
  }

  reduce(fn, initial, scope) {
    return this.values().reduce(fn, initial, scope)
  }

  value() {
    return this.valueOf()
  }

  valueOf() {
    return this._value
  }

  is(branch) {
    return this.valueOf() === branch.valueOf()
  }

}

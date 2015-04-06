import functions from './functions'
import sprout    from 'sprout-data'

export default Cursor

function Cursor (keys, source) {
  this._keys   = [].concat(keys)
  this._source = source
}

Cursor.prototype = {
  ...functions,

  query(key) {
    return key ? this._keys.concat(key) : this._keys
  },

  get(key) {
    return new Cursor(this.query(key), this._source)
  },

  set(key, value) {
    this._source.set(this.query(key), value)
  },

  remove(key, value) {
    this._source.remove(this.query(key), value)
  },

  trunk() {
    return this._source
  },

  valueOf() {
    return sprout.get(this._source.valueOf(), this.query())
  }
}

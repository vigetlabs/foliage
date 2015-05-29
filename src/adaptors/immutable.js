/**
 * ImmutableJS Adaptor
 */

let IMMUTABLE_ITERABLE = '@@__IMMUTABLE_ITERABLE__@@'

let ImmutableAdaptor = {
  test(obj) {
    return !!obj && obj[IMMUTABLE_ITERABLE] === true
  },

  keys(obj) {
    return obj.map((value, key) => key).toArray()
  },

  get(obj, key) {
    return obj.get(key)
  },

  set(obj, key, value) {
    return obj.set(key, value)
  },

  copy(obj) {
    return obj
  },

  values(obj) {
    return obj.map(value => value).toArray()
  }
}

module.exports = ImmutableAdaptor

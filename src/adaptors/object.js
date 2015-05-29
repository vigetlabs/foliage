/**
 * Value Adaptor
 */

let ObjectAdaptor = {
  test() {
    return true
  },

  copy(obj) {
    var clone = {}

    for (var key in obj) {
      clone[key] = obj[key]
    }

    return clone
  },

  get: require('../get'),

  set(obj, keys, value) {
    if (this.get(obj, keys) === value) {
      return obj
    }

    let [ head, ...tail ] = keys
    let clone = this.copy(obj)

    if (keys.length > 1) {
      clone[head] = this.set(this.get(clone, [head]) || {}, tail, value)
    } else if (head) {
      clone[head] = value
    } else {
      clone = value
    }
    return clone
  },

  remove(obj, keys) {
    if (this.get(obj, keys) === undefined) {
      return obj
    }

    let [ head, ...tail ] = keys
    let clone = this.copy(obj)

    if (tail.length) {
      clone[head] = this.remove(obj[head], tail)

      // Autoprune keys
      if (Object.keys(clone[head]).length === 0) {
        delete clone[head]
      }
    } else {
      delete clone[head]
    }

    return clone
  },

  keys(obj) {
    return Object.keys(obj || {})
  },

  values(obj) {
    return ObjectAdaptor.keys(obj).map(key => obj[key])
  },

  toString() {
    return 'ObjectAdaptor'
  }
}

module.exports = ObjectAdaptor

/**
 * Given a list of keys, return a value of out a given object.
 * Optionally, if a value is not present, return a fallback
 *
 * @param {Object} obj - The target object
 * @param {Array} keys - A list of string keys
 * @param {any} fallback - If the value is undefined, a fallback
 */

let keyPath = require('./keyPath')

module.exports = function get(target, keys, fallback) {
  keys = keyPath(keys)

  for (var i = 0; i < keys.length; i++) {
    if (target !== undefined) {
      target = target[keys[i]]
    } else {
      return fallback
    }
  }

  return target === undefined ? fallback : target
}

/**
 * Given a list of keys, return a value of out a given object.
 * Optionally, if a value is not present, return a fallback
 *
 * @param {Object} obj  - The target object
 * @param {Array} keys - A list of string keys
 * @param {any} fallback - A value to return if the pathway is undefined
 */

let has = require('./has')

module.exports = function get (obj, keys, fallback) {
  let [ head, ...tail ] = keys

  if (!head) {
    return obj
  }

  if (has(obj, keys) === false) {
    return fallback
  }

  return tail.length ? get(obj[head], tail) : obj[head]
}

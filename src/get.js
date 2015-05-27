/**
 * Given a list of keys, return a value of out a given object.
 * Optionally, if a value is not present, return a fallback
 *
 * @param {Object} obj - The target object
 * @param {Array} keys - A list of string keys
 * @param {any} fallback - If the value is undefined, a fallback
 */

function pluck(obj, key) {
  return obj ? obj[key] : undefined
}

module.exports = function (obj, keys, fallback) {
  let value = keys.reduce(pluck, obj)

  return value === undefined ? fallback : value
}

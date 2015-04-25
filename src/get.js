/**
 * Given a list of keys, return a value of out a given object.
 * Optionally, if a value is not present, return a fallback
 *
 * @param {Object} obj  - The target object
 * @param {Array} keys - A list of string keys
 */

module.exports = function (obj, keys) {
  return keys.reduce(function(tree, key) {
    return tree ? tree[key] : undefined
  }, obj)
}

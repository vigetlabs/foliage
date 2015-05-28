/**
 * Assoc
 * Given a list of keys, non-destructively assign a value to a
 * pathway
 *
 * @param {Object} obj  - The target object
 * @param {Array} keys - A list of string keys
 * @param {any} value - The value to be assigned
 */

let copy = require('./copy')
let get  = require('./get')
let isImmutable = require('./isImmutable')

module.exports = function assoc (obj, keys, value) {
  if (isImmutable(obj)) {
    return obj.setIn(keys, value)
  }

  if (get(obj, keys) === value) {
    return obj
  }

  let [ head, ...tail ] = keys
  let clone = copy(obj)

  if (keys.length > 1) {
    clone[head] = assoc(get(clone, [head]) || {}, tail, value)
  } else if (head) {
    clone[head] = value
  } else {
    clone = value
  }

  return clone
}

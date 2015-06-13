/**
 * Given a list of keys, non-destructively assign a value to a
 * pathway
 *
 * @param {Object} obj  - The target object
 * @param {Array} keys - A list of string keys
 * @param {any} value - The value to be assigned
 */

let copy = require('./copy')
let get  = require('./get')
let keyPath = require('./keyPath')

module.exports = function set (target, keys, value) {
  // If the value already equals the current assignment,
  // there is no need to do any work
  if (get(target, keys) === value) {
    return target
  }

  keys = keyPath(keys)

  let [ head, ...tail ] = keys

  if (keys.length) {
    let clone = copy(target)

    if (tail.length) {
      clone[head] = set(get(clone, head, {}), tail, value)
    } else {
      clone[head] = value
    }
    return clone
  } else {
    return value
  }
}

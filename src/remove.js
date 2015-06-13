/**
 * Given a list of keys, non-destructively remove a pathway from an
 * object
 *
 * @param {Object} obj  - The target object
 * @param {Array} keys - A list of string keys
 */

let OBJECT = {}
let copy = require('./copy')
let get  = require('./get')
let keyPath = require('./keyPath')

module.exports = function remove (obj, keys) {
  if (get(obj, keys) === undefined) {
    return obj
  }

  keys = keyPath(keys)

  let [ head, ...tail ] = keys
  let clone = copy(obj)

  if (tail.length) {
    clone[head] = remove(get(obj, head, OBJECT), tail)

    // Autoprune keys
    if (Object.keys(get(clone, head, OBJECT)).length === 0) {
      delete clone[head]
    }
  } else {
    delete clone[head]
  }

  return clone
}

/**
 * Given a list of keys, non-destructively remove a pathway from an
 * object
 *
 * @param {Object} obj  - The target object
 * @param {Array} keys - A list of string keys
 */

let copy = require('./copy')
let get  = require('./get')

module.exports = function dissoc (obj, keys) {
  if (get(obj, keys) === undefined) {
    return obj
  }

  let [ head, ...tail ] = keys
  let clone = copy(obj)

  if (tail.length) {
    clone[head] = dissoc(obj[head], tail)

    // Autoprune keys
    if (Object.keys(clone[head]).length === 0) {
      delete clone[head]
    }
  } else {
    delete clone[head]
  }

  return clone
}

/**
 * Given a list of keys, non-destructively remove a pathway from an
 * object
 *
 * @param {Object} obj  - The target object
 * @param {Array} keys - A list of string keys
 */

let copy = require('./copy')
let has  = require('./has')

module.exports = function dissoc (obj, keys) {
  if (has(obj, keys) === false) {
    return obj
  }

  let [ head, ...tail ] = keys
  let clone = copy(obj)

  if (tail.length) {
    clone[head] = dissoc(obj[head], tail)
  } else {
    clone[head] = undefined
  }

  return clone
}

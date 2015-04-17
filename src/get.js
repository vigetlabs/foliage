/**
 * get
 * Follow a chain of given keys down to a source value
 * This will get tail-call optimization with Babel
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

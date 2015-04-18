/**
 * Given a list of keys, check for membership within a given object
 *
 * @param {Object} obj - The target object
 * @param {Array} keys - A list of string keys
 */

module.exports = function has (obj, [ head, ...tail ]) {
  let isDefined = obj !== void 0
  let hasKey    = isDefined && (head in obj)

  if (tail.length) {
    return !hasKey ? false : has(obj[head], tail)
  }

  return hasKey
}

/**
 * has
 * Follow a chain of given keys down to determine if a value exists.
 * This will get tail-call optimization with Babel
 */

module.exports = function has (obj, [ head, ...tail ]) {
  let hasKey = (head in obj)

  if (tail.length) {
    return !hasKey ? false : has(obj[head], tail)
  }

  return hasKey
}

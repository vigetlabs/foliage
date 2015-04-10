/**
 * get
 * Follow a chain of given keys down to a source value
 * This will get tail-call optimization with Babel
 */

export default function get (obj, [ head, ...tail ]) {
  return tail.length ? get(obj[head], tail) : obj[head]
}

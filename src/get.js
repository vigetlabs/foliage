/**
 * get
 * Follow a chain of given keys down to a source value
 * This will get tail-call optimization with Babel
 */

import has from './has'

export default function get (obj, keys) {
  if (has(obj, keys) === false) {
    return undefined
  }

  let [ head, ...tail ] = keys

  return tail.length ? get(obj[head], tail) : obj[head]
}

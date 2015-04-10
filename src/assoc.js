import copy from './copy'
import get  from './get'

export default function assoc (obj, keys, value) {
  if (get(obj, keys) === value) {
    return obj
  }

  let [ head, ...tail ] = keys
  let clone = copy(obj)

  if (tail.length) {
    clone[head] = assoc((head in clone) ? clone[head] : {}, tail, value)
  } else {
    clone[head] = value
  }

  return clone
}

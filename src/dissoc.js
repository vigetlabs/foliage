import copy from './copy'
import has  from './has'

let isEmpty = function(obj) {
  return Object.keys(obj).length === 0
}

export default function dissoc (obj, keys) {
  if (has(obj, keys) === false) {
    return obj
  }

  let [ head, ...tail ] = keys
  let clone = copy(obj)

  if (tail.length) {
    clone[head] = dissoc(obj[head], tail)

    if (isEmpty(clone[head])) {
      delete clone[head]
    }
  } else {
    delete clone[head]
  }

  return clone
}

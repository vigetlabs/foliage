import copy from './copy'
import has  from './has'

export default function dissoc (obj, keys) {
  if (!has(obj, keys)) {
    return obj
  }

  let [ k, ...ks ] = keys
  let o = copy(obj)

  if (ks.length) {
    o[k] = dissoc(obj[k], ks)
    if (!Object.keys(o[k]).length) {
      delete o[k]
    }
  } else {
    delete o[k]
  }

  return o
}

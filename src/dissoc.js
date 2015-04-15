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
    delete clone[head]
  }

  return clone
}

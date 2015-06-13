/**
 * DEPRECATED
 */

let set = require('./set')

module.exports = function() {
  console.warn('set has been deprecated, please use `require(foliage/src/set`)')
  return set.apply(this, arguments)
}

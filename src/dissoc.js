/**
 * DEPRECATED
 */

let remove = require('./remove')

module.exports = function() {
  console.warn('dissoc has been deprecated, please use `require(foliage/src/remove`)')
  return remove.apply(this, arguments)
}

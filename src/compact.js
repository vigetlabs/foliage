/**
 * Remove all undefined values from an array
 */

module.exports = function compact (...items) {
  return [].concat.apply([], items).filter(i => i !== void 0)
}

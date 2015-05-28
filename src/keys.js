let isImmutable = require('./isImmutable')

module.exports = function(obj) {
  return isImmutable(obj) ? obj.map((value, key) => key).toArray()
                          : Object.keys(obj || {})
}

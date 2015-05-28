let get         = require('./get')
let isImmutable = require('./isImmutable')
let keys        = require('./keys')

module.exports = function(obj) {
  // An anonymous function is used here instead of calling
  // `get` directly because there is no fallback value.
  return keys(obj).map(key => get(obj, [ key ]))
}

const ArrayAdaptor     = require('./array')
const ObjectAdaptor    = require('./object')
const ImmutableAdaptor = require('./immutable')
const ValueAdaptor     = require('./value')

const priority = [
  ImmutableAdaptor,
  ArrayAdaptor,
  ObjectAdaptor,
  ValueAdaptor
]

const fallback = ValueAdaptor

module.exports = function(obj, method, ...params) {
  let adaptor = priority.filter(kind => kind.test(obj))[0] || fallback

  return adaptor[method].apply(adaptor, [obj].concat(params))
}

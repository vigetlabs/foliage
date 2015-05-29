let ArrayAdaptor     = require('./array')
let ImmutableAdaptor = require('./immutable')
let ObjectAdaptor    = require('./object')

let priority = [
  require('./immutable'),
  require('./array'),
  require('./object')
]

module.exports = function(obj, method, ...params) {
  let adaptor = priority.filter(kind => kind.test(obj))[0]

  return adaptor[method].apply(adaptor, [obj].concat(params))
}

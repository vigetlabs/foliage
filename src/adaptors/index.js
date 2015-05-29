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

  if (process.env.NODE_ENV !== 'production' && !adaptor[method]) {
    throw Error(`Adaptor ${ adaptor } does not impliment "${ method }"`)
  }

  return adaptor[method].apply(adaptor, [obj].concat(params))
}

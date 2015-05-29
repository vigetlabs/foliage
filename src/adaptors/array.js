/**
 * Array Adaptor
 */

let ObjectAdaptor = require('./object')
let ArrayAdaptor  = Object.create(ObjectAdaptor)

ArrayAdaptor.test   = obj => Array.isArray(obj)
ArrayAdaptor.copy   = obj => obj.concat()
ArrayAdaptor.values = obj => obj.concat()

module.exports = ArrayAdaptor

/**
 * Object Adaptor
 */

let ValueAdaptor  = require('./value')

let ObjectAdaptor = Object.create(ValueAdaptor)

ObjectAdaptor.test = obj => obj && !Array.isArray(obj) && typeof obj === 'object'
ObjectAdaptor.copy = require('../copy')

module.exports = ObjectAdaptor

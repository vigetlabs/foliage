/**
 * Value Adaptor
 */

const ValueAdaptor = {
  get    : require('../get'),
  set    : require('../assoc'),
  remove : require('../dissoc'),

  test(obj) {
    return obj !== null && typeof obj !== 'object'
  },

  keys(obj) {
    return Object.keys(obj || {})
  },

  copy(obj) {
    return obj
  },

  values(obj) {
    return ValueAdaptor.keys(obj).map(key => obj[key])
  }
}

module.exports = ValueAdaptor

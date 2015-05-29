/**
 * Value Adaptor
 */

let ObjectAdaptor = {
  copy   : require('../copy'),
  get    : require('../get'),
  set    : require('../assoc'),
  remove : require('../dissoc'),

  test() {
    return true
  },

  keys(obj) {
    return Object.keys(obj || {})
  },

  values(obj) {
    return ObjectAdaptor.keys(obj).map(key => obj[key])
  }
}

module.exports = ObjectAdaptor

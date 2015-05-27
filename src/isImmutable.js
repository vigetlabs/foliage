const MAP = '@@__IMMUTABLE_ITERABLE__@@'

module.exports = function(obj) {
  return !!obj && obj[MAP] === true
}

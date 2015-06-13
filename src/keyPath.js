/**
 * Normalizes key paths to a consistent structure
 */

module.exports = function(keys) {
  return Array.isArray(keys) ? keys : [ keys ]
}

let allowed = [ 'map', 'reduce', 'filter', 'some', 'every' ]

let functions = {
  values() {
    let value = this.valueOf()
    return Object.keys(value).map(key => value[key])
  },

  find(...args) {
    return this.filter(...args)[0]
  }
}

allowed.forEach(function(key) {
  functions[key] = function(...args) {
    return this.values()[key](...args)
  }
})

export default functions

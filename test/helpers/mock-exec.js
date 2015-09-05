module.exports = mockExec

function mockExec () {
  var args = arguments
  return function (command, options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = null
    }
    cb.apply(null, args)
  }
}

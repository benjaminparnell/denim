var assert = require('assert')
var parseError = require('../../lib/parse-error')

describe('#parseError', function () {
  it('should return the correct message for connection failed', function () {
    var err = new Error('Connect Failed')
    var message = parseError(err)

    assert.equal(message, 'Connection to device failed. Ensure its turned on and ready to pair.')
  })

  it('should return the original error message if it can\'t be converted into anything', function () {
    var err = new Error('I am an error')
    var message = parseError(err)

    assert.equal(message, 'I am an error')
  })
})

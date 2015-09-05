var assert = require('assert')
var rewire = require('rewire')
var connectToSink = rewire('../../lib/connect-to-sink')
var mockExec = require('../helpers/mock-exec')

var exampleMac = '00:1C:B3:09:85:15'

describe('#connectToSink', function () {
  it('should return an Error if exec returns one', function (done) {
    connectToSink.__set__('exec', mockExec(new Error()))
    connectToSink(exampleMac, function (err) {
      assert.equal(err instanceof Error, true)
      done()
    })
  })

  it('should report stdout from exec as an Error', function (done) {
    connectToSink.__set__('exec', mockExec(null, null, 'Error from bluez'))
    connectToSink(exampleMac, function (err) {
      assert.equal(err instanceof Error, true)
      assert.equal(err.message, 'Error from bluez')
      assert.equal(err.from, 'bluez')
      done()
    })
  })

  it('should return null error when everything went fine', function (done) {
    connectToSink.__set__('exec', mockExec(null, null, null))
    connectToSink(exampleMac, function (err) {
      assert.equal(err, null)
      done()
    })
  })
})

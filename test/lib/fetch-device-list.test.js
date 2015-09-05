var assert = require('assert')
var rewire = require('rewire')
var fetchDeviceList = rewire('../../lib/fetch-device-list')
var mockExec = require('../helpers/mock-exec')

var expectedDevices = [
  'SONY:CMT-SBT300WB(Bluetooth) (3C:77:E6:B2:AB:4E)',
  'Samsung Home Audio (1C:5A:3E:70:85:74)',
  'Ben’s iPhone (28:E1:4C:9B:03:C6)',
  'Bose Mini SoundLink (00:0C:8A:CA:B6:C1)'
]

var bluezOutput = [
  'Added devices:'
].concat(expectedDevices).concat(['']).join('\n')

describe('#fetchDeviceList', function () {
  it('should return an Error if exec returns one', function (done) {
    fetchDeviceList.__set__('exec', mockExec(new Error()))
    fetchDeviceList(function (err) {
      assert.equal(err instanceof Error, true)
      done()
    })
  })

  it('should return stderr from exec as an Error', function (done) {
    fetchDeviceList.__set__('exec', mockExec(null, null, 'This is an error from bluez'))
    fetchDeviceList(function (err) {
      assert.equal(err instanceof Error, true)
      assert.equal(err.message, 'This is an error from bluez')
      assert.equal(err.from, 'bluez')
      done()
    })
  })

  it('should return a list of devices from bluez on success', function (done) {
    fetchDeviceList.__set__('exec', mockExec(null, bluezOutput, null))
    fetchDeviceList(function (err, devices) {
      assert.equal(err, null)
      assert.deepEqual(devices, expectedDevices)
      done()
    })
  })
})

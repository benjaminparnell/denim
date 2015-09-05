var assert = require('assert')
var getMacFromBluezOutput = require('../../lib/get-mac-from-bluez-output')

describe('#getMacFromBluezOutput', function () {
  it('should get the mac address correctly from a line of bluez output', function () {
    var expectedMacAddress = '00:0C:8A:CA:B6:C1'
    var output = 'Bose Mini SoundLink (' + expectedMacAddress + ')'
    var macAddress = getMacFromBluezOutput(output)
    assert.equal(macAddress, expectedMacAddress)
  })

  it('should get the mac address when there are more sets of brackets the device name', function () {
    var expectedMacAddress = '3C:77:E6:B2:AB:4E'
    var output = 'SONY:CMT-SBT300WB(Bluetooth) (' + expectedMacAddress + ')'
    var macAddress = getMacFromBluezOutput(output)
    assert.equal(macAddress, expectedMacAddress)
  })
})

module.exports = fetchDeviceList

var exec = require('child_process').exec

function fetchDeviceList (cb) {
  exec('bt-device -l', function (err, stdout, stderr) {
    if (err) return cb(err)
    if (stderr) {
      err = new Error(stderr)
      err.from = 'bluez'
      return cb(err)
    }
    // Sanitize the output
    var lines = stdout.split('\n')
    var devices = lines.slice(1, lines.length - 1)
    return cb(null, devices)
  })
}

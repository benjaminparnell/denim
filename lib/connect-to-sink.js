module.exports = connectToSink

var exec = require('child_process').exec

function connectToSink (mac, cb) {
  exec('bt-audio -c ' + mac, function (err, stdout, stderr) {
    if (err) return cb(err)
    if (stderr) {
      err = new Error(stderr)
      err.from = 'bluez'
      return cb(err)
    }
    cb(null)
  })
}

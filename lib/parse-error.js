function parseError (err) {
  var message = err.message

  if (message.indexOf('Connect Failed') > -1) {
    message = 'Connection to device failed. Ensure its turned on and ready to pair.'
  }

  return message
}

module.exports = parseError

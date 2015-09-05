var blessed = require('blessed')
var async = require('async')
var exec = require('child_process').exec
var connectToSink = require('./lib/connect-to-sink')

var screen = blessed.screen({
  smartCSR: true
})

screen.title = require('./package.json').name

var list = blessed.list({
  parent: screen,
  label: '{bold}{cyan-fg}denim{/cyan-fg}{/bold}',
  tags: true,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'line',
  scrollbar: {
    ch: ' ',
    track: {
      bg: 'cyan'
    },
    style: {
      inverse: true
    }
  },
  style: {
    item: {
      hover: {
        bg: 'blue'
      }
    },
    selected: {
      bg: 'blue',
      bold: true
    }
  },
  keys: true,
  vi: true
})

var loader = blessed.loading({
  parent: screen,
  top: 'center',
  left: 'center',
  height: 10,
  align: 'center',
  width: '50%',
  tags: true,
  hidden: true,
  border: 'line'
})

function onListSelect (el, selected) {
  var name = el.getText()
  var macAddress = name.split('(').pop().slice(0, -1)

  loader.load('Connecting to ' + name)

  async.series([
    connectToSink.bind(null, macAddress)
  ], function (err) {
    if (err) throw err
    loader.stop()
  })
}

screen.append(list)

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0)
})

exec('bt-device -l', function (err, stdout, stderr) {
  if (err || stderr) throw err || new Error(stderr)

  var lines = stdout.split('\n')
  var devices = lines.slice(1, lines.length - 1)
  list.setItems(devices)
  list.on('select', onListSelect)
  list.focus()
  screen.render()
})


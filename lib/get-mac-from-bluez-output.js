module.exports = getMacFromBluezOutput

// Gets the mac address from a single line out `bt-device -l` output.
// We have to account this coming back from the command:
//  SONY:CMT-SBT300WB(Bluetooth) (3C:77:E6:B2:AB:4E)
// As well as the more usual case where there are only brackets at the end.

function getMacFromBluezOutput (output) {
  return output.split('(').pop().slice(0, -1)
}

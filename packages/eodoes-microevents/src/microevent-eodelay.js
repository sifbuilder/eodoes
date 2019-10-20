/**********************
   *    microevent-eodelay
   */

const {report} = require('eodoes-muons')

const sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**********************
      * eodelay
      */
const eodelay = async (data, __) => {
  let { parcel } = data
  let delay = parcel
  let {inland = true} = __

  if (inland) {
    report.trace({delay, inland}, __)
    await sleep(delay)
  }
}

module.exports = { eodelay }

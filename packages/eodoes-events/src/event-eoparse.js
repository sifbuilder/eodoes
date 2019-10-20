/**********************
   *    event-eoparse
   */

const {report} = require('eodoes-muons')
const {snap} = require('eodoes-muons')

let state = {
  cwd: process.cwd(),
}

/**********************
  * eoparse__parcel
  */
state.eoparse__parcel = function (data, __) {
  let {eon, version, author, license, descr} = __.eonopts
  let {eoparse__parcel} = __

  let parcel = eoparse__parcel !== undefined
    ? eoparse__parcel
    : {
      'name': `${eon}`,
      'version': `${version}`,
      'description': `${descr}`,
      'author': `${author}`,
      'license': `${license}`,
    }

  return parcel
}

/**********************
      * parcelparse
      */
const parcelparse = async function (data, __) {
  let { eoroot } = __
  report.trace({eoroot}, __)

  let {parcelname = `eoparse__parcel`} = data
  let item = __[`${parcelname}`] || state[`${parcelname}`]

  let v = {}
  if (typeof item === 'object') {
    v = item // is object
  } else if (typeof item === 'function') {
    v = await item(data, __) // is function _e_ async
  }

  report.verb({_msg: `m.events:parcel: ${v}`}, __)
  await snap(v, __)
}

/**********************
      * eoparse
      */
const eoparse = async (data, __) => {
  await parcelparse(data, __)
}

module.exports = { eoparse }

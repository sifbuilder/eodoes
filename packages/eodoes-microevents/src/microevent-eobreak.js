/**********************
   *    microevent-eobreak
   */

const {report} = require('eodoes-muons')
const {processParcelPod} = require('eodoes-muons')

/**********************
  * eobreak
  */
const eobreak = async (data, __) => {
  let { parcel } = data
  report.trace({parcel}, __)
  await processParcelPod({item: parcel}, __)
}

module.exports = { eobreak }

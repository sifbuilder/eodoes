/**********************
  *    microevent-eoignore
  */

const {report} = require('eodoes-muons')

/**********************
  * eoignore
  */
const eoignore = async (data, __) => {
  let msg = data[`__eoignore`]
  report.trace({msg}, __)
}

module.exports = { eoignore }

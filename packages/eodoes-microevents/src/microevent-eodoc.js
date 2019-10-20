/**********************
  *    microevent-eodoc/eodoc
  */
const {report} = require('eodoes-muons')

const eodoc = async (data, __) => {
  let {inland = true} = __
  if (inland) {
    report.doc(data, __)
  } else {
    report.debug({_msg: `eodoc outland ${data}`}, __)
  }
}

module.exports = { eodoc }

/**********************
   *    event-upver
   */

const {report} = require('eodoes-muons')
const {exec} = require('eodoes-muons')

/**********************
      * upver
      */
const upver = async (data, __) => {
  let {eoroot} = __
  report.trace({eoroot}, __)

  report.debug(`event.upver: exec yarn version --patch`, __)
  let res = await exec({
    cmd: `yarn version --patch`,
    cwd: eoroot,
  }, __)
  return res
}

module.exports = { upver }

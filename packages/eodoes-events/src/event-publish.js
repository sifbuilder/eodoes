/**********************
   *    event-publish
   */

const {report} = require('eodoes-muons')
const {exec} = require('eodoes-muons')

/**********************
  * publish
  */
const publish = async (data, __) => {
  let {eoroot} = __

  report.debug(`event.monitor: exec npm publish`, __)

  let res = await exec({
    cmd: `npm publish`,
    cwd: eoroot,
  }, __)
  return res
}

module.exports = { publish }

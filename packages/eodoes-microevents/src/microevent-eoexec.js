/**********************
   *    microevent-eoexec
   */

const {report} = require('eodoes-muons')
const {exec} = require('eodoes-muons')
const {processParcelPod} = require('eodoes-muons')
const { filer } = require('eodoes-muons')
const { resolvepath } = filer

/**********************
  * eoexec
  */
const eoexec = async (data, __) => {
  let {parcel} = data
  let {eoroot} = __
  let {inland = true} = __

  if (inland) {
    parcel = Array.isArray(parcel) ? parcel : Array.of(parcel) // arrayfy
    for (let item of parcel) {
      if (typeof item === 'string') {
        let cmd = item
        let cwd = eoroot
        report.debug(`mevent.eoexec: ${cmd}`, __)
        await exec({ cmd, options: {cwd} }, __)
      } else if (typeof item === 'object') {
        item = await processParcelPod({item}, __)
        let {resolve, options} = item
        let cmd = resolve
        let cwd = (options.cwd === undefined) // cwd relative to eoroot
          ? eoroot
          : resolvepath(eoroot, options.cwd)
        options.cwd = cwd
        report.debug(`mevent.eoexec: ${cmd}`, __)
        await exec({ cmd, options }, __)
      }
    }
  }
}

module.exports = { eoexec }

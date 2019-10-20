/**********************
   *    microevent-eorun
   */

const {report} = require('eodoes-muons')
const {exec} = require('eodoes-muons')
const {processParcelPod} = require('eodoes-muons')
const { filer } = require('eodoes-muons')
const { resolvepath } = filer

/**********************
      * eorun
      */
const eorun = async (data, __) => {
  let {parcel} = data
  let {eoroot} = __
  let {inland = true} = __

  if (inland) {
    parcel = Array.isArray(parcel) ? parcel : Array.of(parcel) // arrayfy
    for (let item of parcel) {
      if (typeof item === 'string') {
        let cmd = `yarn run ${item}`
        report.debug(`mevents.eorun: exec ${cmd}`, __)
        exec({cmd, options: {} }, __)
      } else if (typeof item === 'object') {
        item = await processParcelPod({item}, __)
        let {resolve, options} = item
        let {workspace } = options
        let cmd = workspace
          ? `yarn workspace ${workspace} run ${resolve}`
          : `yarn run ${resolve}`
        let cwd = (options.cwd === undefined) // cwd relative to eoroot
          ? eoroot
          : resolvepath(eoroot, options.cwd)
        options.cwd = cwd
        report.trace({cmd, options}, __)
        report.debug(`mevents.eorun: exec ${cmd}`, __)
        exec({cmd, options }, __)
        // < ---
      }
    }
  }
}

module.exports = { eorun }

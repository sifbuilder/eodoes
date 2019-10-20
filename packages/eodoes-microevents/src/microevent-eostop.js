/**********************
   *    microevent-eostop
   */

const fkill = require('fkill')
const {report} = require('eodoes-muons')
const {processParcelPod} = require('eodoes-muons')

/**********************
      * eostop
      */
const eostop = async (data, __) => {
  let {parcel} = data
  let { viewopts } = __
  let { port } = viewopts
  let { inland = true} = __

  if (inland) {
    parcel = Array.isArray(parcel) ? parcel : Array.of(parcel) // arrayfy
    for (let item of parcel) {
      if (typeof item === 'string') {
        // ->
        let cmd = `fkill([:${port}]`
        try { // exec develop
          report.debug(`mevent.eostop: ${cmd}`, __)
          await fkill([`:${port}`], {force: true})
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(`command ${cmd} failed: ${e}`)
        }
        // <-
      } else if (typeof item === 'object') {
        item = await processParcelPod({item}, __)
        // ->
        let cmd = `fkill([:${port}]`
        try { // exec develop
          report.debug(`mevent.eostop: fkill ${port}`, __)
          await fkill([`:${port}`], {force: true})
          // <-
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(`command ${cmd} failed: ${e}`)
        }
      }
    }
  }
  return true
}

module.exports = { eostop }

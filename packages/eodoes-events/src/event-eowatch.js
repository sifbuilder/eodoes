/**********************
   *    event-eowatch
   */

const {report} = require('eodoes-muons')

const {exec} = require('eodoes-muons')
const { filer } = require('eodoes-muons')
const { resolvepath, dirExistsSync } = filer
// .................. eowatch
const eowatch = (data, __) => {
  let { eoroot} = __
  let {starter, packages} = __.eonopts
  let {themes} = __

  report.trace({eoroot, starter, packages, themes}, __)

  let cwd = resolvepath([eoroot])
  let cwdExists = dirExistsSync(cwd)
  // eslint-disable-next-line no-console
  console.assert(cwdExists, `starter defined but path does not exist`)

  let cmd = (starter)
    ? `yarn workspace ${starter} run watch` // watch
    : `npm run watch`
  try {
    report.debug(`event.eowatch: exec ${cmd}`, __)
    exec({ cmd: cmd, options: { cwd } }, __)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`develop failed ${e}`)
  }
}

module.exports = { eowatch }

/**********************
   *    event-eodev
   */

const {report} = require('eodoes-muons')
const {exec} = require('eodoes-muons')
const {wstree} = require('eodoes-muons')
const {filer} = require('eodoes-muons')
const {resolvepath, dirExistsSync} = filer

/**********************
  * eodev
  */
const eodev = async (data, __) => {
  let { eoroot} = __

  let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
    wstree(data, __)
  report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

  let cwd = resolvepath([eoroot])
  let cwdExists = dirExistsSync(cwd)

  // eslint-disable-next-line no-console
  console.assert(cwdExists, `eodev: starter defined but path ${cwd} does not exist`)

  let cmdDevelop = (useWorkspaces)
    ? `yarn workspace ${starter} run develop`
    : `npm run develop`
  try {
    report.debug(`events.eodev: exec ${cmdDevelop}`, __)
    exec({ cmd: cmdDevelop, options: { cwd } }, __)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`develop failed ${e}`)
  }
}

module.exports = { eodev }

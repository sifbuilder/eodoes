/**********************
   *    microevent-eostart
   */

const {report} = require('eodoes-muons')
const {eorun} = require('./microevent-eorun')
const {wstree} = require('eodoes-muons')

/**********************
      * eostart
      */
const eostart = async (data, __) => {
  let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
  wstree(data, __)

  report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

  let parcel = {
    resolve: `develop`,
    options: {
      workspace: useWorkspaces
        ? `${starter}` // run develop in starter if workspaces
        : ``,
      cwd: ``,
    },
  }

  data.parcel = parcel
  eorun(data, __)

  return true
}

module.exports = { eostart }

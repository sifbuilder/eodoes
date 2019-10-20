/**********************
   *    event-unspace
   */

const fsExtra = require('fs-extra')
const {report} = require('eodoes-muons')
const {wstree} = require('eodoes-muons')

/**********************
      * unspace
      */
const unspace = async (data, __) => {
  let { eoroot } = __

  let {packages, starter, themes, packagesPath, starterPath, themePaths} =
    wstree(data, __)
  report.trace({packages, starter, themes, packagesPath, starterPath, themePaths}, __)

  let folders = [
    eoroot,
  ]

  let items = [
    '',
  ]

  folders.forEach(function (folder) {
    items.forEach(function (item) {
      let itemPath = `${folder}/${item}`
      report.verb({_msg: `events unspace: would remove: ${itemPath}, --doit to risk`}, __)
      let {doit} = __.eonopts
      if (doit) {
        report.debug(`event.unspace: removeSync ${itemPath}`, __)
        fsExtra.removeSync(`${itemPath}`)
      } else {
        console.log(`events unspace: would remove: ${itemPath}, --doit for it`) /* eslint-disable-line no-console */
      }
    })
  })
}

module.exports = { unspace }

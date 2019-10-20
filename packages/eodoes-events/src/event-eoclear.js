/**********************
   *    event-eoclear
   */

const fsExtra = require('fs-extra')
const {wstree} = require('eodoes-muons')
const {report} = require('eodoes-muons')

/**********************
      * eoclear
      */
const eoclear = async (data, __) => {
  let { eoroot } = __ // eslint-disable-line no-unused-vars

  let {
    packages,
    starter,
    themes,
    packagesPath,
    starterPath,
    themePaths,
  } = wstree(data, __)
  report.trace({packages, starter, themes, packagesPath, starterPath, themePaths}, __)

  let folders = [
    eoroot,
  ]

  if (starter) folders.push(`${eoroot}/${starter}`)
  if (packages) {
    let packagesPath = `${eoroot}/${packages}`; __ = __.updState({packagesPath}, __)
    if (themes[0]) folders.push(`${packagesPath}/${themes[0]}`)
  }

  let items = [
    '.cache',
    'public',
  ]

  folders.forEach(function (folder) {
    items.forEach(function (item) {
      let itemPath = `${folder}/${item}`
      report.debug(`events.eoclear: removeSync ${itemPath}`, __)
      fsExtra.removeSync(`${itemPath}`)
    })
  })
}

module.exports = { eoclear }

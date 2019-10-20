/**********************
  *    event-demod
  */

const fsExtra = require('fs-extra')
const {report} = require('eodoes-muons')
const {wstree} = require('eodoes-muons')

/**********************
  * demod
  */
const demod = async (data, __) => {
  let { eoroot } = __

  let {packages, starter, themes, packagesPath, starterPath, themePaths} =
    wstree(data, __)
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
    'package.json',
    'node_modules',
  ]

  folders.forEach(function (folder) {
    items.forEach(function (item) {
      let itemPath = `${folder}/${item}`
      report.debug(`events.demod: removeSync ${itemPath}`, __)
      fsExtra.removeSync(`${itemPath}`)
    })
  })
}

module.exports = { demod }

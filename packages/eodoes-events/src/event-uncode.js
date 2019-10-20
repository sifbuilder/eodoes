/**********************
   *    event-uncode
   */

const fsExtra = require('fs-extra')
const {report} = require('eodoes-muons')
const {wstree} = require('eodoes-muons')

/**********************
      * uncode
      */
const uncode = async (data, __) => {
  let { eoroot } = __ // eslint-disable-line no-unused-vars
  let {eon, version, author, license, descr} = __.eonopts // eslint-disable-line no-unused-vars
  report.trace({eon, version, author, license}, __)

  let {packages, starter, themes, packagesPath, starterPath, themePaths} =
    wstree(data, __)
  report.trace({packages, starter, themes, packagesPath, starterPath, themePaths}, __)

  let folders = [
    eoroot,
  ]

  let items = [
    'package-lock.json',
    'yarn-error.log',
    'yarn.lock',
    'yarnrc',
    'README.md',
    'LICENSE',
    'gatsby-config.js',
    'gatsby-node.js',
    'gatsby-browser.js',
    'src',
    'packages',
  ]

  if (packages && packages !== './') items.push(packages) // packages

  folders.forEach(function (folder) {
    items.forEach(function (item) {
      let itemPath = `${folder}/${item}`
      report.debug(`event.uncode: removeSync ${itemPath}`, __)
      fsExtra.removeSync(`${itemPath}`)
    })
  })
}

module.exports = { uncode }

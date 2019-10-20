/**********************
   *    event-eoyarn
   */

const fsExtra = require('fs-extra')
const {report} = require('eodoes-muons')
const {exec} = require('eodoes-muons')

/**********************
      * eoyarn
      */
const eoyarn = async (data, __) => {
  let { eoroot } = __
  let {eon, version, author, license} = __.eonopts
  let { starter, packages } = __.eonopts
  let { themes } = __

  report.trace({eon, version, author, license}, __)

  let starterPath = starter ? `${starter}/` : ``
  let packagesPath = packages ? `${packages}/` : ``
  let themePaths = themes.map(theme => `${packagesPath}/${theme}`)

  report.trace({starterPath, packagesPath, themePaths}, __)

  let workspaces = starter ? [starter] : []
  if (packages) workspaces.push(`${packagesPath}*`)

  report.trace({eoroot, starterPath, themePaths}, __)

  if (fsExtra.existsSync(eoroot)) {
    report.debug(`event.eoyarn: exec yarn`, __)
    await exec({
      cmd: `yarn`,
      options: { cwd: eoroot },
    }, __)
  }

  if (fsExtra.existsSync(starterPath)) {
    report.debug(`event.eoyarn: exec yarn ${starterPath}`, __)
    await exec({
      cmd: `yarn`,
      options: { cwd: starterPath },
    }, __)
  }

  await Promise.all(themePaths.map(themePath => {
    if (fsExtra.existsSync(themePath)) {
      report.debug(`event.eoyarn: exec yarn ${themePath}`, __)
      exec({
        cmd: `yarn`,
        options: { cwd: themePath },
      }, __)
    }
  }))
}

module.exports = { eoyarn }

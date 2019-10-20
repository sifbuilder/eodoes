/**********************
   *    event-monitor
   */

const {report} = require('eodoes-muons')
const {exec} = require('eodoes-muons')
const { filer } = require('eodoes-muons')
const { resolvepath } = filer

// https://www.npmjs.com/package/execa/v/0.6.2

const fkill = require('fkill')

const chokidar = require('chokidar')
const watch = chokidar.watch

// .................. monitor
const monitor = (data, __) => {
  let { eoroot} = __
  let {starter} = __.eonopts

  let { viewopts } = __
  let { port } = viewopts
  let cwd = resolvepath([eoroot])
  let cmdDevelop = (starter) // develop
    ? `yarn workspace ${starter} run develop` // develop
    : `npm run develop`

  let { watcher, watchopts = {} } = __
  let {change, config} = watchopts
  change = change || []
  config = Object.assign({cwd: cwd, persistent: true}, config)

  if (!watcher) {
    report.trace({change, config}, __)

    const watcher = watch(change, config) // `${starterPath}gatsby-node.js`
    // eslint-disable-next-line no-console
    watcher.on('add', path => { console.log(`watcher add ${path}`) })
    watcher.on('change', async function (path) {
      try {
        report.debug(`event.monitor: exec fkill ${port}`, __)
        await fkill([`:${port}`], {force: true})
      } catch (e) {
        // console.log(`process did not exist`)
      }
      try {
        report.debug(`event.monitor: exec ${cmdDevelop}`, __)
        exec({ cmd: cmdDevelop, options: { cwd } }, __) // exec develop
      } catch (e) {
        // console.log(`monitor restart develop failed ${e}`)
      }
    })
    report.verb({watcher})
    __ = __.updState({watcher}, __)
  }
}

module.exports = { monitor }

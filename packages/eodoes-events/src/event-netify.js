/**********************
  *    event-netify
  */

const {report} = require('eodoes-muons')
const {exec} = require('eodoes-muons')
const { filer } = require('eodoes-muons')
const { resolvepath, fileUpdSync } = filer

// Netlify init
// https://github.com/netlify/cli/blob/master/src/commands/init.js
// To disconnect this directory and create a new site (or link to another siteId)
// 1. Run netlify unlink
// 2. Then run netlify init again
const netlifyInit = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot
  let cmd = `netlify init`
  report.debug(`event.netify:: exec ${cmd}`, __)
  await exec({
    cmd: cmd,
    options: {
      cwd,
    },
  }, __)
}

// Netlify open
const netlifyOpen = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot
  let cmd = `netlify open`
  report.debug(`event.netify:: exec ${cmd}`, __)
  await exec({
    cmd: cmd,
    options: {
      cwd,
    },
  }, __)
}

// netlifyApi
const netlifyApi = async (data, __) => { // eslint-disable-line no-unused-vars
  let {cwd, cmd} = data
  cmd = cmd.join(' ')
  report.debug(`event.netify:: exec ${cmd}`, __)
  await exec({
    cmd: cmd,
    options: {
      cwd,
    },
  }, __)
}

/**********************
  * netify
  */
const netify = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot

  report.debug(`event.netify:: fileUpdSync netlify.toml`, __)
  fileUpdSync({
    cwd: resolvepath(cwd, ''),
    file: 'netlify.toml',
    text: `
# example netlify.toml
[build]
command = "yarn run build"
functions = "functions"
publish = "."`,
  })

  await netlifyInit({cwd: eoroot}, __)
  await netlifyOpen({cwd: eoroot}, __)
}

module.exports = { netify }

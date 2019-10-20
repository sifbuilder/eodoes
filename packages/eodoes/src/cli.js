#!/usr/bin/env node
'use strict'

const path = require('path')

const {report} = require('eodoes-muons')

const {helper} = require('eodoes-core')
const {arger} = require('eodoes-core')
const {state} = require('eodoes-core')
const {eonem} = require('eodoes-core')

const muons = require('eodoes-muons')
const events = require('eodoes-events')
const microevents = require('eodoes-microevents')
const {filer} = require('eodoes-muons')
const { merger } = require('eodoes-muons')

const cwdDirPath = process.cwd() // current working directory
const eodoDirPath = __dirname // where eodo script resides
const util = require('util') // eslint-disable-line no-unused-vars
const semver = require(`semver`)
const updateNotifier = require(`update-notifier`)
const pkg = require(`../package.json`)
updateNotifier({
  pkg,
}).notify()
const MIN_NODE_VERSION = `>=8.0.0`
if (!semver.satisfies(process.version, MIN_NODE_VERSION)) {
  // eslint-disable-next-line no-console
  console.error(`
      Requires Node.js v8 or higher (you have ${process.version}).
      Upgrade Node to the latest stable release`)
}

let __ = { // init state

  updState: (v, s) => {
    let state = Object.assign(s, v)
    if ((s.eonopts && s.eonopts['track']) || (s.eo_tags && s.eo_tags['track'])) {
      console.log('->:', v) // eslint-disable-line no-console
    }
    return state
  },

  cwdDirPath: cwdDirPath, // process.cwd() current working directory
  eodoDirPath: eodoDirPath, // __dirname where eodo script resides

}

/**********************
 * doit
 */
async function doit (data, __) {
  let {eonitem, argv} = data

  let eostate = eonitem.getState()
  __ = merger.mergeDeep(__, eostate) // merge states

  let eonargs = arger.neoarger({argv}, __) // post process args
  let {eoevents, eonopts} = eonargs

  let name = 'eon'
  if (eonopts[`${name}`] === undefined) {
    // eon is special: can default to the basename of the eodoes
    let eocode = eonem.getEocode({}, __)
    eonopts[`${name}`] = eocode
  }

  // eodir is spacial: if not paramed, default to dir of eodo script
  if (eonopts.eodir === undefined) {
    eonopts.eodir = eodoDirPath
  }

  // let eodoesDirPath = filer.resolvepath(path.join(eodoDirPath)) // module eodoes
  // __ = __.updState({eodoesDirPath}, __) //  _e_

  // update from args and merged state
  __ = __.updState({eoevents, eonopts}, __)

  // eon can be identified as a flag or default to the eodir basename
  let eoroot // path where the --- will be created
  let { eon } = __.eonopts

  eoroot = filer.resolvepath(__.eo_pars.eodir, eon) // relative path to eodir/eon
  filer.dirUpdSync({twd: eoroot}) // create eoroot
  __ = __.updState({eoroot}, __)

  report.trace({eon, eoroot}, __)
  report.verb(`eodo found: ${Object.keys(__.eoevents).length} todo events`, __)

  if (Object.keys(__.eoevents).length === 0) helper.eohelp({}, __)
  for (let i = 0; i < Object.keys(__.eoevents).length; i++) {
    let key = Object.keys(__.eoevents)[i]
    let todoevent = __.eoevents[key]
    report.verb(`eodo: will try to do: ${key}`, __)
    await todoevent({}, __) // call event with state
  }
}

/**********************
 * run
 */
async function run (argv) {
  argv = argv.slice(2) // slice from process.argv

  __ = __.updState({helpmsg: helper.helpmsg}, __) // register help
  __ = __.updState({...state}, __) // register state
  __ = __.updState({events}, __)
  __ = __.updState({microevents}, __)
  __ = __.updState({muons}, __)

  let eonargs = arger.neoarger({argv}, __) // process args to get eodoes
  __ = __.updState({eo_pars: eonargs.eo_pars}, __)

  if (__.eo_pars.eodo === undefined) { // no eodo - first arg
    helper.eohelp({}, __) // if eodo called without args, call eohelp
  } else {
    if (__.eo_pars.eodo !== undefined) { // if an eodo has been set as par
      let eonitem = await eonem.getEonitem({}, __) // get eonitem depending on uritype
      if (eonitem === undefined) {
        helper.eohelp({}, __)
      }

      let eodoesDirPath = path.dirname(require.resolve(__.eo_pars.eodo)) // _e_
      __ = __.updState({eodoesDirPath}, __)

      doit({argv, eonitem}, __)
    }
  }
}

module.exports = { run }

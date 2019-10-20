/**********************
 *    @eonitem
 */
;(function (global, factory) { // eslint-disable-line no-extra-semi
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonitem = global.eonitem || {}))
})(this, function (exports) {
  'use strict'

  // ....................... eonitem
  async function eonitem (__eo = {}) {
    const {report} = require('eodoes-muons')
    const fs = require(`fs`)
    const path = require(`path`)
    const {promisify} = require('util')
    const readdir_promise = promisify(fs.readdir)
    const stat_promise = promisify(fs.stat)
    const fsExtra = require('fs-extra')
    const execa = require(`execa`)
    const { merger } = require('eodoes-muons')

    let isWin = process.platform === 'win32' // eslint-disable-line no-unused-vars
    let isLinux = process.platform === 'linux' // eslint-disable-line no-unused-vars

    let state = {

      helpmsg: ` 
      will operate on the eodo monorepo

      usage:      
        > node ./scripts/run eodoes-eodo-eodoer . eolab --updpck
`,

      eotags: {
        '--ver': '0.0.20',
        '--shownpm': false,
        '--dopublish': false,
        '--dryrun': false,
        '--updpck': false, // update eodoes manifest with root manifest.package
        '--showpack': false,
      },

    }

    // ....................... readPackageJson : read package.json file
    function readPackageJson ({filename}) {
      let pkg
      try {
        pkg = require(filename)
      } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
          console.log(`A package.json was not found at ${filename}`) /* eslint-disable-line no-console */
        } else {
          console.log(`A package.json was found at ${filename}, but it is not valid.`)/* eslint-disable-line no-console */
        }
      }
      return pkg
    }

    // ....................... pckshow : if showpack: cat manifest
    async function pckshow ({itemPath, pck, showpack}) {
      if (showpack) {
        let text = JSON.stringify(pck, null, 2)
        console.log('repo manifest:', itemPath, text) /* eslint-disable-line no-console */
      }
    }

    // ....................... pckupd : if updpck : update manifest with root version
    async function pckupd ({pckpath, pck, pckdelta, updpck}) {
      if (updpck) {
        let _pck = merger.mergeDeep(pck, pckdelta)
        let text = JSON.stringify(_pck, null, 2)
        fsExtra.writeFileSync(pckpath, text)
      }
    }

    // ....................... publishRepo : if dopublish: npm publish monorepo sub-repo
    async function publishRepo ({ itemPath, dopublish = false }) {
      if (dopublish) {
        console.log('publishRepo:', itemPath, {cwd: itemPath}) /* eslint-disable-line no-console */
        const {stdout} = execa('npm', ['publish'], {cwd: itemPath})
        console.log(stdout) /* eslint-disable-line no-console */
      }
    }

    // ....................... infoshow : if shownpm: show npm info of monorepo sub-repo
    async function infoshow ({ itemPath, shownpm = false }) {
      if (shownpm) {
        console.log('infoshow:', itemPath) /* eslint-disable-line no-console */
        const {stdout} = execa('npm', ['info'], {cwd: itemPath})
        console.log(stdout) /* eslint-disable-line no-console */
      }
    }

    // ....................... rundry : if dryrun: simulate npm publish monorepo sub-repo
    async function rundry ({ itemPath, dryrun = false }) {
      if (dryrun) {
        console.log('publishRepo:', itemPath, {cwd: itemPath}) /* eslint-disable-line no-console */
        const {stdout} = execa('npm', ['publish', '--dry-run'], {cwd: itemPath})
        console.log(stdout) /* eslint-disable-line no-console */
      }
    }

    // ....................... eolabMonorepo
    const eolabMonorepo = async ({cwd, monopck}, __) => {
      let { shownpm, dopublish, dryrun, updpck, showpack } = __.eonopts
      report.trace({ shownpm, dopublish, dryrun, updpck, showpack }, __)

      let pcksdir = path.resolve(cwd, `packages`)
      const itemnames = await readdir_promise(pcksdir, { encoding: 'utf8' })

      Promise.all(
        itemnames.map(async itemname => { // for each workspace
          let itemPath = path.resolve(pcksdir, itemname) // workspace path
          let itemstat = await stat_promise(itemPath)
          const isDirectory = itemstat.isDirectory() // is directory

          let pckpath = path.resolve(itemPath, 'package.json')
          let pck = readPackageJson({filename: pckpath}) // workspace
          let isPackage = pck !== undefined // has package.json

          if (isDirectory && isPackage) { // eolab each monorepo repo
            await pckshow({itemPath, pck, showpack})

            let pckdelta = monopck.package
            await pckupd({pckpath, pck, pckdelta, updpck})

            await infoshow({itemPath, shownpm})
            await rundry({itemPath, dryrun})
            await publishRepo({itemPath, dopublish})
          }
        })
      )
        .catch(function (err) {
          console.log(err.message) /* eslint-disable-line no-console */
        })
    }

    /**********************
      * eolab
      */
    const eolab = async (data, __) => {
      let { shownpm, dopublish, dryrun, updpck, showpack } = __.eonopts
      report.trace({shownpm, dopublish, dryrun, updpck, showpack}, __)
      let cwd = process.cwd()

      let pckpath = path.resolve(cwd, 'package.json')
      let monopck = readPackageJson({filename: pckpath})
      let isPackage = monopck !== undefined
      if (isPackage) {
        eolabMonorepo({cwd, monopck}, __)
      }
    }
    state.events = { eolab }

    // ....................... enty
    let enty = {}
    enty.getState = () => state
    return enty
  }

  exports.eonitem = eonitem
})

/**********************
 *    @eonitem
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonitem = global.eonitem || {}))
})(this, function (exports) {
  'use strict'

  // ....................... eonitem
  async function eonitem () {
    const {report} = require('eodoes-muons')
    const {wstree} = require('eodoes-muons')

    let state = {

      helpmsg: ` 
      will create eographs site
  
      usage:
        > cls&&node ./scripts/run eodoes-eodo-eocore ../eosites eoparse --doc --view
        > node ./scripts/run eodoes-eodo-eocore ../eosites --author sifbuilder --pwdgit ______ eoclear uncode eoparse eogit eohub netify --doc --view --debug
  `,

      eotags: {
        '--silent': true, // yarn silent
        '--useWorkspaces': true, // use workspaces
      },

      eventsopts: {
        delay: 4969,
      },
    }

    state.themes = []

    /**********************
      * eoparse__parcel
      */
    state[`eoparse__parcel`] = function (data, __) {
      let { eoroot } = __ // eslint-disable-line no-unused-vars
      let {eon, version, author, license, descr} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : '' // eslint-disable-line no-unused-vars
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars

      let {
        useWorkspaces,
        packages,
        starter,
        themes,
        packagesPath,
        starterPath,
        themePaths,
      } = wstree(data, __)

      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      let workspaces = useWorkspaces
        ? [ `${packagesPath}*` ]
        : []
      /**
       *  parcel
       */
      let parcel = {

        __eodoc_000: `
          ╭─────────────────────────────────────────────╮
          │       eographs                              │
          ╰─────────────────────────────────────────────╯`,
        //
        // 999 END
        //
        __eodoc_999: `
          ╭─────────────────────────────────────────────╮
          │       999 END                               │
          ╰─────────────────────────────────────────────╯`,
        __eobreak: `end break`,
      }
      return parcel
    }

    // ....................... enty
    let enty = {}
    enty.getState = () => state
    return enty
  }

  exports.eonitem = eonitem
})

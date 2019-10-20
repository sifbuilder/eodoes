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
    /* eslint-disable no-unused-vars */
    const {report} = require('eodoes-muons')
    const {wstree} = require('eodoes-muons')

    const { filer } = require('eodoes-muons')
    const { resolvepath } = filer

    let isWin = process.platform === 'win32'
    let isLinux = process.platform === 'linux' // eslint-disable-line no-unused-vars

    let state = {

      helpmsg: ` 
      sys env

      usage:      
      > node ./scripts/run eodoes-eodo-eoenv ../eosites eoparse --doc

      note:
        https://github.com/serverless/serverless/issues/6555
        https://docs.docker.com/docker-for-windows/wsl-tech-preview/
        https://github.com/microsoft/WSL/issues/3438
        sudo bash -c 'echo "nameserver 8.8.8.8" > /etc/resolv.conf'
        sudo bash -c 'echo "nameserver 8.8.4.4" >> /etc/resolv.conf'
`,
    }
    /* eslint-enable no-unused-vars */

    /**********************
      * eoparse__parcel
      */
    state[`eoparse__parcel`] = function (data, __) {
      /* eslint-disable no-unused-vars */
      let { eoroot } = __
      let {eon, version, author, license, descr, email} = __.eonopts

      /**
       *  parcel
       */
      let parcel = { // ---------------------- parcel

        __eodoc_000: `
      ╭─────────────────────────────────────────────────────────╮
      │  000  create eoenv                                    │
      ╰─────────────────────────────────────────────────────────╯`,

        //
        // 020 wsl
        //
        __eoexec_wsl_020: [{
          resolve: `wsl -l -v`,
          options: {
            __eodoc: `020 wsl`,
            cwd: ``,
          },
        } ],

        //
        // 120 resolv
        //
        __eofiles_resolv_120: [{
          resolve: `resolv.sh`,
          options: {
            __eodoc: `120 ${eoroot}/resolv.sh`,
            content: `
sudo bash -c 'echo "nameserver 8.8.8.8" > /etc/resolv.conf'
sudo bash -c 'echo "nameserver 8.8.4.4" >> /etc/resolv.conf'
`,
          },
        } ],

        __eodoc_999: `
          ╭─────────────────────────────────────────────╮
          │       999 END                               │
          ╰─────────────────────────────────────────────╯`,
        __eobreak__end: `break end`,

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

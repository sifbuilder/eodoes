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
      will create core site
  
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
      let silent = __.eonopts['silent'] ? '--silent' : ''
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
          │       gatsby eocore                         │
          │ Chris Biscardi and Jason Lengstorf          │
          │ https://www.youtube.com/watch?v=0Ta-awtLZTs │
          ╰─────────────────────────────────────────────╯`,
        //
        // 002 root manifest
        //
        __eofiles_parcels_002: [{
          resolve: `package.json`,
          options: {
            __eodoc: `002 file root manifest`,
            content: {
              name: `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: true,
              'scripts': {
                'develop': 'gatsby develop',
                'build': 'gatsby build',
              },
              workspaces: workspaces,
            },
          },
        },
        ],
        //
        // 004 starter manifest
        //
        __eofiles_starter: [{
          resolve: `${starterPath}/package.json`,
          options: {
            __eodoc: `004 file starter manifest`,
            content: {
              'name': useWorkspaces
                ? `${starter}`
                : `${eon}`,
              'version': `${version}`,
              'description': `${descr}`,
              'author': `${author}`,
              'license': `${license}`,
              'scripts': {
                'develop': 'gatsby develop',
                'build': 'gatsby build',
                'serve': 'gatsby serve',
                'clean': 'gatsby clean',
              },
              'dependencies': {
                'gatsby': '^2.13.2',
                'react': '^16.8.6',
                'react-dom': '^16.8.6',
              },

            },
          },
        },
        ],
        //
        // 006 yarn
        //
        __eoexec__yarn__006: {
          resolve: `yarn ${silent}`,
          options: {
            __eodoc: `006 yarn with init dependencies`,
            cwd: ``,
          },
        },
        //
        // 008 init index
        //
        __eofiles_index_008: [{
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `008a create empty ${starterPath}src/pages/index.js`,
            content: `
import React from "react"

const Index = () => (
  <>
    <h1><p>hello from ${starter}</p></h1>
  </>
)

export default Index
`,
          },
        },
        {
          resolve: `${starterPath}src/pages/404.js`,
          options: {
            __eodoc: `008b create 404 page`,
            content: `
import React from "react"

export default () => (
  <div><h1>Page not found</h1></div>
)
`,
          },
        } ],
        //
        // 010 stop server
        //
        __eorestart__010: {
          options: {
            __eodoc: `010 restart server`,
          },
        },
        //
        // 012 view index
        //
        __eoview__012____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       012 view entry page                   ║
            ╚═════════════════════════════════════════════╝` },
        },
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

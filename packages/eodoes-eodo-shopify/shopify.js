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
      will create shopify site
  
      usage:
        > cls&&node ./scripts/run eodoes-eodo-shopify ../eosites eoparse --doc --view
        > node ./scripts/run eodoes-eodo-shopify ../eosites --author sifbuilder --pwdgit ______ eoclear uncode eoparse eogit eohub netify --doc --view --debug
  `,

      eotags: {
        '--silent': true, // yarn silent
        '--useWorkspaces': true, // use workspaces
      },

      eventsopts: {
        delay: 4969,
      },
    }

    state.themes = [
      'gatsby-shopify-theme',
    ]

    /**********************
      * eoparse__parcel
      */
    state[`eoparse__parcel`] = function (data, __) {
      /* eslint-disable no-unused-vars */
      let { eoroot } = __
      let {eon, version, author, license, descr} = __.eonopts
      let silent = __.eonopts['silent'] ? '--silent' : ''
      let { delay = 3969 } = __.eventsopts

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

      /* eslint-enable no-unused-vars */

      let workspaces = useWorkspaces
        ? [ `${packagesPath}*` ]
        : []

      /**
       *  parcel
       */
      let parcel = {

        __eodoc_000: `
          ╭─────────────────────────────────────────────╮
          │       gatsby shopify                         │
          │ https://www.youtube.com/watch?v=a5gf60QUZ7k │
          │ https://github.com/gil--/gatsby-starter-shopifypwa │
          │ https://blog.rousek.name/2018/04/12/statically-generated-ecommerce-using-shopify-and-netlify/ │
          │ https://github.com/alexislepresle/gatsby-shopify-theme │
          │                                             │
          │                   TOBEDONE                  │
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
        // 016 YDV view index
        //
        __eoview__016____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eoyarn: `016 eoyarn`,
            __eorestart: `016 restart`,
            __eodoc: `
          ╔═════════════════════════════════════════════╗
          ║       016 YDV view entry page               ║
          ╚═════════════════════════════════════════════╝` },
        },

        //
        // 500 install ${themes[0]}
        //
        __eodoc__500: `
        ┌────────────────────────────────────────────────┐
        │                                                │
        │       500 install shopify                  │
        │                                                │
        └────────────────────────────────────────────────┘`,
        //
        // 500 download shopify zip
        //
        __eofetch_shopify_500: [{
          resolve: `https://github.com/alexislepresle/gatsby-shopify-theme/archive/master.zip`,
          options: {
            __eodoc: `500 download shopify tar`,
            file: `tmp/gatsby-shopify-theme-master.zip`,
          },
        }],
        //
        // 510 unzip shopify
        //
        __eounzip_netlify_cms_510: [{
          resolve: `tmp/gatsby-shopify-theme-master.zip`,
          options: {
            __eodoc: `510 unzip tar`,
            folder: `tmp`,
          },
        }],

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

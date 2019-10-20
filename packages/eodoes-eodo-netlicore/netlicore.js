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

      helpline: [
        `netlicore: netlify theme workspace`,
        `./eodos/netlicore ../eosites eoparse --doc --view`,
      ],

      helpmsg: ` 
      netlify as theme workspace
  
      usage:
        > node ./scripts/run eodoes-eodo-netlicore ../eosites eoparse --doc --view
  `,

      eotags: {
        '--silent': true, // yarn silent
        '--useWorkspaces': true, // use workspaces
      },

      eventsopts: {
        delay: 2969,
      },
    }

    state.themes = [
      'gatsby-theme-netlify-cms',
    ]

    /**********************
      * eoparse__parcel
      */
    state[`eoparse__parcel`] = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : '' // eslint-disable-line no-unused-vars
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

      /**
       *  parcel
       */
      let parcel = {

        __eodoc_000: `
          ╭─────────────────────────────────────────────╮
          │ https://www.youtube.com/watch?v=PS2784YfPpw │
          ╰─────────────────────────────────────────────╯`,

        __eofiles_parcels_002: [{ // 002 root manifest
          resolve: `package.json`,
          options: {
            __eodoc: `002 file root manifest`,
            content: {
              name: `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: true,
              'devDependencies': {
                'chokidar': '*',
                'fkill': '*',
              },
              workspaces: useWorkspaces
                ? [ `${packagesPath}*` ]
                : [],
            },
          },
        },
        ],
        //
        // 004 install ${starter}
        //
        __eodoc__004: `
        ┌────────────────────────────────────────────────┐
        │                                                │
        │       004 install ${starter}                   │
        │                                                │
        └────────────────────────────────────────────────┘`,
        //
        //
        // 004 create stater manifest
        //
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
              private: false,
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
        // 008 create stater index page with hi react component
        //
        __eofiles_index_008: [{
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `008a create ${starterPath}src/pages/index.js`,
            content: `
import React from "react"

const Index = () => (
  <>
    <h1><p>Hello</p></h1>
  </>
)

export default Index
`,
          },
        },
        //
        // 008 create 404 page
        //
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
        // 009 create static
        //
        __eofiles_starter_009: [{
          resolve: `${starterPath}static/images/info.txt`,
          options: {
            __eodoc: `009 create static `,
            content: ``,
          },
        } ],
        //
        // 009 create static
        //
        __eofiles_starter_010: [{
          resolve: `${starterPath}static/images/uploads/info.txt`,
          options: {
            __eodoc: `009 create static `,
            content: ``,
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
        // 020 install ${themes[0]}
        //
        __eodoc__020: `
        ┌────────────────────────────────────────────────┐
        │                                                │
        │       install ${themes[0]}                 │
        │                                                │
        └────────────────────────────────────────────────┘`,
        //
        // 022 theme0 manifest
        //
        __eofiles_theme0_with_dependencies_022: [{
          resolve: `${themePaths[0]}package.json`,
          options: {
            __eodoc: `022 ${themes[0]} manifest`,
            content: {
              'name': `${themes[0]}`,
              'version': '0.0.1',
              'main': 'index.js',
              'license': 'MIT',
              'dependencies': {
                'gatsby': '*',
                'react': '*',
                'react-dom': '*',
                'gatsby-plugin-netlify-cms': '^4.1.6',
                'netlify-cms-app': '^2.9.7',
              },
            },
          },
        } ],
        //
        // 026 create theme0 empty index page
        //
        __eofiles_theme0_init_026: [ {
          resolve: `${themePaths[0]}index.js`,
          options: {
            __eodoc: `026 init ${themes[0]} with index`,
            content: ``,
          },
        } ],
        //
        // 009 create STARTER static
        //
        __eofiles_theme_static_009: [{
          resolve: `${starterPath}static/admin/config.yml`,
          options: {
            __eodoc: `009 create static `,
            content: `backend:
  name: git-gateway # _e_ #
  accept_roles:
    - admin
  branch: master  
media_folder: static/assets
public_folder: assets
collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "_posts/blog" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - {label: "Layout", name: "layout", widget: "hidden", default: "blog"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Featured Image", name: "thumbnail", widget: "image"}
      - {label: "Rating (scale of 1-5)", name: "rating", widget: "number"}
      - {label: "Body", name: "body", widget: "markdown"}
`,
          },
        } ],

        //
        // 028 gatsby config starter - export theme0
        //
        __eofiles__config_028: [ {
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `028 starter to use ${themes[0]} (${starter} gatsby-config)`,
            content: `
module.exports = {
  plugins: [
    '${themes[0]}'
  ],
}
`,
          },
        } ],
        //
        // 036 theme0 gatsby config: config plugins
        //
        __eofiles_theme0_config_036: [ {
          resolve: `${themePaths[0]}gatsby-config.js`,
          options: {
            __eodoc: `036 config ${themes[0]} with page creator and client paths`,
            content: `
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: \`\${__dirname}/src/cms/cms.js\`,
      },
    },
  ]
}
`,
          },
        } ],

        //
        // 035 theme0 cms
        //
        __eofiles_theme0_config_035: [ {
          resolve: `${themePaths[0]}src/cms/cms.js`,
          options: {
            __eodoc: `035 ${themes[0]} cms`,
            content: `
import CMS from 'netlify-cms-app'

CMS.init()
`,
          },
        } ],

        //
        // 600 YDV view home
        //
        __eoview__600____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eoyarn: `600 eoyarn`,
            __eorestart: `600 restart`,
            __eodoc: `
          ╔═════════════════════════════════════════════╗
          ║       600 YDV view home               ║
          ╚═════════════════════════════════════════════╝` },
        },
        //
        // 700 YDV view admin
        //
        __eoview__700____________________: {
          resolve: `http://localhost:8000/admin/`,
          options: {
            __eodelay: delay,
            __eodoc: `
          ╔═════════════════════════════════════════════╗
          ║       700 YDV view admin page               ║
          ╚═════════════════════════════════════════════╝` },
        },
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

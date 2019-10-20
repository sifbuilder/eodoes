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
      Sourcing from Netlify CMS      
      https://www.gatsbyjs.org/docs/sourcing-from-netlify-cms/

      usage:      
      > node ./scripts/run eodoes-eodo-netlisrc ../eosites eoparse --doc --view

  `,

      eotags: {
        '--silent': true, // yarn silent
        '--useWorkspaces': false, // use workspaces
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
      let {eoroot} = __ // eslint-disable-line no-unused-vars
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : ''
      let { delay = 2969 } = __.eventsopts

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
          ╭──────────────────────────────────────────────────────────╮
          │ https://www.gatsbyjs.org/docs/sourcing-from-netlify-cms/ │
          ╰──────────────────────────────────────────────────────────╯`,

        __eofiles_starter_002: [{ // 002 root manifest
          resolve: `package.json`,
          options: {
            __eodoc: `002 root manifest`,
            content: {
              'name': `${eon}`,
              'version': `${version}`,
              'description': `${descr}`,
              'author': `${author}`,
              'license': `${license}`,
              'scripts': {},
              'dependencies': {},
            },
          },
        } ],

        __eofiles_starter_004: [{ // 004 starter manifest
          resolve: `package.json`,
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
                'monitor': `chokidar "gatsby-*.js" -c "fkill -f :8000 && gatsby develop"`,
                'eowatch': `chokidar "gatsby-*.js" -c "fkill -f :8000"`,
                'develop': 'gatsby develop',
                'build': 'gatsby build',
                'serve': 'gatsby serve',
                'clean': 'gatsby clean',
              },
              'dependencies': {
                'gatsby': '*',
                'react': '*',
                'react-dom': '*',
              },
            },
          },
        } ],

        __eoexec__yarn__104: { // 104 yarn
          resolve: `yarn ${silent}`,
          options: {
            __eodoc: `104 yarn`,
            cwd: ``,
          },
        },

        __eoexec__gatsby_new__112: { // 112 gatsby_new
          resolve: `yarn add netlify-cms-app gatsby-plugin-netlify-cms`,
          options: {
            __eodoc: `112 gatsby_new`,
            cwd: ``,
          },
        },

        __eofiles_gatsby_confin_114: [{
          resolve: `gatsby-config.js`,
          options: {
            __eodoc: `114 starter admin`,
            content: `
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: \`\${__dirname}/src/cms/cms.js\`,
      }
    }
  ]
}
`,
          },
        } ],

        __eofiles_starter_admin_120: [{
          resolve: `static/admin/config.yml`,
          options: {
            __eodoc: `120 starter admin https://www.netlifycms.org/docs/add-to-your-site/`,
            content: `
backend:
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

        __eofiles_starter_admin_122: [{
          resolve: `static/admin/index.html`,
          options: {
            __eodoc: `122 index.html`,
            content: `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
</body>
</html>
`,
          },
        } ],
        __eofiles_starter_admin_130: [{
          resolve: `src/cms/cms.js`,
          options: {
            __eodoc: `130 cms`,
            content: `
import CMS from 'netlify-cms-app'
`,
          },
        } ],

        __eofiles_index_140: [{ // 140 init index
          resolve: `src/pages/index.js`,
          options: {
            __eodoc: `140 create src/pages/index.js`,
            content: `
import React from "react"

export default () => (
<div>
  <h1>Hello</h1>
</div>
)
`,
          },
        } ],

        __eorestart__170: { // 170 restart server
          options: {
            __eodoc: `170 restart server`,
          },
        },

        __eoview__180____________________: { // 180 view
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════════╗
            ║             180    index                       ║
            ╚═════════════════════════════════════════════════╝` },
        },

        __eoview__190____________________: { // 190 view
          resolve: `http://localhost:8000/admin/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════════╗
            ║                     admin                       ║
            ╚═════════════════════════════════════════════════╝` },
        },

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

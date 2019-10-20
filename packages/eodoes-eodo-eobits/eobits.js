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
      will create eobits
      dispatch client-site routes to a number of frontends (Chris Biscardi)
  
      usage:
        > cls&&node ./scripts/run eodoes-eodo-eobits ../eosites eoclear uncode eoparse --doc --view
  `,

      eotags: {
        '--useWorkspaces': true, // use workspaces
      },

      eventsopts: {
        delay: 4969,
      },
    }

    state.themes = [
      'gatsby-theme-theme-0',
      'gatsby-theme-theme-1',
    ]

    /**********************
      * eoparse__parcel
      */
    state[`eoparse__parcel`] = function (data, __) {
      let { eoroot } = __ // eslint-disable-line no-unused-vars
      let {eon, version, author, license, descr} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : ''
      let verbose = __.eonopts['verbose'] ? '--verbose' : ''
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars

      let {
        useWorkspaces,
        packages,
        workspaces,
        starter,
        themes,
        packagesPath,
        starterPath,
        themePaths,
      } = wstree(data, __)

      report.trace({useWorkspaces, workspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      let workspacesref = useWorkspaces
        ? [ `${packagesPath}*` ]
        : []
      /**
       *  parcel
       */
      let parcel = {

        __eodoc_000: `
          ╭─────────────────────────────────────────────╮
          │    000   gatsby eobits                      │
          ╰─────────────────────────────────────────────╯`,
        //
        // 002 root manifest
        //
        __eofiles_root_manifest_002: [{
          resolve: `package.json`,
          options: {
            __eodoc: `002 file root manifest`,
            content: {
              name: `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: true,
              'scripts': {
                'develop': 'yarn workspace ',
              },
              'devDependencies': {
                'chokidar': '*',
                'fkill': '*',
              },
              workspaces: workspacesref,
            },
          },
        },
        ],
        //
        // 004 starter manifest
        //
        __eofiles_starter_004: [{ // 004 starter manifest
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
        // 006 yarn starter
        //
        __eoexec_starter_yarn_006: {
          resolve: `yarn ${silent} ${verbose} `,
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |  006  yarn ${silent} ${verbose}         |
            └─────────────────────────────────────────┘`,
            cwd: ``,
          },
        },
        //
        // 008 starter index, 404
        //
        __eofiles_starter_index_008: [{
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `008a create empty ${starterPath}src/pages/index.js`,
            content: `
import React from "react"

const Index = () => (
  <>
    <h1><p>hello from the ${starter}</p></h1>
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
        // 100 install ${themes[0]}
        //
        __eodoc__100: `
        ┌─────────────────────────────────────────────────────┐
        |   100 install ${themes[0]}                          |        
        └─────────────────────────────────────────────────────┘`,
        //
        // 102 theme0 manifest
        //
        __eofiles_theme0_with_dependencies_102: [{
          resolve: `${themePaths[0]}package.json`,
          options: {
            __eodoc: `102 ${themes[0]} manifest with peer gatsby dependencies`,
            content: {
              'name': `${themes[0]}`,
              'version': '0.0.1',
              'main': 'index.js',
              'license': 'MIT',
              'peerDependencies': {
                'gatsby': '^2.13.2',
                'react': '^16.8.6',
                'react-dom': '^16.8.6',
              },
            },
          },
        } ],

        //
        // 104 yarn will use the local version of ${themes[0]}
        //
        __eodoc__104: `104 yarn will use the local version of ${themes[0]}`,
        //
        // 106 create theme0 empty index page
        //
        __eofiles_theme0_init_106: [ {
          resolve: `${themePaths[0]}index.js`,
          options: {
            __eodoc: `106 init ${themes[0]} with index`,
            content: ``,
          },
        } ],
        //
        // 108 gatsby config theme0 in starter
        //
        __eofiles__config_108: [ {
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `108 starter to use ${themes[0]} (${starter} gatsby-config)`,
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
        // 110 intall gatsby plugins page creator for ${themes[0]}
        //
        __eodoc__110: `110 intall gatsby plugins page creator and client paths for ${themes[0]}`,
        //
        // 112 add gatsby plugin dependencies to theme manifest
        //
        __eofiles_theme0_with_plugins_112: [{
          resolve: `${themePaths[0]}package.json`,
          options: {
            __eodoc: `112 create manifest of ${themes[0]} with gatsby plugins`,
            content: {
              'name': `${themes[0]}`,
              'version': '0.0.1',
              'main': 'index.js',
              'license': 'MIT',
              'peerDependencies': {
                'gatsby': '^2.13.2',
                'react': '^16.8.6',
                'react-dom': '^16.8.6',
              },
              'dependencies': {
                'gatsby-plugin-page-creator': '*',
              },
            },
          },
        } ],
        //
        // 114 add theme0 workspace to starter
        //
        __eoexec_starter_workspaces_114: {
          resolve: `yarn ${silent} ${verbose} workspace ${starter} add ${themes[0]}@*`,
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────────────────┐
            |  114 yarn workspace ${starter} add ${themes[0]}@*   |        
            └─────────────────────────────────────────────────────┘`,
            __eodelay: delay,
            cwd: ``,
          },
        },
        //
        // 116 yarn ${themes[0]}
        //
        __eoexec_starter_workspaces_116: {
          resolve: `yarn ${silent} ${verbose} `,
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |  116  ${themePaths[0]}yarn              |
            └─────────────────────────────────────────┘`,
            cwd: `${themePaths[0]}`,
          },
        },
        //
        // 118 yarn workspaces info
        //
        __eoexec__yarn__118: {
          resolve: `yarn workspaces info`,
          options: {
            __eodoc: `118 yarn workspaces info`,
            cwd: ``,
          },
        },
        //
        // 120 restart server
        //
        __eorestart__120: {
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |  120 restart server                     |
            └─────────────────────────────────────────┘`,
          },
        },
        //
        // 122 gatsby config themes[0]
        //  the site will be an application /app
        //     the /dashboard/ sub-url is client side only
        //
        __eofiles_theme0_config_122: [ {
          resolve: `${themePaths[0]}gatsby-config.js`,
          options: {
            __eodoc: `122 config ${themes[0]} with page creator and client paths`,
            content: `
module.exports = {
  plugins: [{
    resolve: 'gatsby-plugin-page-creator',
    options: {
      path: \`\${__dirname}/src/pages\`
    }
  }]
}
`,
          },
        } ],
        //
        // 124 theme0 src/pages/dashboard.js
        //
        __eofiles_theme0_init_124: [
          {
            resolve: `${themePaths[0]}src/pages/dashboard.js`,
            options: {
              __eodoc: `124 dashboard page for ${themes[0]}`,
              content: `
import React from 'react'

const Dashboard = () => <h1><div>entry to dashboard app in ${themes[0]}</div></h1>

export default Dashboard
`,
            },
          },
        ],
        //
        // 126 view dashboard
        //
        __eoview_view_126: {
          resolve: `http://localhost:8000/dashboard`,
          options: {
            __eodelay: delay,
            __eodoc: `
             ╔═════════════════════════════════════════════╗
             ║   126 view starter dashboard                ║
             ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 128 add dashboard link to starter index page
        //
        __eofiles_starter_more_128: [ {
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `128 create ${starter} index with link to ${themes[0]} dashboard`,
            content: `
import React from "react"
import { Link } from 'gatsby'

const Index = () => (
  <>
    <h1><p>Hey this is the home page with links to other places</p></h1>
    <p>${starter} entry page exposes link to dashboard</p>
    <Link to ="/dashboard">Dashboard</Link>
  </>)

export default Index
`,
          },
        } ],
        //
        // 130 view index
        //
        __eoview_view_130: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
             ╔═════════════════════════════════════════════╗
             ║  130 view starter index page with link      ║
             ╚═════════════════════════════════════════════╝`,
          },
        },

        //
        // 132 view index
        //
        __eoview_view_132: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
             ╔═════════════════════════════════════════════╗
             ║   132 view starter index page with link     ║
             ╚═════════════════════════════════════════════╝`,
          },
        },

        //
        // 134 theme update /dashboard index to add router
        //
        __eofiles_theme0_dashboard_router_134: [{
          resolve: `${themePaths[0]}src/pages/dashboard.js`,
          options: {
            __eodoc: `${themes[0]}: 134 update ${themes[0]} /dashboard page with routing`,
            content: `
import React from 'react'
import { Link } from 'gatsby'

const Dashboard = () =>
  <div>
    <h1>the dashboard page in ${themes[0]}</h1>
    <h3><p>includes the link to Home</p></h3>

    <nav>
      <Link to="/">Home</Link>
    </nav>

  </div>

export default Dashboard
`,
          },
        } ],
        //
        // 136 view dashboard
        //
        __eoview_view_136: {
          resolve: `http://localhost:8000/dashboard`,
          options: {
            __eodelay: delay,
            __eodoc: `
             ╔═════════════════════════════════════════════╗
             ║   136 view dashboard with link to home in ${themes[0]}                ║
             ╚═════════════════════════════════════════════╝`,
          },
        },

        //
        // 200 intall ${themes[1]} with static routing
        //
        __eodoc__200: `
        ┌──────────────────────────────────────────────────────┐
        |      200  intall ${themes[1]}                        |
        └──────────────────────────────────────────────────────┘`,
        //
        // 202 themes[1] manifest
        //
        __eofiles_theme0_with_dependencies_202: [{
          resolve: `${themePaths[1]}package.json`,
          options: {
            __eodoc: `202 ${themes[1]} manifest with peer gatsby dependencies`,
            content: {
              'name': `${themes[1]}`,
              'version': '0.0.1',
              'main': 'index.js',
              'license': 'MIT',
              'peerDependencies': {
                'gatsby': '*',
                'react': '*',
                'react-dom': '*',
              },
            },
          },
        } ],
        //
        // 204 add gatsby plugin dependencies to theme manifest
        //
        __eofiles_theme0_with_plugins_204: [{
          resolve: `${themePaths[1]}package.json`,
          options: {
            __eodoc: `204 ${themes[1]} manifest with plugins`,
            content: {
              'name': `${themes[1]}`,
              'version': '0.0.1',
              'main': 'index.js',
              'license': 'MIT',
              'peerDependencies': {
                'gatsby': '^2.13.2',
                'react': '^16.8.6',
                'react-dom': '^16.8.6',
              },
              'dependencies': {
                'gatsby-plugin-page-creator': '*',
              },
            },
          },
        } ],
        //
        // 206 add ${themes[1]} workspace to starter
        //
        __eoexec_starter_workspaces_206: {
          resolve: `yarn ${silent} ${verbose}  workspace ${starter} add ${themes[1]}@*`,
          options: {
            __eodoc: `
            ┌───────────────────────────────────────────────────────┐
            |  206  yarn workspace ${starter} add  ${themes[1]}     |
            └───────────────────────────────────────────────────────┘`,
            cwd: `${themePaths[0]}`,
          },
        },
        //
        // 208 yarn  workspaces info
        //
        __eoexec__yarn__208: {
          resolve: `yarn workspaces info`,
          options: {
            __eodoc: `208 yarn workspaces info`,
            cwd: ``,
          },
        },
        //
        // 210 init theme1 index
        //
        __eofiles_theme1_init_210: [ {
          resolve: `${themePaths[1]}index.js`,
          options: {
            __eodoc: `210 init ${themes[1]} with index`,
            content: ``,
          },
        } ],
        //
        // 212 export themes in starter
        //
        __eofiles__config_212: [ {
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `212 starter to export themes in gatsby config`,
            content: `
module.exports = {
  plugins: [
    '${themes[0]}', '${themes[1]}'
  ],
}
        `,
          },
        } ],
        //
        // 214 theme1 config for creation of static pages in theme1/src/pages
        //
        __eofiles_theme1_config_214: [ {
          resolve: `${themePaths[1]}gatsby-config.js`,
          options: {
            __eodoc: `214 config theme`,
            content: `
module.exports = {
  plugins: [{
    resolve: 'gatsby-plugin-page-creator',
    options: {
      path: \`\${__dirname}/src/pages\`
    }
  }]
}
`,
          },
        } ],
        //
        // 216 restart server
        //
        __eorestart__216: {
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |    216 restart server                   |
            └─────────────────────────────────────────┘`,
          },
        },
        //
        // 218 theme1 create account
        //
        __eofiles_theme1_account_218: [{
          resolve: `${themePaths[1]}src/pages/account.js`,
          options: {
            __eodoc: `218 ${themes[1]} create account`,
            content: `
import React from 'react'
import { Link } from 'gatsby'

const Account = () =>
  <div>
    <h1>the account page in ${themes[1]}</h1>
    <Link to="/">Home</Link>
  </div>
export default Account
`,
          },
        } ],

        //
        // 220 starter index
        //
        __eofiles_index_220: [{
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `220 create empty ${starterPath}src/pages/index.js`,
            content: `
import React from "react"
import { Link } from 'gatsby'

const Index = () => (
  <>
  <h1><p>${starter} entry point</p></h1>
  <h3><p>the starter exposes links to the /dashboard in ${themes[0]}</p></h3>
  <h3><p>and to the /account in ${themes[1]}</p></h3>

  <p><Link to ="/dashboard">Dashboard</Link></p>
  <p><Link to ="/account">Account</Link></p>
  <p><Link to="/">Home</Link></p>

  </>
)

export default Index
`,
          },
        } ],

        //
        // 224 view index
        //
        __eoview__224____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodoc: `
            ╔═════════════════════════════════════════════════╗
            ║  224 view index with links to two eobits║
            ╚═════════════════════════════════════════════════╝` },
        },
        //
        // 226 view dashboard
        //
        __eoview__226____________________: {
          resolve: `http://localhost:8000/dashboard`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════════╗
            ║  226 visit account home page                    ║
            ╚═════════════════════════════════════════════════╝` },
        },
        //
        // 228 view account
        //
        __eoview__228____________________: {
          resolve: `http://localhost:8000/account`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════════╗
            ║  228 visit account profile                      ║
            ╚═════════════════════════════════════════════════╝` },
        },
        //
        // 230 view home
        //
        __eoview__230____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════════╗
            ║  230 visit home                                 ║
            ╚═════════════════════════════════════════════════╝` },
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

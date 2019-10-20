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
      will create microfrontends
      dispatch client-site routes to a number of frontends (Chris Biscardi)
  
      usage:
        > cls&&node ./scripts/run eodoes-eodo-microfrontends ../eosites eoclear uncode eoparse --doc --view
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
          │    000   gatsby microfrontends              │
          │ Chris Biscardi and Jason Lengstorf          │
          │ https://www.youtube.com/watch?v=0Ta-awtLZTs │
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
              'devDependencies': {
                'chokidar': '*',
                'fkill': '*',
              },
              workspaces: workspaces,
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
                'monitor': `chokidar "gatsby-*.js" -c "fkill -f :8000 && gatsby develop"`,
                'eowatch': `chokidar "gatsby-*.js" -c "fkill -f :8000"`,
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
    <h1><p>${eon} home page</p></h1>
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
        // 010 restart server
        //
        __eorestart__010: {
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |  010 restart server                     |
            └─────────────────────────────────────────┘`,
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
            ║       012 view index                        ║
            ╚═════════════════════════════════════════════╝` },
        },
        //
        // 120 install ${themes[0]}
        //
        __eodoc__120: `
        ┌─────────────────────────────────────────────────────┐
        |   120 install ${themes[0]} with dynamic routing     |        
        └─────────────────────────────────────────────────────┘`,
        //
        // 122 theme0 manifest
        //
        __eofiles_theme0_with_dependencies_122: [{
          resolve: `${themePaths[0]}package.json`,
          options: {
            __eodoc: `122 ${themes[0]} manifest with peer gatsby dependencies`,
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
        // 124 add theme0 workspace to starter (and install)
        //
        __eoexec_starter_workspaces_124: {
          resolve: `yarn ${silent} ${verbose} workspace ${starter} add ${themes[0]}@*`,
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────────────────┐
            |  124 yarn workspace ${starter} add ${themes[0]}@*   |        
            └─────────────────────────────────────────────────────┘`,
            __eodelay: delay,
            cwd: ``,
          },
        },
        //
        // 126 yarn ${themes[0]}
        //
        __eoexec_starter_workspaces_126: {
          resolve: `yarn ${silent} ${verbose} `,
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |  126  ${themePaths[0]}yarn              |
            └─────────────────────────────────────────┘`,
            cwd: `${themePaths[0]}`,
          },
        },
        //
        // 128 yarn workspaces info
        //
        __eoexec__yarn__128: {
          resolve: `yarn workspaces info`,
          options: {
            __eodoc: `128 yarn workspaces info`,
            cwd: ``,
          },
        },
        //
        // 130 restart server
        //
        __eorestart__130: {
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |  130 restart server                     |
            └─────────────────────────────────────────┘`,
          },
        },
        //
        // 132 yarn will use the local version of ${themes[0]}
        //
        __eodoc__132: `132 yarn will use the local version of ${themes[0]}`,
        //
        // 134 create theme0 empty index page
        //
        __eofiles_theme0_init_134: [ {
          resolve: `${themePaths[0]}index.js`,
          options: {
            __eodoc: `134 init ${themes[0]} with index`,
            content: ``,
          },
        } ],
        //
        // 136 gatsby config theme0 in starter
        //
        __eofiles__config_136: [ {
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `136 starter to use ${themes[0]} (${starter} gatsby-config)`,
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
        // 138 intall gatsby plugins page creator and client paths for ${themes[0]}
        //  gatsby-plugin-create-client-paths
        //    client-paths exist on the client only and do not correspond to index.html files in an app’s built assets
        //
        __eodoc__138: `138 intall gatsby plugins page creator and client paths for ${themes[0]}`,
        //
        // 140 add gatsby plugin dependencies to theme manifest
        //
        __eofiles_theme0_with_plugins_140: [{
          resolve: `${themePaths[0]}package.json`,
          options: {
            __eodoc: `140 create manifest of ${themes[0]} with gatsby plugins`,
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
                'gatsby-plugin-create-client-paths': '*',
                'gatsby-plugin-page-creator': '*',
              },
            },
          },
        } ],
        //
        // 142 yarn for ${themes[0]} manifest
        //
        __eoexec_starter_workspaces_142: {
          resolve: `yarn ${silent} ${verbose} `,
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |  142  ${themePaths[0]} yarn             |
            └─────────────────────────────────────────┘`,
            cwd: `${themePaths[0]}`,
          },
        },
        //
        // 144 restart server
        //
        __eorestart__144: {
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |  144 restart server                     |
            └─────────────────────────────────────────┘`,
          },
        },
        //
        // 146 gatsby config themes[0]
        //  the site will be an application /app
        //     the /app/dashboard/ sub-url is client side only
        //
        __eofiles_theme0_config_146: [ {
          resolve: `${themePaths[0]}gatsby-config.js`,
          options: {
            __eodoc: `146 config ${themes[0]} with page creator and client paths`,
            content: `
module.exports = {
  plugins: [{
    resolve: 'gatsby-plugin-create-client-paths',
    options: {
      prefixes: ['/app/dashboard/*']
    }
  },
  {
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
        // 148 theme0 src/pages/app/dashboard.js
        //
        __eofiles_theme0_init_148: [
          {
            resolve: `${themePaths[0]}src/pages/app/dashboard.js`,
            options: {
              __eodoc: `148 app/dashboard page for ${themes[0]}`,
              content: `
import React from 'react'

const Dashboard = () => <h1><div>entry to dashboard app in ${themes[0]}</div></h1>

export default Dashboard
`,
            },
          },
        ],
        //
        // 150 add dashboard link to starter index page
        //
        __eofiles_starter_more_150: [ {
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `150 create ${starter} index with link to ${themes[0]} dashboard`,
            content: `
import React from "react"
import { Link } from 'gatsby'

const Index = () => (
  <>
    <h1><p>${eon} page</p></h1>
    <p>${starter} entry page with link to dashboard</p>
    <Link to ="/app/dashboard">Dashboard</Link>
  </>)

export default Index
`,
          },
        } ],
        //
        // 152 view index
        //
        __eoview_view_152: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
             ╔═════════════════════════════════════════════╗
             ║  152 view starter index page with link      ║
             ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 154 view dashboard
        //
        __eoview_view_154: {
          resolve: `http://localhost:8000/app/dashboard`,
          options: {
            __eodelay: delay,
            __eodoc: `
             ╔═════════════════════════════════════════════╗
             ║   154 view starter dashboard                ║
             ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 156 view index
        //
        __eoview_view_156: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
             ╔═════════════════════════════════════════════╗
             ║   156 view starter index page with link     ║
             ╚═════════════════════════════════════════════╝`,
          },
        },

        //
        // 158 theme update /app/dashboard index to add router
        //
        __eofiles_theme0_dashboard_router_158: [{
          resolve: `${themePaths[0]}src/pages/app/dashboard.js`,
          options: {
            __eodoc: `${themes[0]}: 158 update ${themes[0]} /app/dashboard page with routing`,
            content: `
import React from 'react'
import { Router } from '@reach/router'
import { Link } from 'gatsby'
import One from '../../components/one'

const Home = () => <p>Home</p>

const Dashboard = () =>
  <div>
    <h1>the dashboard page in ${themes[0]}</h1>
    <h3><p>includes the link to the dashboard component one</p></h3>
    <h3><p>and routes to the dashboard entry and the dashboard component</p></h3>
    <Router>
      <Home path="/app/dashboard/" />
      <One path="/app/dashboard/one" />
    </Router>
    <nav>
      <Link to="/app/dashboard/one">Page One</Link>
    </nav>
    <nav>
      <Link to="/">Home</Link>
    </nav>

  </div>

export default Dashboard
`,
          },
        } ],
        //
        // 160 create theme0 component one
        //
        __eofiles_theme0_content_160: [{
          resolve: `${themePaths[0]}src/components/one.js`,
          options: {
            __eodoc: `160 create ${themes[0]} one component`,
            content: `
import React from 'react'

const One = () => (
  <>
    <p>component one page in ${themes[0]}</p>  
  </>
)

export default One
`,
          },
        } ],
        //
        // 164 dashboard imports component one
        //
        __eodoc_164: `164 dashboard imports component one`,
        //
        // 166 Router takes Home to app/dashboard path and component One with path to one sub-folder
        //
        __eodoc_166: `166 Router takes Home to app/dashboard path and component One with path to one sub-folder`,
        //
        // 168 view dashboard in theme0
        //
        __eoview_site_index_with_link_168: {
          resolve: `http://localhost:8000/app/dashboard`,
          options: {
            __eodelay: delay,
            __eodoc: `
          ╔═════════════════════════════════════════════╗
          ║   168 view dashboard in ${themes[0]}        ║
          ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 170 view dashboard page one
        //
        __eoview_site_index_with_link_170: {
          resolve: `http://localhost:8000/app/dashboard/one`,
          options: {
            __eodelay: delay,
            __eodoc: `
          ╔═════════════════════════════════════════════╗
          ║  170 view ${themes[0]} dashboard page one   ║
          ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 200 intall ${themes[1]} with static routing
        //
        __eodoc__200: `
        ┌──────────────────────────────────────────────────────┐
        |      200  intall ${themes[1]} with STATIC routing    |
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
        // 216 theme1 create account/index
        //
        __eofiles_theme1_account_216: [{
          resolve: `${themePaths[1]}src/pages/app/account/index.js`,
          options: {
            __eodoc: `216 ${themes[1]} create account/index`,
            content: `
import React from 'react'
import { Link } from 'gatsby'

const Account = () =>
  <div>
    <h1>${themes[1]} Account home</h1>
    <h3><p>includes link to profile in account app</p></h3>
    <nav>
      <Link to="/app/account/profile">Profile</Link>
    </nav>
    <Link to="/">Home</Link>
  </div>
export default Account
`,
          },
        } ],
        //
        // 218 theme1 create account/profile
        //
        __eofiles_theme1_account_profile_218: [{
          resolve: `${themePaths[1]}src/pages/app/account/profile.js`,
          options: {
            __eodoc: `218 ${themes[1]} create account/profile`,
            content: `
import React from 'react'
import { Link } from 'gatsby'

const Profile = () =>
  <div>
    <h1>profile page in ${themes[1]}/app/account</h1>
    <h3><p>includes link to account home</p></h3>
    <nav>
      <Link to="/app/account/">Account Home</Link>
    </nav>
    <Link to="/">Home</Link>
  </div>
export default Profile
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
  <h3><p>the starter exposes links to the /app/dashboard in ${themes[0]}</p></h3>
  <h3><p>and to the /app/account in ${themes[1]}</p></h3>

  <p><Link to ="/app/dashboard">Dashboard</Link></p>
  <p><Link to ="/app/account">Account</Link></p>
  <p><Link to="/">Home</Link></p>

  </>
)

export default Index
`,
          },
        } ],
        //
        // 222 restart server
        //
        __eorestart__222: {
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |    222 restart server                   |
            └─────────────────────────────────────────┘`,
          },
        },
        //
        // 224 view index
        //
        __eoview__224____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodoc: `
            ╔═════════════════════════════════════════════════╗
            ║  224 view index with links to two microfrontends║
            ╚═════════════════════════════════════════════════╝` },
        },
        //
        // 226 view account
        //
        __eoview__226____________________: {
          resolve: `http://localhost:8000/app/account`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════════╗
            ║  226 visit account home page                    ║
            ╚═════════════════════════════════════════════════╝` },
        },
        //
        // 228 view account profile
        //
        __eoview__228____________________: {
          resolve: `http://localhost:8000/app/account/profile`,
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

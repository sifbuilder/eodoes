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
      will steppify the gatsby tutorial at https://www.gatsbyjs.org/tutorial/
  
      usage:
        > cls&&node ./scripts/run eodoes-eodo-eorial ../eosites eoclear uncode eoparse --doc --view
  `,

      eotags: {
        '--silent': false, // yarn silent
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
    let parts = []
    parts[0] = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : ''
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars
      let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
      wstree(data, __)
      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      let workspaces = useWorkspaces
        ? [ `${packagesPath}*` ]
        : []

      /**
       *  parcel
       */
      let parcel = {
        __eodoc_001: `
        ╭─────────────────────────────────────────────╮
        │       eonized gatsby tutorial               │
        │    https://youtu.be/0Ta-awtLZTs?t=1036      │
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
              workspaces: workspaces,
            },
          },
        } ],

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
                'gatsby': '*',
                'react': '*',
                'react-dom': '*',
              },
            },
          },
        } ],

        __eofiles_index_008: [{ // 008 init index
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `008a create empty ${starterPath}src/pages/index.js`,
            content: `
import React from "react"

export default () => (
<div>
  <h1>Hello World</h1>
</div>
)
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

        __eofiles__content_gatsby_009: [ { // 009 gatsby files
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `009a create gatsby config`,
            content: `module.exports = {}`,
          },
        },
        {
          resolve: `${starterPath}gatsby-node.js`,
          options: {
            __eodoc: `009b create gatsby node`,
            content: ``,
          },
        }],
        __eoexec__yarn__014: { // 014 yarn
          resolve: `yarn ${silent}`,
          options: {
            __eodoc: `014 yarn with init dependencies`,
            cwd: ``,
          },
        },

        __eorestart__016: { // 016 restart server
          options: {
            __eodoc: `016 restart server`,
          },
        },

        __eoview__018____________________: { // 018 view index
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
          ╔═════════════════════════════════════════════╗
          ║       018 view hi page                      ║
          ╚═════════════════════════════════════════════╝` },
        },
      }

      return parcel
    }

    // ............................. 1

    parts[1] = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : ''
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars
      let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
      wstree(data, __)
      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      let parcel = {
        __eodoc__020: `
        ┌┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
        ┊             1.- Gatsby building blocks         ┊        
        └┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘`,

        __eofiles_starter_100: [{ // 100 starter manifest
          resolve: `${starterPath}/package.json`,
          options: {
            __eodoc: `100 file starter manifest`,
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

        __eoexec__yarn__102: { // 102 yarn
          resolve: `yarn ${silent}`,
          options: {
            __eodoc: `102 yarn with init dependencies`,
            cwd: ``,
          },
        },

        __eorestart__104: { // 104 restart server
          options: {
            __eodoc: `104 restart server`,
          },
        },

        __eofiles_content_106: [{ // 106 update index
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `106 create start page as react component`,
            content: `
import React from "react"

export default () => (
  <div>
    <h1>Hello Gatsby!</h1>
  </div>
)
`,
          },
        }],

        __eoview__108: { // 108 view index with gatsby
          resolve: `http://localhost:8000/`,
          options: {
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║      108 wiew index with gatsby             ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_content_110: [{ // 110 update index with color
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `110 add color`,
            content: `
import React from "react"
export default () => (
  <div style={{ color: 'purple', fontSize: '72px' }}>Hello Gatsby!</div>
)
`,
          },
        } ],

        __eoview__111____________________: { // 111 view index with color
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       111 view index with color             ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_content_112: [{ // 112 add html to index
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `112 add a paragraph`,
            content: `
import React from "react"
export default () => (
  <div style={{ color: 'purple' }}>
    <h1>Hello Gatsby!</h1>
    <p>What a world.</p>
  </div>
)
`,
          },
        } ],

        __eoview__113____________________: { // 113 view index with html
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `113 view with html`,
          },
        },

        __eofiles_content_114: [{ // 114 add image to index
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `114 add image to index`,
            content: `
import React from "react"
export default () => (
  <div style={{ color: 'purple' }}>
    <h1>Hello Gatsby!</h1>
    <p>What a world.</p>
    <img src="https://source.unsplash.com/random/400x200" alt="" />
  </div>
)
`,
          },
        } ],

        __eoview__114____________________: { // 114 view index with image
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       114 view index with image             ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_content_116: [{ // 116 component with pure javasctip
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `116 decompose react component`,
            content: `
import React from "react"
export default () => React.createElement("div", null, "decomposing react component")
`,
          },
        } ],

        __eoview__118____________________: { // 118 view pure javascript
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       118 view pure javascript              ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_content_120: [{ // 120 building with componets
          resolve: `${starterPath}src/pages/about.js`,
          options: {
            __eodoc: `120 create about page with components (CSS, HTML and ES)`,
            content: `
import React from "react"

export default () => (
  <div style={{ color: 'teal' }}>
    <h1>About Gatsby</h1>
    <p>Such wow. Very React.</p>
  </div>
)
`,
          },
        } ],

        __eoview__122____________________: {
          resolve: `http://localhost:8000/about`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║    122 view about page with page component  ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_content_130: [{ // 130 using sub-components
          resolve: `${starterPath}src/components/header.js`,
          options: {
            __eodoc: `130 create header sub-components`,
            content: `
import React from "react"

export default () => <h1>This is a header.</h1>
`,
          },
        }],

        __eofiles_content_132: [ {
          resolve: `${starterPath}src/pages/about.js`,
          options: {
            __eodoc: `132 import the header sub-component into about page`,
            content: `
import React from "react"
import Header from "../components/header"
export default () => (
  <div style={{ color: 'teal' }}>
    <Header />
    <p>Such wow. Very React.</p>
  </div>
)
`,
          },
        }],

        __eoview__133____________________: { // 133 view about page with header sub-componen
          resolve: `http://localhost:8000/about`,
          options: {
            __eodelay: delay,
            __eodoc: `
             ╔════════════════════════════════════════════════╗
             ║ 133 view about page with header sub-component  ║
             ╚════════════════════════════════════════════════╝`,
          },
        },

        __eofiles_content_134: [{ // 134 header sub-components tp export props function
          resolve: `${starterPath}src/components/header.js`,
          options: {
            __eodoc: `134 make the header sub-component export with props`,
            content: `
import React from "react"

export default props => <h1>{props.headerText}</h1>
`,
          },
        }],

        __eofiles_content_135: [{ // 135 pass data as props to the Header subcomponent
          resolve: `${starterPath}src/pages/about.js`,
          options: {
            __eodoc: `135 import Header with props to the about page`,
            content: `
import React from "react"
import Header from "../components/header"
export default () => (
  <div style={{ color: 'teal' }}>
    <Header headerText="About Gatsby" />
    <p>Such wow. Very React.</p>
  </div>
)
`,
          },
        } ],

        __eoview__135____________________: { // 135 view about page with imported header sub-component
          resolve: `http://localhost:8000/about`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔══════════════════════════════════════════════════════╗
            ║135 view about page with imported header sub-component║
            ╚══════════════════════════════════════════════════════╝`,
          },
        },

        __eofiles_content_136: [{ // 136 add a second Header subcomponent
          resolve: `${starterPath}src/pages/about.js`,
          options: {
            __eodoc: `136 add a second Header subcomponent`,
            content: `
import React from "react"
import Header from "../components/header"
export default () => (
  <div style={{ color: 'teal' }}>
    <Header headerText="About Gatsby" arbitraryPhrase="is arbitrary" />
    <Header headerText="It's pretty cool" />
    <p>Such wow. Very React.</p>
  </div>
)
`,
          },
        } ],

        __eoview__136____________________: { // 136 about with two header sub-components
          resolve: `http://localhost:8000/about`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║   136 about with two header sub-components  ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_content_140: [{ // 140 contact page with link to index
          resolve: `${starterPath}src/pages/contact.js`,
          options: {
            __eodoc: `140 create contact page with link to index`,
            content: `
import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default () => (
  <div style={{ color: 'teal' }}>
    <Link to="/">Home</Link>
    <Header headerText="Contact" />
    <p>Send us a message!</p>
  </div>
)
`,
          },
        } ],

        __eoview__141____________________: { // 141 contact with Link
          resolve: `http://localhost:8000/contact`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       141 contact with Link                 ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_content_142: [{ // 142 using layout components
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `add a <Link /> component to the index page`,
            content: `
import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default () => (
  <div style={{ color: 'purple' }}>
    <Link to="/contact/">Contact</Link>
    <Header headerText="Hello Gatsby!" />
    <p>What a world.</p>
    <img src="https://source.unsplash.com/random/400x200" alt="" />
  </div>
)
`,
          },
        } ],

        __eoview__143____________________: { // 143 index with Link
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       143 index with Link                   ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
      }

      return parcel
    }
    parts[2] = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars
      let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
      wstree(data, __)
      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      /**
       *  parcel
       */
      let parcel = {
        __eodoc__2: `
          ┌───────────────────────────────────────────┐
          │   2.- Introduction to Styling in Gatsby   │
          └───────────────────────────────────────────┘
`,

        __eofiles_content_200: [{ // 200 reset index to hello
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `200 reset index to hello`,
            content: `
import React from "react"
export default () => (
  <div>
    <h1>Hello world!</h1>
  </div>
)
`,
          },
        } ],

        __eofiles_styles_212: [{
          resolve: `${starterPath}src/styles/global.css`,
          options: {
            __eodoc: `define styles in the global.css file`,
            content: `
html {
  background-color: lavenderblush;
}
`,
          },
        } ],

        __eofiles__gatsby_browser_221: [ {
          resolve: `${starterPath}gatsby-browser.js`,
          options: {
            __eodoc: `221 create gatsby browser`,
            content: ``,
          },
        }],

        __eofiles_browser_222: [{
          resolve: `${starterPath}gatsby-browser.js`,
          options: {
            __eodoc: `222 import styles in the global.css file into gatsby-browser`,
            content: `
import "./src/styles/global.css"
`,
          },
        } ],

        __eorestart__222: { // retart the development server
          options: {
            __eodoc: `222 retart the development server`,
          },
        },

        __eoview__222____________________: { // 222 index with bck color
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═══════════════════════════════════════════════╗
            ║ 222 view index with bck color from global css ║
            ╚═══════════════════════════════════════════════╝`,
          },
        },

        __eofiles_231: [{ // 231 Using component-scoped CSS
          resolve: `${starterPath}src/components/container.js`,
          options: {
            __eodoc: `231 create component-scoped CSS`,
            content: `
import React from "react"
import containerStyles from "./container.module.css"

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)
`,
          },
        } ],

        __eofiles_232: [{ // 232 create a container.module.css file
          resolve: `${starterPath}src/components/container.module.css`,
          options: {
            __eodoc: `232 create the container.module.css module`,
            content: `
.container {
  margin: 3rem auto;
  max-width: 600px;
}
`,
          },
        } ],

        __eofiles_233: [{ // 233 create a new page component
          resolve: `${starterPath}src/pages/about-css-modules.js`,
          options: {
            __eodoc: `233 create a new page component: about-css-modules`,
            content: `
import React from "react"

import Container from "../components/container"

export default () => (
  <Container>
    <h1>About CSS Modules</h1>
    <p>CSS Modules are cool</p>
  </Container>
)
`,
          },
        } ],

        __eoview_css_233: { // 233 visit http://localhost:8000/about-css-modules/
          resolve: `http://localhost:8000/about-css-modules/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔══════════════════════════════════════════════════════╗
            ║   233 view http://localhost:8000/about-css-modules/  ║
            ╚══════════════════════════════════════════════════════╝`,
          },
        },

        __eofiles_242: [{ // 244 Style a component using CSS Modules
          resolve: `${starterPath}src/pages/about-css-modules.module.css`,
          options: {
            __eodoc: `244 style a component using CSS Modules`,
            content: `
.user {
  display: flex;
  align-items: center;
  margin: 0 auto 12px auto;
}

.user:last-child {
  margin-bottom: 0;
}

.avatar {
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
  margin: 0;
}

.description {
  flex: 1;
  margin-left: 18px;
  padding: 12px;
}

.username {
  margin: 0 0 12px 0;
  padding: 0;
}

.excerpt {
  margin: 0;
}
  `,
          },
        } ],

        __eofiles_244: [{// 244 import the css module into the about css
          resolve: `${starterPath}src/pages/about-css-modules.js`,
          options: {
            __eodoc: `244 import the css module into the about css modules page`,
            content: `
import React from "react"
import styles from "./about-css-modules.module.css"
import Container from "../components/container"

const User = props => (
  <div className={styles.user}>
    <img src={props.avatar} className={styles.avatar} alt="" />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.username}</h2>
      <p className={styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)

export default () => (
  <Container>
    <h1>About CSS Modules</h1>
    <p>CSS Modules are cool</p>
    <User
      username="Jane Doe"
      avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
      excerpt="I'm Jane Doe. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    />
    <User
      username="Bob Smith"
      avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
      excerpt="I'm Bob Smith, a vertically aligned type of guy. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    />
  </Container>
)
  `,
          },
        } ],

        __eoview_244: {
          resolve: `http://localhost:8000/about-css-modules`,
          options: {
            __eodelay: delay,
            __eodoc: `
             ╔═════════════════════════════════════════════╗
             ║       244 view about css modules page       ║
             ╚═════════════════════════════════════════════╝`,
          },
        },

      }

      return parcel
    }
    parts[3] = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : ''
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars
      let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
      wstree(data, __)
      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      /**
       *  parcel
       */
      let parcel = {

        __eodoc__3: `
          ┌────────────────────────────────────────────┐
          │   3.- Creating nested layout components    │
          └────────────────────────────────────────────┘
`,

        __eofiles_starter_301: [{ // 301 starter manifest with typography dependencies
          resolve: `${starterPath}/package.json`,
          options: {
            __eodoc: `301 file starter manifest typography dependencies`,
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
                'gatsby-plugin-typography': '*',
                'react-typography': '*',
                'typography': '*',
                'typography-theme-fairy-gates': '*',
              },
            },
          },
        } ],

        __eoexec__yarn__301: { // 301 yarn
          resolve: `yarn ${silent}`,
          options: {
            __eodoc: `301 yarn with init dependencies`,
            cwd: ``,
          },
        },

        __eofiles_312: [{ // 312 configure gatsby-plugin-typography in gatsby config
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `312 configure gatsby-plugin-typography in gatsby config`,
            content: `
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
`,
          },
        } ],

        __eofiles_313: [{ // 313 create typography utils
          resolve: `${starterPath}src/utils/typography.js`,
          options: {
            __eodoc: `313 create typography utils`,
            content: `
import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"
const typography = new Typography(fairyGateTheme)

export const { scale, rhythm, options } = typography
export default typography
`,
          },
        } ],

        __eorestart__314: { // start 314
          options: {
            __eodoc: `314 restart develop server`,
          },
        },

        __eofiles_321: [{ // 321 Make some content and style changes
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `321 show effect of CSS generated by Typography.js`,
            content: `
import React from "react"

export default () => (
  <div>
    <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
    <p>
      What do I like to do? Lots of course but definitely enjoy building
      websites.
    </p>
  </div>
)
`,
          },
        } ],

        __eoview__321: { // 321 view index with typography
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       321 view index                        ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles__331: [{ // 331 cent  er column in page
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `331 center column in index page`,
            content: `
import React from "react"

export default () => (
  <div style={{ margin: '3rem auto', maxWidth: 600 }}>
    <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
    <p>
      What do I like to do? Lots of course but definitely enjoy building
      websites.
    </p>
  </div>
)
`,
          },
        } ],

        __eoview_init__331: { // 331 view index with centered column
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       331 view index with centered column   ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_341: [{ // 341 Creating layout components
          resolve: `${starterPath}src/pages/about.js`,
          options: {
            __eodoc: `341 reset the about page to create layout components`,
            content: `
import React from "react"

export default () => (
  <div>
    <h1>About me</h1>
    <p>I’m good enough, I’m smart enough, and gosh darn it, people like me!</p>
  </div>
)
`,
          },
        } ],

        __eofiles__342: [{ // 342 create contact page
          resolve: `${starterPath}src/pages/contact.js`,
          options: {
            __eodoc: `342 update contact page`,
            content: `
import React from "react"

export default () => (
  <div>
    <h1>I'd love to talk! Email me at the address below</h1>
    <p>
      <a href="mailto:me@example.com">me@example.com</a>
    </p>
  </div>
)
`,
          },
        } ],

        __eoview_init__343: { // 343 view about page
          resolve: `http://localhost:8000/about`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       343 view about page                   ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_352: [{ // 352 create layout component
          resolve: `${starterPath}src/components/layout.js`,
          options: {
            __eodoc: `352 create layout component`,
            content: `
import React from "react"

export default ({ children }) => (
  <div style={{ margin: '3rem auto', maxWidth: 650, padding: '0 1rem' }}>
    {children}
  </div>
)
`,
          },
        } ],

        __eofiles_353: [{ // 353 import layout component into index
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `353 import layout component into index`,
            content: `
import React from "react"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
    <p>
      What do I like to do? Lots of course but definitely enjoy building
      websites.
    </p>
  </Layout>
)
`,
          },
        } ],

        __eoview_init_353: { // 353 view index with layout component
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       353 view index with layout component  ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_361: [{ // 361 add h3 title to layout component
          resolve: `${starterPath}src/components/layout.js`,
          options: {
            __eodoc: `361 add h3 title to layout component`,
            content: `
import React from "react"

export default ({ children }) => (
  <div style={{ margin: '3rem auto', maxWidth: 650, padding: '0 1rem' }}>
    <h3>MySweetSite</h3>
    {children}
  </div>
)
`,
          },
        } ],

        __eoview_init_361: { // 361 view about page with title
          resolve: `http://localhost:8000/about/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       361 view about page with title        ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_371: [{ // 371 add navigation links between pages to layout
          resolve: `${starterPath}src/components/layout.js`,
          options: {
            __eodoc: `371 add navigation links between pages to layout`,
            content: `
import React from "react"
import { Link } from "gatsby"
const ListLink = props => (
  <li style={{ display: 'inline-block', marginRight: '1rem' }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children }) => (
  <div style={{ margin: '3rem auto', maxWidth: 650, padding: '0 1rem' }}>
    <header style={{ marginBottom: '1.5rem' }}>
      <Link to="/" style={{ textShadow: 'none', backgroundImage: 'none' }}>
        <h3 style={{ display: 'inline' }}>MySweetSite</h3>
      </Link>
      <ul style={{ listStyle: 'none', float: 'right' }}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/contact/">Contact</ListLink>
      </ul>
    </header>
    {children}
  </div>
)
`,
          },
        } ],

        __eoview_init_371: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       371 view index with links             ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

      }

      return parcel
    }

    //  ............................. 4

    parts[4] = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : ''
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars
      let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
      wstree(data, __)
      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      let parcel = {

        __eodoc__4: `
          ┌─────────────────────────────────┐
          │   4.- Data in Gatsby            │
          └─────────────────────────────────┘
`,

        __eofiles__manifest_with_dependencies_401: [{ // 401 add typography dependencies
          resolve: `${starterPath}package.json`,
          options: {
            __eodoc: `401 add typography theme and emotion plugin`,
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
                'gatsby-plugin-typography': '*',
                'react-typography': '*',
                'typography': '*',
                'typography-theme-fairy-gates': '*',
                'typography-theme-kirkham': '*',
                'gatsby-plugin-emotion': '*',
                '@emotion/core': '*',
              },
            },
          },
        }],

        __eoexec__yarn__401: { // 401 yarn
          resolve: `yarn  ${silent}`,
          options: {
            __eodoc: `401 yarn with typography theme and emotion plugin`,
            cwd: ``,
          },
        },

        __eofiles_411: [{ // 411 define a layout component
          resolve: `${starterPath}src/components/layout.js`,
          options: {
            __eodoc: `411a define a layout component`,
            content: `
import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

export default ({ children }) => (
  <div
    css={css\`
      margin: 0 auto;
      max-width: 700px;
      padding: \${rhythm(2)};
      padding-top: \${rhythm(1.5)};
    \`}
  >
    <Link to={'/'}>
      <h3
        css={css\`
          margin-bottom: \${rhythm(2)};
          display: inline-block;
          font-style: normal;
        \`}
      >
        Pandas Eating Lots
      </h3>
    </Link>
    <Link
      to={'/about/'}
      css={css\`
        float: right;
      \`}
    >
      About
    </Link>
    {children}
  </div>
)
`,
          },
        },
        {
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `411b define index page with layout component`,
            content: `
import React from "react"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>Amazing Pandas Eating Things</h1>
    <div>
      <img
        src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
        alt="Group of pandas eating bamboo"
      />
    </div>
  </Layout>
)
`,
          },
        },
        {
          resolve: `${starterPath}src/pages/about.js`,
          options: {
            __eodoc: `411c define about page component with layout component`,
            content: `
import React from "react"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>About Pandas Eating Lots</h1>
    <p>
      We're the only site running on your computer dedicated to showing the best
      photos and videos of pandas eating lots of food.
    </p>
  </Layout>
)
`,
          },
        },
        {
          resolve: `${starterPath}src/utils/typography.js`,
          options: {__eodoc: `411d define typography in utils`,
            content: `
import Typography from "typography"
import kirkhamTheme from "typography-theme-kirkham"

const typography = new Typography(kirkhamTheme)

export default typography
export const rhythm = typography.rhythm
`,
          },
        },
        {
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `411e gatsby-config plugin typography`,
            content: `
module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
`,
          },
        } ],

        __eorestart__412: { // 412 restart
          options: { __eodoc: `412 restart develop server` },
        },

        __eoview_413: { // 413 view index
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║  413 view index with a layout and two pages ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_420: [{ // 420 add title to gatsby config
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `420 add title to gatsby config with siteMetadata`,
            content: `
module.exports = {
  siteMetadata: {
    title: \`Title from siteMetadata\`,
  },
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
`,
          },
        } ],

        __eorestart__421: { // 421 restart server to get siteMetadata
          options: {
            __eodoc: `421 restart server to get siteMetadata`,
            __eodelay: delay,
          },
        },

        __eofiles_422: [{ // 422 about page with page query
          resolve: `${starterPath}src/pages/about.js`,
          options: {
            __eodelay: delay,
            __eodoc: `422 about page with page query`,
            content: `
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>
      We're the only site running on your computer dedicated to showing the best
      photos and videos of pandas eating lots of food.
    </p>
  </Layout>
)

export const query = graphql\`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
\`
`,
          },
        } ],

        __eoview_422: { // 422 view about with page query
          resolve: `http://localhost:8000/about/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       422 viwe about with page query        ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_431: [{ // 431 using a StaticQuery in the layout component
          resolve: `${starterPath}src/components/layout.js`,
          options: {
            __eodoc: `adding StaticQuery to layout component`,
            content: `
import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
export default ({ children }) => {
  const data = useStaticQuery(
    graphql\`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    \`
  )
  return (
    <div
      css={css\`
        margin: 0 auto;
        max-width: 700px;
        padding: \${rhythm(2)};
        padding-top: \${rhythm(1.5)};
      \`}
    >
      <Link to={'/'}>
        <h3
          css={css\`
            margin-bottom: \${rhythm(2)};
            display: inline-block;
            font-style: normal;
          \`}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      <Link
        to={'/about/'}
        css={css\`
          float: right;
        \`}
      >
        About
      </Link>
      {children}
    </div>
  )
}
`,
          },
        } ],

        __eoview_431: { // 431 view about with static query
          resolve: `http://localhost:8000/about/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       431 view about with static query      ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

      }

      return parcel
    }

    // ...................... 5

    parts[5] = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : ''
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars
      let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
      wstree(data, __)
      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      let parcel = {

        __eodoc__5: `
          ┌─────────────────────────────────┐
          │   5.- Source plugins            │
          └─────────────────────────────────┘
`,

        __eofiles__manifest_with_dependencies_501: [{ // 501 add typography dependencies
          resolve: `${starterPath}package.json`,
          options: {
            __eodoc: `501 add typography theme and emotion plugin`,
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
                'gatsby-plugin-typography': '*',
                'react-typography': '*',
                'typography': '*',
                'typography-theme-fairy-gates': '*',
                'typography-theme-kirkham': '*',
                'gatsby-plugin-emotion': '*',
                '@emotion/core': '*',
                'gatsby-source-filesystem': '*',
              },
            },
          },
        }],

        __eoexec_add_filesystem_510: { // 510 yarn
          resolve: `yarn  ${silent}`,
          options: {
            __eodoc: `510 yarn to install gatsby-source-filesystem`,
            cwd: ``,
          },
        },

        __eofiles_512: [{ // 512 gatsby configure
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `512 configure gatsby-source-filesystem`,
            content: `
module.exports = {
  siteMetadata: {
    title: "Pandas Eating Lots",
    date: "1969-07-20",
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: \`\${__dirname}/src/\`,
      },
    },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
`,
          },
        }],

        __eorestart__514: { // 514 restart for update siteMetadata
          options: {
            __eodoc: `514 restart for update siteMetadata`,
          },
        },

        __eofiles_531: [{ // 531 build page with a GraphQL query
          resolve: `${starterPath}src/pages/my-files.js`,
          options: {
            __eodoc: `531 build a page my-files with a GraphQL query`,
            content: `
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>Hello world</div>
    </Layout>
  )
}

export const query = graphql\`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
\`              
`,
          },
        } ],

        __eoview_start_537: { // 537 view files
          resolve: `http://localhost:8000/my-files/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       537 view files                        ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_541: [{ // 541 print out the File data
          resolve: `${starterPath}src/pages/my-files.js`,
          options: {
            __eodoc: `541 print out the File data`,
            content: `
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>My Site's Files</h1>
        <table>
          <thead>
            <tr>
              <th>relativePath</th>
              <th>prettySize</th>
              <th>extension</th>
              <th>birthTime</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativePath}</td>
                <td>{node.prettySize}</td>
                <td>{node.extension}</td>
                <td>{node.birthTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export const query = graphql\`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
\`  
`,
          },
        } ],

        __eoview_myfiles_541: { // 541 view myfiles
          resolve: `http://localhost:8000/my-files/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       541 view myfiles                      ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

      }

      return parcel
    }
    parts[6] = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : ''
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars
      let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
      wstree(data, __)
      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      /**
       *  parcel
       */
      let parcel = {

        __eodoc__6: `
          ┌─────────────────────────────────┐
          │   6.- Transformer plugins       │
          └─────────────────────────────────┘
`,

        __eofiles_604: [{ // 604
          resolve: `${starterPath}src/pages/sweet-pandas-eating-sweets.md`,
          options: {
            // __eoignore: `ignore md`,
            __eodoc: `604 Add a markdown file sweet-pandas-eating-sweets.md`,
            content: `--- 
title: "Sweet Pandas Eating Sweets"
date: "2019-07-20"
--- 

Pandas are really sweet.
Here's a video of a panda eating sweets.
<iframe width="560" height="315" src="https://www.youtube.com/embed/4n0xNbfJLR8" frameborder="0" allowfullscreen></iframe>
`,
          },
        }],

        __eofiles__manifest_with_dependencies_606: [{ // 606 add transformer-remark dependency
          resolve: `${starterPath}package.json`,
          options: {
            __eodoc: `606 add typography theme and emotion plugin`,
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
                'gatsby-plugin-typography': '*',
                'react-typography': '*',
                'typography': '*',
                'typography-theme-fairy-gates': '*',
                'typography-theme-kirkham': '*',
                'gatsby-plugin-emotion': '*',
                '@emotion/core': '*',
                'gatsby-source-filesystem': '*',
                'gatsby-transformer-remark': '*',
              },
            },
          },
        }],

        __eofiles_config_631: [{ // 631 gatsby config
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `631 gatsby-config add transformer-remark`,
            content: `
module.exports = {
  siteMetadata: {
    title: 'Pandas Eating Lots',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: \`\${__dirname}/src/\`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}              
`,
          },
        } ],

        __eoexec_yarn_dependencies_621: { // 621 yarn dependency
          resolve: `yarn  ${silent}`,
          options: {
            __eodoc: `621 yarn to add transformer-remark`,
            cwd: ``,
          },
        },

        __eorestart__636: { // 636 restart for allMarkdownRemark
          options: {
            __eodoc: `636 restart for allMarkdownRemark`,
          },
        },

        __eofiles_index_641: [{ // 641 create a list of site’s markdown files in index
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `641 view index with sites markdown files`,
            content: `
import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1
          css={css\`
            display: inline-block;
            border-bottom: 1px solid;
          \`}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3
              css={css\`
                margin-bottom: \${rhythm(1 / 4)};
              \`}
            >
              {node.frontmatter.title}{" "}
              <span
                css={css\`
                  color: #bbb;
                \`}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql\`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
\`
`,
          },
        }],

        __eoview_one_post_641: { // 641 view index with one post
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       641 view index with one post          ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_md_651: [{ // 651 create another md post
          resolve: `${starterPath}src/pages/pandas-and-bananas.md`,
          options: {
            // __eoignore: `ignore md`,
            __eodoc: `651 create another md post`,
            content: `--- 
title: "Pandas and Bananas"
date: "1969-07-20"
--- 

Do Pandas eat bananas? Check out this short video that shows that yes! pandas do
seem to really enjoy bananas!
<iframe width="560" height="315" src="https://www.youtube.com/embed/4SZl1r2O_bY" frameborder="0" allowfullscreen></iframe>
`,
          },
        } ],

        __eoview_two_posts_651: { // 651 show index with two posts
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║      651 show index with two posts          ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

      }

      return parcel
    }
    parts[7] = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars
      let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
      wstree(data, __)
      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      /**
       *  parcel
       */
      let parcel = {

        __eodoc__7: `
          ┌──────────────────────────────────────────────────┐
          │   7.- Programmatically create pages from data    │
          └──────────────────────────────────────────────────┘
`,

        __eofiles_node_711: [{ // 711 Creating slugs for pages
          resolve: `${starterPath}gatsby-node.js`,
          options: {
            __eodoc: `631 update config gatsby for node slug`,
            content: `
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

`,
          },
        }],

        __eorestart__713: { // start 713
          options: {
            __eodoc: `713 start develop server` },
        },

        __eoview__715____________________: { // view 715
          resolve: `http://localhost:8000/___graphql`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       715 view graphql                      ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_node_721: [{ // 721 Creating slugs for pages
          resolve: `${starterPath}gatsby-node.js`,
          options: {
            __eodoc: `721 config gatsby for slug`,
            content: `
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  return graphql(\`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  \`
).then(result => {
    console.log(JSON.stringify(result, null, 4))
  })
}
`,
          },
        }],

        __eorestart__721: { // start 721
          options: {
            __eodoc: `721 start develop server`,
          },
        },

        __eoview__723____________________: { // view 723
          resolve: `http://localhost:8000/___graphql`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       723 view graphql                      ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_blog_posts_725: [{ // 725 creating pages
          resolve: `${starterPath}src/templates/blog-post.js`,
          options: {
            __eodoc: `725 create src/templates/blog-post.js`,
            content: `
Copysrc/templates/blog-post.js: copy code to clipboard
import React from "react"
import Layout from "../components/layout"
export default () => {
  return (
    <Layout>
      <div>Hello blog post</div>
    </Layout>
  )
}                
`,
          },
        } ],

        __eofiles_node_731: [{ // 731
          resolve: `${starterPath}gatsby-node.js`,
          options: {
            __eodoc: `731: programmatically create md pages - gatsby-node.js`,
            content: `
  const path = require('path')
  const { createFilePath } = require('gatsby-source-filesystem')
  exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === 'MarkdownRemark') {
      const slug = createFilePath({ node, getNode, basePath: 'pages' })
      createNodeField({
        node,
        name: 'slug',
        value: slug,
      })
    }
  }
  exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return graphql(\`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    \`).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/blog-post.js'),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
    })
  }
`,
          },
        }],

        __eofiles_blog_posts_741: [{
          resolve: `${starterPath}src/templates/blog-post.js`,
          options: {
            __eodoc: `741 create src/templates/blog-post.js`,
            content: `
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql\`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
\`
  `,
          },
        } ],

        __eorestart__741: { // start 741
          options: {
            __eodoc: `741 start develop server`,
          },
        },

        __eoview__741____________________: { // view 741
          resolve: `http://localhost:8000/sdf`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       741 view sdf                          ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eoview__751____________________: { // view 751
          resolve: `http://localhost:8000/about`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       751 view about                        ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        __eofiles_index_761: [{
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `761 Create a list of your site’s markdown files in src/pages/index.js
replace in query frontmatter___date by frontmatter___title            
remove in query date(formatString: "DD MMMM, YYYY")
            `,
            content: `
import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1
          css={css\`
            display: inline-block;
            border-bottom: 1px solid;
          \`}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css\`
                text-decoration: none;
                color: inherit;
              \`}
            >
              <h3
                css={css\`
                  margin-bottom: $\{rhythm(1 / 4)};
                \`}
              >
                {node.frontmatter.title}{" "}
                <span
                  css={css\`
                    color: #bbb;
                  \`}
                >
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}
export const query = graphql\`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
\`
`,
          },
        }],

        __eoview__763____________________: { // view 763
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       763 view the blog                     ║
            ╚═════════════════════════════════════════════╝` },
        },

      }

      return parcel
    }
    parts[8] = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars
      let {useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths} =
      wstree(data, __)
      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      /**
       *  parcel
       */
      let parcel = {

        __eodoc__8: `
          ┌──────────────────────────────────────┐
          │   8.- Preparing a site to go live    │
          └──────────────────────────────────────┘
`,

      }

      return parcel
    }

    state[`eoparse__parcel`] = function (data, __) {
      let parcel = Object.assign({},
        parts[0](data, __),
        parts[1](data, __),
        parts[2](data, __),
        parts[3](data, __),
        parts[4](data, __),
        parts[5](data, __),
        parts[6](data, __),
        parts[7](data, __),
        parts[8](data, __)
      )
      return parcel
    }

    // ....................... enty
    let enty = {}
    enty.getState = () => state
    return enty
  }

  exports.eonitem = eonitem
})

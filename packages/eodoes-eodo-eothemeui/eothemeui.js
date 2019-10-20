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
        will steppify https://www.youtube.com/watch?v=6Z4p-qjnKCQ
  
      usage:
        > node ./scripts/run eodoes-eodo-eothemeui ../eosites eoparse --doc --view
  `,

      eotags: {
        '--silent': true, // yarn silent
        '--useWorkspaces': false, // use workspaces
      },

      eventsopts: {
        delay: 4969,
      },
    }

    state.themes = [
      'gatsby-theme-blog',
    ]

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

      // eslint-disable-next-line no-unused-vars
      let workspaces = useWorkspaces
        ? [ `${packagesPath}*` ]
        : [ ]
      /**
       *  parcel
       */
      let parcel = {
        //
        // 000 what it measn to style a theme
        //
        __eodoc_000: `
╭─────────────────────────────────────────────────────╮
│ what it measn to style a theme                      │
│ Brent Jackson && Jason Lengstorf                    │
│ https://www.youtube.com/watch?v=6Z4p-qjnKCQ         │
│ https://github.com/jlengstorf/example-theme-ui      │
╰─────────────────────────────────────────────────────╯`,
        //
        // 010 create theme tutorial
        //
        __eodoc_010: `
theme ui library - exposes theme a configuration object
allow to define and export style tokens
`,

        //
        // 006 yarn starter
        //
        __eoexec_starter_yarn_006: {
          resolve: `gatsby new . gatsbyjs/gatsby-starter-blog-theme`,
          options: {
            cwd: ``,
          },
        },
        //
        // 080 view index
        //
        __eoview__080____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eorestart: `eorestart 080`,
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       080 view entry page                   ║
            ╚═════════════════════════════════════════════╝` },
        },

        //
        // 90 themes
        //
        __eodoc__090: `
src/gatsby-theme-blog
        will shadow modules and components in
          modules/gatsby-theme-blog
          
src/gatsby-theme-blog/gatsby-plugin-theme-ui
        will shadow the defaults in 
            moudules/gatsby-theme-blog/src/gatsby-pluging-theme-ui
`,

        //
        // 152 gatsby-config.js
        //
        __eofiles__config_152: [ {
          resolve: `${themePaths[0]}gatsby-config.js`,
          options: {
            __eodoc: `152 config`,
            content: `
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-blog',
      options: {},
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: \`Json and Jackson's work\`,
    author: 'Json and Jackson',
    description: 'My site description...',
    social: [
      {
        name: 'twitter',
        url: 'https://twitter.com/gatsbyjs',
      },
      {
        name: 'github',
        url: 'https://github.com/gatsbyjs',
      },
    ],
  },
} 
`,
          },
        }],
        //
        // 160 src/gatsby-theme-blog/gatsby-plugin-theme-ui/colors.js
        //
        __eofiles__colors_160: [ {
          resolve: `${themePaths[0]}src/gatsby-theme-blog/gatsby-plugin-theme-ui/colors.js`,
          options: {
            __eodoc: `160 color`,
            content: `
import merge from "deepmerge"
import defaultThemeColors from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/colors"

/*
  * Want to change your theme colors?
  * Try uncommenting the color overrides below
  * to go from default purple to a blue theme
  */

// const darkBlue = \`#007acc\`
// const lightBlue = \`#66E0FF\`
// const blueGray = \`#282c35\`

export default merge(defaultThemeColors, {
  // text: blueGray,
  primary: 'tomato',
  // heading: blueGray,
  // modes: {
  //   dark: {
  //     background: blueGray,
  //     primary: lightBlue,
  //     highlight: lightBlue,
  //   },
  // },
})  
`,
          },
        }],
        //
        // 164 view index
        //
        __eoview__164____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eorestart: `eorestart 164`,
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       164 view entry page                   ║
            ╚═════════════════════════════════════════════╝` },
        },

        //
        // 170 src/gatsby-theme-blog/components/home-footer.js
        //
        __eofiles__component_170: [ {
          resolve: `${themePaths[0]}src/gatsby-theme-blog/components/home-footer.js`,
          options: {
            __eodoc: `170 component`,
            content: `
import Footer from 'gatsby-theme-blog/src/components/home-footer'

export default props -> (
  <div>
    <p>.....</p> 
    <Footer {...props} />
  </div>
)
`,
          },
        }],
        //
        // 172 gatsby-config.js
        //
        __eofiles__config_172: [ {
          resolve: `${themePaths[0]}gatsby-config.js`,
          options: {
            __eodoc: `172 config`,
            content: `
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-blog',
      options: {},
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: \`Json and Jackson's work\`,
    author: 'Json and Jackson',
    description: 'My site description...',
    social: [
      {
        name: 'website',
        url: 'https://lengstorf.com',
      },      
      {
        name: 'twitter',
        url: 'https://twitter.com/gatsbyjs',
      },
      {
        name: 'github',
        url: 'https://github.com/gatsbyjs',
      },
    ],
  },
} 
`,
          },
        }],
        //
        // 190 view index
        //
        __eoview__190____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eorestart: `eorestart 190`,
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════════════╗
            ║ 190 view entry page with home-footer component      ║
            ╚═════════════════════════════════════════════════════╝` },
        },

        //
        // 200 src/gatsby-theme-blog/components/home-footer.js
        //  will use emotion (css and js library) custom elements
        //  theme-ui wraps what is built upon emotion
        //
        __eofiles__component_200: [ {
          resolve: `${themePaths[0]}src/gatsby-theme-blog/components/home-footer.js`,
          options: {
            __eodoc: `200 component`,
            content: `
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Footer from 'gatsby-theme-blog/src/components/home-footer'

export default props => (
  <div sx={{ backgroundColor: 'text', color: 'background'}}>
    <Footer {...props} />
  </div>
)
`,
          },
        }],
        //
        // 120 view with sx
        //
        __eoview__120____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eorestart: `eorestart 120`,
            __eodelay: delay,
            __eodoc: `
            ╔════════════════════════════════════════════════╗
            ║   120 view entry page using themeui jsx pragma ║
            ╚════════════════════════════════════════════════╝` },
        },
        //
        // 999 END
        //
        __eodoc__999: `
        ┌───────────────────────────────────┐
        |                                   |
        |                                   |
        |           999  THE END            |
        |                                   |
        |                                   |
        └───────────────────────────────────┘`,

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

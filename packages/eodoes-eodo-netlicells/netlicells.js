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
  async function eonitem (__eo) {
    const {report} = require('eodoes-muons')
    const {wstree} = require('eodoes-muons')

    let state = {

      helpmsg: ` 
      would: create netlicells
      
      usage:
        > node ./scripts/run eodoes-eodo-netlicells ../eosites eoparse --doc --view
`,

      tags: {
        '--silent': true, // yarn silent
        '--useWorkspaces': true, // use workspaces
      },

      eventsopts: {
        delay: 2969,
      },

      browseopts: {
        headless: false, // puppeteer.launch
        devtools: false, // puppeteer.launch
        debuggingPort: 9222, // puppeteer.launch
        window: { // puppeteer.launch
          width: 800,
          height: 1280,
        },
        fullPage: false,
        delay: 50000, // waitInPromise
        timeout: 50000, // page.goto
        pageSelector: '#viewframe', // page.waitForSelector
        tracing: false,
        tracingpath: 'trace.json',
        screenshots: true,
        closebrowser: 0,
        viewPort: { // page.setViewport
          width: 800 + 8 + 8, // add body margin
          height: 1280 + 8 + 8, // add body margin
        },
        browseargs: [
          `--disable-infobars`,
          `--remote-debugging-port=9222`, // from debuggingPort
          `--window-size=800,1280`, // Window size from viewPort
        ],
      },
    }

    state.themes = [
      'gatsby-theme-netlify-cms',
    ]

    /**********************
      * eoparse__parcel
      */
    state.eoparse__parcel = function (data, __) {
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
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
      ╭─────────────────────────────────────────────────────────╮
      │  000  gatsby starter with theme netlify-cms             │
      │                                                         │
      │ github.com/netlify-templates/gatsby-starter-netlify-cms │
      │ www.youtube.com/watch?v=PS2784YfPpw                     │
      │ www.npmjs.com/package/netlify-cms                       │
      │ github.com/netlify/netlify-cms                          │
      │ www.npmjs.com/package/gatsby-plugin-netlify-cms         │
      ╰─────────────────────────────────────────────────────────╯`,
        //
        // 110 install ${starter}
        //
        __eodoc__110: `
        ┌────────────────────────────────────────────────┐
        │                                                │
        │       110 install ${starter}                 │
        │                                                │
        └────────────────────────────────────────────────┘`,
        __eofiles_parcels_030: [{ // 030 root manifest
          resolve: `package.json`,
          options: {
            __eodoc: `030 file root manifest`,
            content: {
              name: `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: true,
              'devDependencies': {},
              workspaces: workspaces,
            },
          },
        } ],

        //
        // 120 starter manifest
        //
        __eofiles_starter: [{
          resolve: `${starterPath}/package.json`,
          options: {
            __eodoc: `120 file starter manifest`,
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
        } ],
        //
        // 150 create starter:src/pages/404
        //
        __eofiles_notfound_150: [{
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
        // 170 view index
        //
        __eoview__170____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eoyarn: `170 eoyarn`,
            __eorestart: `170 restart`,
            __eodoc: `
          ╔═════════════════════════════════════════════╗
          ║       170 YDV view entry page               ║
          ╚═════════════════════════════════════════════╝` },
        },
        //
        // 200 install ${themes[0]}
        //
        __eodoc__200: `
        ┌────────────────────────────────────────────────┐
        │                                                │
        │       200 install ${themes[0]}                 │
        │                                                │
        └────────────────────────────────────────────────┘`,

        //
        // 240 configure ${starter} to work with ${themes[0]}
        //
        __eodoc__240: `
        ┌────────────────────────────────────────────────┐
        │                                                │
        │  240 configure ${starter}        │
        │        to work with ${themes[0]}      │
        │                                                │
        └────────────────────────────────────────────────┘`,

        //
        // 260 starter manifest with theme
        //
        __eofiles_theme: [{
          resolve: `${themePaths[0]}package.json`,
          options: {
            __eodoc: `
            ┌───────────────────────────────────┐
            |     260 ${themes[0]} manifest  |
            └───────────────────────────────────┘`,
            content: {
              'name': `${themes[0]}`,
              'version': `${version}`,
              'description': `${descr}`,
              'author': `${author}`,
              'license': `${license}`,
              private: false,
              'scripts': {},
              'devDependencies': {
                'gatsby': '^2.13.2',
                'react': '^16.8.6',
                'react-dom': '^16.8.6',

              },
              'peerDependencies': {
                'gatsby': '^2.13.2',
                'react': '^16.8.6',
                'react-dom': '^16.8.6',
              },
              'dependencies': {
                'gatsby-source-filesystem': '^2.0.26',
                'gatsby-transformer-remark': '^2.6.9',
                'gatsby-plugin-page-creator': '*',
              },
            },
          },
        } ],
        //
        // 250 starter manifest with theme
        //
        __eofiles_starter_with_theme: [{
          resolve: `${starterPath}/package.json`,
          options: {
            __eodoc: `
            ┌───────────────────────────────────┐
            |     250 create starter manifest   |
            |     with dep ${themes[0]}   |
            └───────────────────────────────────┘`,
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

                [`${themes[0]}`]: '*',
              },

            },
          },
        } ],
        //
        // 220 create theme0 empty index page
        //
        __eofiles_theme0_init_220: [ {
          resolve: `${themePaths[0]}index.js`,
          options: {
            __eodoc: `220 init ${themes[0]} with index`,
            content: ``,
          },
        } ],

        //
        // 300 export theme0 in starter
        //
        __eofiles__starter_config_300: [ {
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `300 config starter to use ${themes[0]}`,
            content: `
module.exports = {
  plugins: [
    "${themes[0]}",
  ],
}               
`,
          },
        }],

        //
        // 500 install ${themes[0]} cms
        //
        __eodoc__500: `
        ┌────────────────────────────────────────────────┐
        │                                                │
        │       500 install netlify-cms                  │
        │                                                │
        └────────────────────────────────────────────────┘`,
        //
        // 500 download netlify-cms zip
        //
        __eofetch_netlify_cms_500: [{
          resolve: `https://github.com/netlify-templates/gatsby-starter-netlify-cms/archive/master.zip`,
          options: {
            __eodoc: `500 download netlify-cms tar`,
            file: `tmp/gatsby-starter-netlify-cms.zip`,
          },
        }],
        //
        // 510 unzip netlify-cms
        //
        __eounzip_netlify_cms_510: [{
          resolve: `tmp/gatsby-starter-netlify-cms.zip`,
          options: {
            __eodoc: `510 unzip eodo tar`,
            folder: `tmp`,
          },
        }],

        //
        // 520 copy src and lambda to ${themes[0]} package
        //
        __eofiles_netlify_cms_520: [{
          resolve: `${themePaths[0]}/lambda`, // to /lambda
          options: {
            __eodoc: `520a lambda`,
            path: `tmp/gatsby-starter-netlify-cms-master/lambda`, // from
          },
        }, {
          resolve: `${themePaths[0]}/src`, // to /src
          options: {
            __eodoc: `520b src`,
            path: `tmp/gatsby-starter-netlify-cms-master/src`, // from
          },
        } ],
        //
        // 530 copy static to ${themePaths[0]} package
        //
        __eofiles_netlify_cms_530: [{
          resolve: `${themePaths[0]}static`, // to /static
          options: {
            __eodoc: `520c static`,
            path: `tmp/gatsby-starter-netlify-cms-master/static`, // from
          },
        }],

        //
        // 540 manifest, config, node to ${themes[0]} package
        //
        __eofiles_netlify_cms_540: [{
          resolve: `${themePaths[0]}gatsby-config.js`, // to  /gatsby-config.js
          options: {
            __eodoc: `540a copy gatsby-config`,
            path: `tmp/gatsby-starter-netlify-cms-master/gatsby-config.js`, // from
          },
        }, {
          resolve: `${themePaths[0]}gatsby-node.js`, // to /gatsby-node.js
          options: {
            __eodoc: `540a copy gatsby-node`,
            path: `tmp/gatsby-starter-netlify-cms-master/gatsby-node.js`, // from
          },
        } ],
        //
        // 512 merge theme name into gatsby-starter-netlify-cms package.json
        //
        __eofiles_netlify_manifest_512: [{
          resolve: `${themePaths[0]}package.json`, // to /package.json
          options: {
            __eodoc: `512 netlify_manifest`,
            path: `tmp/gatsby-starter-netlify-cms-master/package.json`, // from
          },
        }],
        //
        // 544 theme0 node
        //   localize (__dirname) src/templates (twice)
        //
        __eomerge_theme_544: {
          resolve: `${themePaths[0]}package.json`,
          options: {
            __eodelay: delay,
            __eodoc: `544 give package theme name ${themes[0]}`,
            content: {
              name: `${themes[0]}`,
            },
          },
        },

        //
        // 550 theme0 config
        //  comment gatsby-plugin-purgecss
        //  gatsby-plugin-page-creator for src/pages
        //  unlocal gatsby-source-filesystem to static/img (uploads)
        //
        __eofiles__theme0_config_550: [ {
          resolve: `${themePaths[0]}gatsby-config.js`,
          options: {
            __eodoc: `550 update ${themes[0]} config`,
            content: `
var proxy = require('http-proxy-middleware')

module.exports = function () {
  
  let res = {
    siteMetadata: {
      title: 'Gatsby + Netlify CMS Starter',
      description:
        'This repo contains an example business website that is built with Gatsby, and Netlify CMS.It follows the JAMstack architecture by using Git as a single source of truth, and Netlify for continuous deployment, and CDN distribution.',
    },
    plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sass',
      {
        // keep as first gatsby-source-filesystem plugin for gatsby image support
        resolve: 'gatsby-source-filesystem',
        options: {
          path: \`\${__dirname}/static/img\`,
          name: 'uploads',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: \`\${__dirname}/src/pages\`,
          name: 'pages',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: \`\${__dirname}/src/img\`,
          name: 'images',
        },
      },
      {
        "resolve": "gatsby-plugin-page-creator",
        "options": {
          "path": \`\${__dirname}/src/pages\`
        }
      },    
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: [
            {
              resolve: 'gatsby-remark-relative-images',
              options: {
                name: 'uploads',
              },
            },
            {
              resolve: 'gatsby-remark-images',
              options: {
                // It's important to specify the maxWidth (in pixels) of
                // the content container as this plugin uses this as the
                // base for generating different widths of each image.
                maxWidth: 2048,
              },
            },
            {
              resolve: 'gatsby-remark-copy-linked-files',
              options: {
                destinationDir: 'static',
              },
            },
          ],
        },
      },
      {
        resolve: 'gatsby-plugin-netlify-cms',
        options: {
          modulePath: \`\${__dirname}/src/cms/cms.js\`,
        },
      },
      // {
      //   resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      //   options: {
      //     develop: true, // Activates purging in npm run develop
      //     purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      //   },
      // }, // must be after other CSS plugins
      'gatsby-plugin-netlify', // make sure to keep it last in the array
    ],
    // for avoiding CORS while developing Netlify Functions locally
    // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
    developMiddleware: app => {
      app.use(
        '/.netlify/functions/',
        proxy({
          target: 'http://localhost:9000',
          pathRewrite: {
            '/.netlify/functions/': '',
          },
        })
      )
    },
  }
  return res
}
`,
          },
        } ],

        //
        // 560 theme0 node
        //   localize (__dirname) src/templates (twice)
        //
        __eofiles__theme0_node_560: [ {
          resolve: `${themePaths[0]}gatsby-node.js`, // to
          options: {
            __eodoc: `560 update theme node`,
            content: `
const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(\`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  \`).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    console.log('posts:', posts)

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          \`\${__dirname}/src/templates/\${String(edge.node.frontmatter.templateKey)}.js\`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into \`tags\`
    posts.forEach(edge => {
      if (_.get(edge, \`node.frontmatter.tags\`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = \`/tags/\${_.kebabCase(tag)}/\`

      createPage({
        path: tagPath,
        component: path.resolve(\`\${__dirname}/src/templates/tags.js\`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === \`MarkdownRemark\`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: \`slug\`,
      node,
      value,
    })
  }
}
`,
          },
        } ],

        //
        // 580 create shadow theme
        //
        __eofolders_netlify_cms_580: [{
          resolve: `${starterPath}src/${themes[0]}`, // to
          options: {
            __eodoc: `580 create shadow theme`,
          },
        } ],
        //
        // 600 view index
        //
        __eoview__600____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eoyarn: `600 eoyarn`,
            __eorestart: `600 restart`,
            __eodoc: `
          ╔═════════════════════════════════════════════╗
          ║       600 YDV view entry page               ║
          ╚═════════════════════════════════════════════╝` },
        },
        __eodoc_999: `
          ╭─────────────────────────────────────────────╮
          │       999 END                               │
          ╰─────────────────────────────────────────────╯`,
        __eobreak_end: `end break`,
      } // end parcel

      return parcel
    }

    // ....................... enty
    let enty = {}
    enty.getState = () => state
    return enty
  }

  exports.eonitem = eonitem
})

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
    const path = require('path')
    const fsExtra = require('fs-extra')
    const {report} = require('eodoes-muons')
    const {wstree} = require('eodoes-muons')
    const {filer} = require('eodoes-muons')
    const {viewer} = require('eodoes-muons')

    let state = {

      helpmsg: ` 
      would: create 
      https://www.netlify.com/blog/2016/10/27/a-step-by-step-guide-deploying-a-static-site-or-single-page-app/

      usage:
        > node ./scripts/run eodoes-eodo-netlitheme ../eosites eoparse --doc --view
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
    state.picts = (topics = ['eolist', 'eolem', 'eonet', 'eocell']) => [

      {
        name: `apple-touch-icon.png`,
        type: `png`,
        view: {x: 0, y: 0, width: 180, height: 180 },
      },
      {
        name: `home-main.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1920, height: 1280 },
      },
      {
        name: `${topics[2]}-01.png`,
        type: `png`,
        view: {x: 0.7, y: -0.3, width: 240, height: 190 },
      },
      {
        name: `${topics[2]}-02.png`,
        type: `png`,
        view: {x: 0.5, y: 0.7, width: 240, height: 190 },
      },
      {
        name: `${topics[2]}-03.png`,
        type: `png`,
        view: {x: -0.2, y: -0.6, width: 240, height: 190 },
      },
      {
        name: `${topics[2]}-04.png`,
        type: `png`,
        view: {x: 0, y: -0.1, width: 240, height: 190 },

      },
      {
        name: `${topics[2]}-main.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1920, height: 1280 },
      },
      {
        name: `${topics[2]}-full.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1796, height: 1272 },
      },
      {
        name: `${topics[2]}-big.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1920, height: 1464 },
      },
      {
        name: `${topics[2]}-11.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1920, height: 1280 },
      },
      {
        name: `${topics[2]}-12.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1920, height: 1280 },
      },
      {
        name: `${topics[0]}-1.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1024, height: 680 },
      },
      {
        name: `${topics[0]}-2.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1024, height: 680 },
      },
      {
        name: `${topics[0]}-3.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1920, height: 1280 },
      },
      {
        name: `${topics[0]}-top.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1920, height: 1280 },
      },
      {
        name: `og-image.jpg`,
        type: `jpeg`,
        view: {x: 0, y: 0, width: 1200, height: 630 },
      },
      {
        name: `favicon-16x16.png`,
        type: `png`,
        view: {x: 0, y: 0, width: 16, height: 16 },
      },
      {
        name: `favicon-32x32.png`,
        type: `png`,
        view: {x: 0, y: 0, width: 32, height: 32 },
      },

    ]
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

    // .................. capitalize
    const capitalize = s => (s == null) ? `` : s.charAt(0).toUpperCase() + s.slice(1)

    // .................. ereform
    let ereform = function (data, __) {
      let {eoroot} = __

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

      let {
        topic0from = 'blog', topic0to = 'eolist',
        topic1from = 'post', topic1to = 'eolem',
        topic2from = 'products', topic2to = 'eonet',
        topic3from = 'product', topic3to = 'eocell',
      } = __.eonopts

      let topic0fromUC = capitalize(topic0from); let topic0toUC = capitalize(topic0to)
      let topic1fromUC = capitalize(topic1from); let topic1toUC = capitalize(topic1to)
      let topic2fromUC = capitalize(topic2from); let topic2toUC = capitalize(topic2to) // eslint-disable-line no-unused-vars
      let topic3fromUC = capitalize(topic3from); let topic3toUC = capitalize(topic3to)

      let sets = [`${topic0from}`, `${topic1from}`, `${topic2from}`, `${topic3from}`]
      let newSets = [`${topic0to}`, `${topic1to}`, `${topic2to}`, `${topic3to}`]
      for (let i = 0; i < sets.length; i++) {
        console.log(`set ${sets[i]} to be ${newSets[i]}`) // eslint-disable-line no-console
      }

      let termx = [ // from x to y in contents in z
        [`/src/pages/index.md`, `home-jumbotron.jpg`, `home-main.jpg` ], // (1920x1280)
        [`/src/pages/index.md`, `coffee.png`, `${topic2to}-01.png` ], // (240x190)
        [`/src/pages/index.md`, `coffee-gear.png`, `${topic2to}-02.png` ], // (240x190)
        [`/src/pages/index.md`, `tutorials.png`, `${topic2to}-03.png` ], // (240x190)
        [`/src/pages/index.md`, `meeting-space.png`, `${topic2to}-04.png` ], // (240x190)
        [`/src/pages/${topic2from}/index.md`, `jumbotron.jpg`, `${topic2to}-main.jpg` ], // (1920x1280)
        [`/src/pages/${topic2from}/index.md`, `${topic2from}-full-width.jpg`, `${topic2to}-full.jpg` ], // (1796x1272)
        [`/src/pages/index.md`, `${topic2from}-grid1.jpg`, `${topic2to}-big.jpg` ], // (1920x1464)
        [`/src/pages/index.md`, `${topic2from}-grid2.jpg`, `${topic2to}-11.jpg` ], // (1920x1280)
        [`/src/pages/index.md`, `${topic2from}-grid3.jpg`, `${topic2to}-12.jpg` ], // (1920x1277)

        [`/src/pages/${topic0from}/2016-12-17-making-sense-of-the-scaas-new-flavor-wheel.md`, `flavor_wheel.jpg`, `${topic0to}-1.jpg` ], // (1024x681)
        [`/src/pages/${topic0from}/2016-12-17-making-sense-of-the-scaas-new-flavor-wheel.md`, `${topic0from}-${topic1from}`, `${topic0to}-${topic1to}` ],
        [`/src/pages/${topic0from}/2017-01-04-a-beginners-guide-to-brewing-with-chemex.md`, `chemex.jpg`, `${topic0to}-3.jpg` ], // (1920x1282)
        [`/src/pages/${topic0from}/2017-01-04-a-beginners-guide-to-brewing-with-chemex.md`, `${topic0from}-${topic1from}`, `${topic0to}-${topic1to}` ],
        [`/src/pages/${topic0from}/2017-01-04-just-in-small-batch-of-jamaican-blue-mountain-in-store-next-week.md`, `${topic0from}-${topic1from}`, `${topic0to}-${topic1to}` ],
        [`/src/pages/${topic0from}/index.js`, `${topic0from}-index.jpg`, `${topic0to}-top.jpg` ],

        [`/src/pages/${topic0from}/index.js`, `${topic0fromUC}Roll`, `${topic0toUC}Roll` ],
        [`/src/pages/${topic2from}/index.md`, `${topic2from}`, `${topic2to}` ],
        [`/src/pages/${topic2from}/index.md`, `${topic3from}-page`, `${topic3to}-page` ],

        [`/src/templates/index-page.js`, `${topic2from}`, `${topic2to}` ],
        [`/src/templates/index-page.js`, `${topic0from}`, `${topic0to}` ],
        [`/src/templates/index-page.js`, `${topic0fromUC}Roll`, `${topic0toUC}Roll` ],

        [`/src/templates/${topic0from}-${topic1from}.js`, `${topic0fromUC}${topic1fromUC}`, `${topic0toUC}${topic1toUC}` ],
        [`/src/templates/${topic0from}-${topic1from}.js`, `${topic0fromUC}${topic1fromUC}Template`, `${topic0toUC}${topic1toUC}Template` ],
        [`/src/templates/${topic0from}-${topic1from}.js`, `${topic0fromUC}${topic1fromUC}ByID`, `${topic0toUC}${topic1toUC}ByID` ],
        [`/src/templates/${topic0from}-${topic1from}.js`, `${topic0fromUC}`, `${topic0toUC}` ],

        [`/src/templates/${topic3from}-page.js`, `${topic3fromUC}PageTemplate`, `${topic3toUC}PageTemplate` ],
        [`/src/templates/${topic3from}-page.js`, `${topic3from}PageQuery`, `${topic3to}PageQuery` ],
        [`/src/templates/${topic3from}-page.js`, `${topic3fromUC}Page`, `${topic3toUC}Page` ],

        [`/src/components/Navbar.js`, `${topic2from}`, `${topic2to}` ],
        [`/src/components/Navbar.js`, `${topic3fromUC}s`, `${topic3toUC}s` ],
        [`/src/components/Navbar.js`, `${topic0from}`, `${topic0to}` ],
        [`/src/components/Navbar.js`, `${topic0fromUC}`, `${topic0toUC}` ],
        [`/src/components/Footer.js`, `${topic2from}`, `${topic2to}` ],
        [`/src/components/Footer.js`, `${topic3fromUC}s`, `${topic3toUC}s` ],
        [`/src/components/Footer.js`, `${topic0from}`, `${topic0to}` ],
        [`/src/components/${topic0fromUC}Roll.js`, `${topic0fromUC}Roll`, `${topic0toUC}Roll` ],
        [`/src/components/${topic0fromUC}Roll.js`, `${topic0from}-${topic1from}`, `${topic0to}-${topic1to}` ],
        [`/src/components/${topic0fromUC}Roll.js`, `${topic0from}-list-item`, `${topic0to}-list-item` ],
        [`/src/components/all.sass`, `${topic0from}`, `${topic0to}` ],

        [`/src/cms/cms.js`, `${topic2from}`, `${topic2to}` ],
        [`/src/cms/cms.js`, `${topic3fromUC}PagePreview`, `${topic3toUC}PagePreview` ],
        [`/src/cms/cms.js`, `${topic0from}`, `${topic0to}` ],
        [`/src/cms/cms.js`, `${topic0fromUC}${topic1fromUC}Preview`, `${topic0toUC}${topic1toUC}Preview` ],

        [`/src/cms/preview-templates/${topic0fromUC}${topic1fromUC}Preview.js`, `${topic0fromUC}${topic1fromUC}Template`, `${topic0toUC}${topic1toUC}Template` ],
        [`/src/cms/preview-templates/${topic0fromUC}${topic1fromUC}Preview.js`, `${topic0from}-${topic1from}`, `${topic0to}-${topic1to}` ],
        [`/src/cms/preview-templates/${topic0fromUC}${topic1fromUC}Preview.js`, `${topic0fromUC}${topic1fromUC}Preview`, `${topic0toUC}${topic1toUC}Preview` ],
        [`/src/cms/preview-templates/${topic3fromUC}PagePreview.js`, `${topic3fromUC}PageTemplate`, `${topic3toUC}PageTemplate` ],
        [`/src/cms/preview-templates/${topic3fromUC}PagePreview.js`, `${topic3from}-page`, `${topic3to}-page` ],
        [`/src/cms/preview-templates/${topic3fromUC}PagePreview.js`, `${topic3fromUC}PagePreview`, `${topic3toUC}PagePreview` ],

        [`/src/lambda/hello.js`, `${topic0from}`, `${topic0to}` ],

        [`/gatsby-node.js`, `${topic0from}`, `${topic0to}` ],
        [`/src/components/${topic0fromUC}Roll.js`, `${topic0from}`, `${topic0to}` ],
        [`/src/pages/contact/file-upload.js`, `${topic0from}`, `${topic0to}` ],
        [`/src/pages/contact/index.js`, `${topic0from}`, `${topic0to}` ],
        [`/src/templates/about-page.js`, `${topic0from}`, `${topic0to}` ],
        [`/src/templates/${topic0from}-eolem.js`, `${topic0from}`, `${topic0to}` ],
        [`/src/templates/tags.js`, `${topic0from}`, `${topic0to}` ],

      ]

      for (let i = 0; i < termx.length; i++) {
        let variant = termx[i]
        let pathSegment = variant[0]
        let fromTerm = variant[1]
        let toTerm = variant[2]

        let inFilePath = filer.resolvepath([eoroot, themePaths[0], pathSegment])
        console.log(`replace ${fromTerm} by ${toTerm} in ${inFilePath}`) // eslint-disable-line no-console

        if (filer.fileExistsSync(inFilePath)) {
          let fileText = fsExtra.readFileSync(inFilePath, `utf8`)

          let newtext = filer.replaceInText({
            from: fromTerm,
            to: toTerm,
            text: fileText,
            options: `g`,
          })

          fsExtra.writeFileSync(`${inFilePath}`, newtext, function (err) {
            if (err) throw err
          })
        }
      }

      let filex = [ // from x to y in file name z

        [`/static/img/`, `home-jumbotron.jpg`, `home-main.jpg` ], // (1920x1280)
        [`/static/img/`, `coffee.png`, `${topic2to}-01.png` ], // (240x190)
        [`/static/img/`, `coffee-gear.png`, `${topic2to}-02.png` ], // (240x190)
        [`/static/img/`, `tutorials.png`, `${topic2to}-03.png` ], // (240x190)
        [`/static/img/`, `meeting-space.png`, `${topic2to}-04.png` ], // (240x190)
        [`/static/img/`, `jumbotron.jpg`, `${topic2to}-main.jpg` ], // (1920x1280)
        [`/static/img/`, `${topic2from}-full-width.jpg`, `${topic2to}-full.jpg` ], // (1796x1272)
        [`/static/img/`, `${topic2from}-grid1.jpg`, `${topic2to}-big.jpg` ], // (1920x1464)
        [`/static/img/`, `${topic2from}-grid2.jpg`, `${topic2to}-11.jpg` ], // (1920x1280)
        [`/static/img/`, `${topic2from}-grid3.jpg`, `${topic2to}-12.jpg` ], // (1920x1277)
        [`/static/img/`, `flavor_wheel.jpg`, `${topic0to}-1.jpg` ], // (1204x681)
        [`/static/img/`, `chemex.jpg`, `${topic0to}-3.jpg` ], // (1920x1282)
        [`/static/img/`, `${topic0from}-index.jpg`, `${topic0to}-top.jpg` ], // (1920x1272)
        // [`/static/img/`, `apple-touch-icon.png`, `apple-touch-icon.png` ], // (180x180)
        // [`/static/img/`, `favicon-32x32.png`, `favicon-32x32.png` ], // (32x32)
        // [`/static/img/`, `favicon-16x16.png`, `favicon-16x16.png` ], // (16x16)
        // og-image.jpg            : (1200x632)
        // safari-pinned-tab.svg   : ()

        [`/src/pages/`, `${topic0from}`, `${topic0to}` ], // folder
        [`/src/pages/`, `${topic2from}`, `${topic2to}` ], // folder

        [`/src/components/`, `${topic0fromUC}Roll.js`, `${topic0toUC}Roll.js` ],

        [`/src/templates/`, `${topic0from}-${topic1from}.js`, `${topic0to}-${topic1to}.js` ],
        [`/src/templates/`, `${topic3from}-page.js`, `${topic3to}-page.js` ],

        [`/src/cms/preview-templates/`, `${topic0fromUC}${topic1fromUC}Preview.js`, `${topic0toUC}${topic1toUC}Preview.js` ],
        [`/src/cms/preview-templates/`, `${topic3fromUC}PagePreview.js`, `${topic3toUC}PagePreview.js` ],

        [`/src/pages/${topic0from}/`, `2016-12-17-making-sense-of-the-scaas-new-flavor-wheel.md`, `2017-03-09-${topic0to}-${topic1to}-1.md` ],
        [`/src/pages/${topic0from}/`, `2017-01-04-a-beginners-guide-to-brewing-with-chemex.md`, `2018-03-09-${topic0to}-${topic1to}-2.md` ],
        [`/src/pages/${topic0from}/`, `2017-01-04-just-in-small-batch-of-jamaican-blue-mountain-in-store-next-week.md`, `2019-03-09-${topic0to}-${topic1to}-3.md` ],

      ]

      for (let i = 0; i < filex.length; i++) {
        let variant = filex[i]
        let pathSegment = variant[0]
        let fromFileName = variant[1]
        let toFileName = variant[2]

        let fromFilePath = filer.resolvepath([eoroot, themePaths[0], pathSegment, fromFileName])
        let toFilePath = filer.resolvepath([eoroot, themePaths[0], pathSegment, toFileName])
        //
        // rename
        //
        if (filer.fileExistsSync(fromFilePath)) {
          fsExtra.moveSync(fromFilePath, toFilePath)
        } else if (filer.dirExistsSync(fromFilePath)) {
          fromFilePath = filer.resolvepath(fromFilePath)
          toFilePath = filer.resolvepath(toFilePath)
          fsExtra.moveSync(fromFilePath, toFilePath)
        }
      }
    }

    // .................. conform
    let conform = async function (data, __) {
      let {eoroot} = __ // eslint-disable-line no-unused-vars
      let {img} = __.eonopts // eslint-disable-line no-unused-vars
      img = `https://raw.githubusercontent.com/sifbuilder/eoimages/master/IMG_1018.JPG`
      let filepath = filer.fileuri(img)
      let uri = filer.geturi(img)
      let fileName = path.basename(filepath) // eslint-disable-line no-unused-vars

      // let {
      //   topic0from = 'blog', topic0to = 'eolist',
      //   topic1from = 'post', topic1to = 'eolem',
      //   topic2from = 'products', topic2to = 'eonet',
      //   topic3from = 'product', topic3to = 'eocell',
      // } = __.eonopts

      // let topic0fromUC = capitalize(topic0from); let topic0toUC = capitalize(topic0to)
      // let topic1fromUC = capitalize(topic1from); let topic1toUC = capitalize(topic1to)
      // let topic2fromUC = capitalize(topic2from); let topic2toUC = capitalize(topic2to) // eslint-disable-line no-unused-vars
      // let topic3fromUC = capitalize(topic3from); let topic3toUC = capitalize(topic3to)

      let dstPath = eoroot

      let picts = __.picts()
      let { headless, devtools, debuggingPort, window, timeout } = __.browseopts
      let windowWidth = window.width
      let windowHeight = window.height

      // visualizer
      let visualizer = await viewer.visualizer(data, __)
      if (visualizer !== undefined && visualizer !== null) { // there is an eoviewer
        const browser = await visualizer.launch({
          headless: headless,
          devtools: devtools, // open DevTools when window launches
          args: [
            `--remote-debugging-port=${debuggingPort}`,
            `--window-size=${windowWidth},${windowHeight}`, // window size
          ],
        })

        const page = await browser.newPage()
        try {
          await page.goto(uri, {

            waitUntil: 'domcontentloaded',
            timeout: timeout, // timeout
          })
        } catch (e) {
          throw new Error(e)
        }

        page.on('pageerror', err => { console.log('page error: ' + err.toString()) }) // eslint-disable-line no-console
        page.on('error', err => { console.log('error: ' + err.toString()) })// eslint-disable-line no-console
        await page.evaluate(() => console.log(`url is ${location.href}`))// eslint-disable-line no-console

        const sizeValue = await page.$eval('img', el => ({size: [el.naturalWidth, el.naturalHeight]}))
        let [imgW, imgH] = sizeValue.size

        for (let i = 0; i < picts.length; i++) {
          let pict = picts[i]

          let outUri = path.join(dstPath, pict.name)

          let {x = 0, y = 0, width = 600, height = 400 } = pict.view // dest pict

          let mxy = Math.max(1 + Math.abs(x), 1 + Math.abs(y)) // allow for clip xy

          let
            clipW = width, // target x resolution
            clipH = height, // target y resolution
            rx = clipW / imgW, // target to image x rate
            ry = clipH / imgH, // target to image y rate
            rxy = Math.max(rx, ry),
            viewW = Math.floor(imgW * rxy * mxy), // viewport x
            viewH = Math.floor(imgH * rxy * mxy) // viewport y

          let deltaW = (viewW - clipW)
          let deltaH = (viewH - clipH)
          let clipX = Math.floor(deltaW / 2)
          let clipY = Math.floor(deltaH / 2)

          let imgpos = [clipX, clipY]
          let imgsize = [clipW, clipH]

          let viewPort = { // include delta clip
            width: viewW,
            height: viewH,
            deviceScaleFactor: 1,
          }
          page.setViewport(viewPort) // viewport

          let itemOpts = Object.assign({}, __, {
            path: outUri,
            type: pict.type,
            clip: {
              x: imgpos[0],
              y: imgpos[1],
              width: imgsize[0],
              height: imgsize[1],
            },
          })

          await page.screenshot(itemOpts)
        }
      }
    }

    state.events = { ereform, conform }

    // ....................... enty
    let enty = {}
    enty.getState = () => state
    return enty
  }

  exports.eonitem = eonitem
})

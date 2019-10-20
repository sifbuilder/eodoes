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
      will create a theme as in tutorial https://www.gatsbyjs.org/tutorial/building-a-theme/
  
      usage:
        > node ./scripts/run eodoes-eodo-eotheme ../eosites eoparse --doc --view
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
      'gatsby-theme-events',
    ]

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
        //
        // 000 create theme tutorial
        //
        __eodoc_000: `
          ╭─────────────────────────────────────────────────────╮
          │       gatsby create a theme tutorial                │
          │ https://www.gatsbyjs.org/tutorial/building-a-theme/ │
          ╰─────────────────────────────────────────────────────╯`,
        //
        // 020 root manifest - https://www.gatsbyjs.org/tutorial/building-a-theme/#add-a-packagejson
        // Each workspace can be run separately, as well as one depending
        // on the other. In this example, gatsby-theme-events will be a
        // dependency of site
        //
        __eofiles_parcels_020: [{
          resolve: `package.json`,
          options: {
            __eodoc: `020 create the root manifest file`,
            content: {
              name: `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: true,
              devDependencies: {},
              workspaces: workspaces,
            },
          },
        } ],
        //
        // 030 starter manifest
        //
        __eodoc__030: `
        ┌─────────────────────────────────────────┐
        |                                         |        
        |   030 install ${starter}       |
        |                                         |        
        └─────────────────────────────────────────┘`,
        //
        // 040 Add dependencies to the starter manifest
        //  defaults to the root if not useWorkspaces
        //
        __eofiles_starter_040: [{
          resolve: `${starterPath}/package.json`,
          options: {
            __eodoc: `040 file starter manifest`,
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
        // 050 yarn
        //
        __eoexec__yarn__050: {
          resolve: `yarn ${silent}`,
          options: {
            __eodoc: `050 yarn with init dependencies`,
            cwd: ``,
          },
        },
        //
        // 060 init index
        //
        __eofiles_index_060: [{
          resolve: `${starterPath}src/pages/index.js`,
          options: {
            __eodoc: `060a create the ${starterPath} index page with a react component`,
            content: `
import React from "react"

const Index = () => (
  <>
    <h1><p>Hello from ${starter}</p></h1>
  </>
)

export default Index
`,
          },
        },
        {
          resolve: `${starterPath}src/pages/404.js`,
          options: {
            __eodoc: `060b create the 404 page`,
            content: `
import React from "react"

export default () => (
  <div><h1>Page not found</h1></div>
)
`,
          },
        } ],
        //
        // 070 restart the development server
        //
        __eorestart__070: {
          options: {
            __eodoc: `070 restart the development server`,
          },
        },
        //
        // 080 view index
        //
        __eoview__080____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       080 view entry page                   ║
            ╚═════════════════════════════════════════════╝` },
        },
        //
        // 100 install ${themes[0]}
        //
        __eodoc__100: `
        ┌─────────────────────────────────────────┐
        |                                         |        
        |   100 install ${themes[0]}       |
        |                                         |        
        └─────────────────────────────────────────┘`,
        //
        // 110 ${themes[0]} manifest with gatsby dependencies
        //    to static data to a theme
        //
        __eofiles_theme0_with_dependencies_110: [{
          resolve: `${themePaths[0]}package.json`,
          options: {
            __eodoc: `110 ${themes[0]} manifest with peer and dev gatsby dependencies`,
            content: {
              'name': `${themes[0]}`,
              'version': '1.0.0',
              'main': 'index.js', // specify a "main" entry point for theme as workspace
              'license': 'MIT',
              'scripts': {
                'build': 'gatsby build',
                'clean': 'gatsby clean',
                'develop': 'gatsby develop',
              },
              'devDependencies': {
                'gatsby': '^2.13.2',
                'react': '^16.8.6',
                'react-dom': '^16.8.6',
              },
              'peerDependencies': {
                'gatsby': '*',
                'react': '*',
                'react-dom': '*',
              },
              'dependencies': {
                'gatsby-source-filesystem': '*',
                'gatsby-transformer-yaml': '*',
              },
            },
          },
        } ],
        //
        // 120 create theme0 empty index page
        //
        __eofiles_theme0_init_120: [ {
          resolve: `${themePaths[0]}index.js`,
          options: {
            __eodoc: `120 init ${themes[0]} with index`,
            content: `//for Node to resolve the package`,
          },
        } ],
        //
        // 130 add theme0 workspace to starter
        //
        __eoexec_starter_workspaces_130: {
          resolve: `yarn ${silent} `,
          options: {
            __eodoc: `130 yarn `,
            cwd: `${themePaths[0]}`,
          },
        },
        //
        // 140 add theme0 workspace to starter (and install)
        //
        __eoexec_starter_workspaces_140: {
          resolve: `yarn ${silent} workspace ${starter} add ${themes[0]}@*`,
          options: {
            __eodoc: `140 yarn workspace ${starter} add ${themes[0]}@* (installing)`,
            __eodelay: delay,
            cwd: ``,
          },
        },
        //
        // 150 yarn  workspaces info
        //
        __eoexec__yarn__150: {
          resolve: `yarn workspaces info`,
          options: {
            __eodoc: `150 yarn workspaces info`,
            cwd: ``,
          },
        },
        //
        // 155 gatsby config theme0 in starter
        //
        __eofiles__config_155: [ {
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `155 starter to use ${themes[0]} (${starter} gatsby-config)`,
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
        // 160 add static data to a ${themes[0]} - https://www.gatsbyjs.org/tutorial/building-a-theme/#add-static-data-to-a-theme
        //
        __eofiles_starter_more_160: [ {
          resolve: `${themePaths[0]}data/events.yml`,
          options: {
            __eodoc: `160 add static data to ${themes[0]}`,
            content: `- name: React Rally
  location: Salt Lake City, UT
  start_date: 2019-08-22
  end_date: 2019-08-23
  url: https://www.reactrally.com/
- name: DinosaurJS
  location: Denver, CO
  start_date: 2019-06-20
  end_date: 2019-06-21
  url: https://dinosaurjs.org/
- name: JSHeroes
  location: Cluj-Napoca, Romania
  start_date: 2020-04-23
  end_date: 2020-04-24
  url: https://jsheroes.io/
- name: The Lead Developer
  location: Austin, TX
  start_date: 2019-11-08
  end_date: 2019-11-08
  url: https://austin2019.theleaddeveloper.com/
`,
          },
        } ],
        //
        // 170 gatsby config ${themes[0]}
        //   make the data file system relative to __dirname
        //    process.cwd(): packages\starter
        //    __dirname: packages\gatsby-theme-events
        //
        __eofiles_theme0_config_170: [ {
          resolve: `${themePaths[0]}gatsby-config.js`,
          options: {
            __eodoc: `170 config ${themes[0]} with page creator and client paths`,
            content: `
module.exports = function () {
  let res = {
    plugins: [
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: \`\${__dirname}/data\`,
        },
      },
      {
        resolve: "gatsby-transformer-yaml",
        options: {
          typeName: "Event",
        },
      },
    ],
  }
  return res
}
`,
          },
        } ],
        //
        // 175 restart server
        //
        __eorestart__175: {
          options: {
            __eodoc: `175 restart server`,
          },
        },
        //
        // 180 view graphql data
        //
        __eoview__180: {
          resolve: `http://localhost:8000/___graphql?query=query%20MyQuery%20%7B%0A%20%20allEvent%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=MyQuery`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       180 view graphql query                ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 190  starter and theme are created
        //
        __eodoc__190: `
        ┌─────────────────────────────────────────────────────┐
        |                                                     |
        |   190 starter and theme workspaces are now created  |
        |                                                     |
        └─────────────────────────────────────────────────────┘`,
        //
        // 210 theme0 gatsby node - https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
        //  Create a data directory using the onPreBootstrap lifecycle
        //  Set up to create data-driven pages
        //
        __eofiles__node_210: [ { //
          resolve: `${themePaths[0]}gatsby-node.js`,
          options: {
            __eodoc: `210 gatsby-node`,
            content: `
const fs = require("fs")

// Create a data directory using the onPreBootstrap lifecycle
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = "data"
  if (!fs.existsSync(contentPath)) {
    reporter.info(\`creating the \${contentPath} directory\`)
    fs.mkdirSync(contentPath)
  }
}

// Define the "Event" type
// Use the createTypes to create the new Event type
// @dontInfer to define fields explicitly
// create fields: https://www.gatsbyjs.org/docs/actions/#createTypes
// create slug field
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(\`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  \`)
  }

  // Define resolvers for custom fields
  // use createResolvers API hook to get createResolvers
  // set the basePath to be the root
  // define the slugify helper to help generate the slugs
  // define a resolver for the slug field on the Event type
  // The resolver function receives the Event node as source
  //    to include the new slugs in the Event data
  exports.createResolvers = ({ createResolvers }) => {
    const basePath = "/"
    // Quick-and-dirty helper to convert strings into URL-friendly slugs
    const slugify = str => {
      const slug = str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
      return \`/\${basePath}/\${slug}\`.replace(/\\/\\/+/g, "/")
    }
    createResolvers({
      Event: {
        slug: {
          resolve: source => slugify(source.name),
        },
      },
    })
  }
`,
          },
        } ],
        //
        // 220 restart the development server
        //
        __eorestart__220: {
          options: {
            __eodoc: `220 restart the development server`,
          },
        },
        //
        // 230 view index
        //
        __eoview__230____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       230 view entry page                   ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 235 view graphiqlquery
        //
        __eoview__235____________________: {
          resolve: `http://localhost:8000/___graphql?query=query%20MyQuery%20%7B%0A%20%20allEvent%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20endDate(formatString%3A%20%22%22)%0A%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20startDate(formatString%3A%20%22%22)%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║  235 view graphiql Event data with slugs    ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 240 Create data-driven pages using GraphQL and createPages
        //  create pages for both the event previews and individual event pages
        //    using the createPages API hook
        //
        __eofiles__node_240: [ { //
          resolve: `${themePaths[0]}gatsby-node.js`,
          options: {
            __eodoc: `240 gatsby-node`,
            content: `
const fs = require("fs")

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = "data"
  if (!fs.existsSync(contentPath)) {
    reporter.info(\`creating the \${contentPath} directory\`)
    fs.mkdirSync(contentPath)
  }
}

// Define the "Event" type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(\`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  \`)
  }

  // Define resolvers for custom fields
  exports.createResolvers = ({ createResolvers }) => {
    const basePath = "/"
    // Quick-and-dirty helper to convert strings into URL-friendly slugs.
    const slugify = str => {
      const slug = str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
      return \`/\${basePath}/\${slug}\`.replace(/\\/\\/+/g, "/")
    }

  // define a resolver for the slug field, on the Event type    
    createResolvers({
      Event: {
        slug: {
          resolve: source => slugify(source.name),
        },
      },
    })
  }

// Set up the call to create the root page
// query for events and create pages
// set up the call to the createPage action to create the a page at the base path
//  the templates/events component will be created later
//    localize the component file to __dirname _e_ basePath
exports.createPages = async ({ actions, graphql, reporter }) => {
  const basePath = "/"
  actions.createPage({
    path: basePath,
    component: require.resolve(\`\${__dirname}/src/templates/events.js\`),
  })

  // Query for events
  // retrieve all events, sorted by start date, in ascending order
  const result = await graphql(\`
    query {
      allEvent(sort: { fields: startDate, order: ASC }) {
        nodes {
          id
          slug
        }
      }
    }
  \`)
  if (result.errors) {
    reporter.panic("error loading events", result.errors)
    return
  }

  // Create a page for each event with createPage 
  //  the templates/event component will be created later
  //    localize the component file to __dirname _e_ basePath
  const events = result.data.allEvent.nodes
  events.forEach(event => {
    const slug = event.slug
    actions.createPage({
      path: slug,
      component: require.resolve(\`\${__dirname}/src/templates/event.js\`),
      context: {
        eventID: event.id,
      },
    })
  })  
}
`,
          },
        } ],

        //
        // 250 Create the “events” and “event” template component
        //
        __eofiles__events_250: [ { //
          resolve: `${themePaths[0]}src/templates/events.js`,
          options: {
            __eodoc: `250 create EventsTemplate component`,
            content: `
import React from "react"
const EventsTemplate = () => <p>TODO: Build the events page template</p>
export default EventsTemplate
`},
        }, { //
          resolve: `${themePaths[0]}src/templates/event.js`,
          options: {
            __eodoc: `250b create EventTemplate component`,
            content: `
import React from "react"
const EventTemplate = () => <p>TODO: Build the event page template</p>
export default EventTemplate
`},
        }],

        //
        // 260 restart the development server
        //
        __eorestart__260: {
          options: {
            __eodoc: `260 restart the development server`,
          },
        },
        //
        // 270 view events page
        //
        __eoview__270____________________: {
          resolve: `http://localhost:8000/events`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║           270 view events page              ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 280 view dinosaurjs page
        //
        __eoview__280____________________: {
          resolve: `http://localhost:8000/dinosaurjs`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       280 view /dinosaurjs page             ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 290 view react-rally page
        //
        __eoview__290____________________: {
          resolve: `http://localhost:8000/react-rally`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       290 view /react-rally page            ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 300 display sorted data with useStaticQuery
        //  import graphql and useStaticQuery from Gatsby in the events.js component
        //
        __eofiles__events_300: [ { //
          resolve: `${themePaths[0]}src/templates/events.js`,
          options: {
            __eodoc: `300 teplates.events, import graphql and useStaticQuery`,
            content: `
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
const EventsTemplate = () => <p>TODO: Build the events page template</p>
export default EventsTemplate
`},
        } ],
        //
        // 310 refactor the events component to include a static query for events data
        //
        __eofiles__events_310: [ { //
          resolve: `${themePaths[0]}src/templates/events.js`,
          options: {
            __eodoc: `310 refactor the events component with static query for events`,
            content: `
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
const EventsTemplate = () => {
  const data = useStaticQuery(graphql\`
    query {
      allEvent(sort: { fields: startDate, order: ASC }) {
        nodes {
          id
          name
          startDate
          endDate
          location
          url
          slug
        }
      }
    }
  \`)
  const events = data.allEvent.nodes
  return <p>TODO: Build the events page template</p>
}
export default EventsTemplate
`},
        } ],

        //
        // 320 Create the UI to display event data
        //
        __eofiles__events_320: [ { //
          resolve: `${themePaths[0]}src/components/layout.js`,
          options: {
            __eodoc: `320 Create a general layout component`,
            content: `
import React from "react"
const Layout = ({ children }) => (
  <div>
    <h1>Gatsby Events Theme</h1>
    {children}
  </div>
)
export default Layout
`},
        } ],
        //
        // 330 Create an events list component
        // will display a stringified object from the JSON data received on the events prop
        //
        __eofiles__events_330: [ { //
          resolve: `${themePaths[0]}src/components/event-list.js`,
          options: {
            __eodoc: `330 Create an events list component`,
            content: `
import React from "react"
const EventList = ({ events }) => <pre>{JSON.stringify(events, null, 2)}</pre>
export default EventList
`},
        } ],
        //
        // 340 Add the layout and events list components to the events page
        //  import the two layout components
        //  refactor the render method to use the new components
        //  give the <EventList> component the events data
        //
        __eofiles__events_340: [ { //
          resolve: `${themePaths[0]}src/templates/events.js`,
          options: {
            __eodoc: `340 Add the layout and events list components to the events page`,
            content: `
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import EventList from "../components/event-list"
const EventsTemplate = () => {
  const data = useStaticQuery(graphql\`
    query {
      allEvent(sort: { fields: startDate, order: ASC }) {
        nodes {
          id
          name
          startDate
          endDate
          location
          url
          slug
        }
      }
    }
  \`)
  const events = data.allEvent.nodes
  return (
    <Layout>
      <EventList events={events} />
    </Layout>
  )
}
export default EventsTemplate
`},
        } ],
        //
        // 345 restart server
        //
        __eorestart__345: {
          options: {
            __eodoc: `345 restart server`,
          },
        },
        //
        // 350 view index
        //
        __eoview__350____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║       350 view index                         ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 360 Update the event list component to use the event data in markup
        //  create a header for “Upcoming Events”
        //  map over all of the “event” records to display the event name, date and location
        //
        __eofiles__events_360: [ { //
          resolve: `${themePaths[0]}src/components/event-list.js`,
          options: {
            __eodoc: `360 Update the event list component to use the event data in markup`,
            content: `
import React from "react"
import { Link } from "gatsby"
const EventList = ({ events }) => (
  <>
    <h2>Upcoming Events</h2>
    <ul>
      {events.map(event => (
        <li key={event.id}>
          <strong>
            <Link to={event.slug}>{event.name}</Link>
          </strong>
          <br />
          {new Date(event.startDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          in {event.location}
        </li>
      ))}
    </ul>
  </>
)
export default EventList
`},
        } ],
        //
        // 370 view index with event name, date and location
        //
        __eoview__370____________________: {
          resolve: `http://localhost:8000/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║ 370 view with event name, date and location ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 380 Display and query data by id with context and static queries
        //
        __eofiles__events_380: [ { //
          resolve: `${themePaths[0]}src/templates/event.js`,
          options: {
            __eodoc: `380 Add a page query to query for individual events by id`,
            content: `
import React from "react"
import { graphql } from "gatsby"
export const query = graphql\`
  query($eventID: String!) {
    event(id: { eq: $eventID }) {
      name
      url
      startDate(formatString: "MMMM DD YYYY")
      endDate(formatString: "MMMM DD YYYY")
      location
      slug
    }
  }
\`
const EventTemplate = () => <p>TODO: Build the event page template</p>
export default EventTemplate
`},
        } ],
        //
        // 390 Modify the event template to access event data
        //    the <Event> component has yet to be created
        //
        __eofiles__events_390: [ { //
          resolve: `${themePaths[0]}src/templates/event.js`,
          options: {
            __eodoc: `390 Modify the event template to access event data`,
            content: `
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Event from "../components/event"
export const query = graphql\`
  query($eventID: String!) {
    event(id: { eq: $eventID }) {
      name
      url
      startDate(formatString: "MMMM DD YYYY")
      endDate(formatString: "MMMM DD YYYY")
      location
      slug
    }
  }
\`
const EventTemplate = ({ data: { event } }) => (
  <Layout>
    <Event {...event} />
  </Layout>
)
export default EventTemplate
`},
        } ],

        //
        // 400 create the <Event> component
        //
        __eofiles__events_400: [ { //
          resolve: `${themePaths[0]}src/components/event.js`,
          options: {
            __eodoc: `400 create the <Event> component`,
            content: `
import React from "react"
const Event = props => <pre>{JSON.stringify(props, null, 2)}</pre>
export default Event
`},
        } ],
        //
        // 410 view dinosaurjs page
        //
        __eoview__410____________________: {
          resolve: `http://localhost:8000/dinosaurjs`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║ 410 view dinosaurjs page                    ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 420 update the Event component to use markup
        //
        __eofiles__events_420: [ { //
          resolve: `${themePaths[0]}src/components/event.js`,
          options: {
            __eodoc: `420 update the Event component to use markup`,
            content: `
import React from "react"
const Event = ({ name, location, url, startDate, endDate }) => (
  <div>
    <h2>
      {name} ({location})
    </h2>
    <p>
      {startDate}-{endDate}
    </p>
    <p>
      Website: <a href={url}>{url}</a>
    </p>
  </div>
)
export default Event
`},
        } ],
        //
        // 430 view event page with updated markup
        //
        __eoview__430____________________: {
          resolve: `http://localhost:8000/dinosaurjs`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔══════════════════════════════════════════════╗
            ║ 430 view dinosaurjs page with updated markup ║
            ╚══════════════════════════════════════════════╝`,
          },
        },
        //
        // 440 Style and format dates in React
        //    https://egghead.io/lessons/react-style-and-format-dates-in-react
        //
        __eofiles__events_440: [ { //
          resolve: `${themePaths[0]}src/components/event.js`,
          options: {
            __eodoc: `440 Style and format dates in React`,
            content: `
import React from "react"
const getDate = (date, { day = true, month = true, year = true } = {}) =>
  date.toLocaleDateString("en-US", {
    day: day ? "numeric" : undefined,
    month: month ? "long" : undefined,
    year: year ? "numeric" : undefined,
  })
const EventDate = ({ startDate, endDate }) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const isOneDay = start.toDateString() === end.toDateString()
  return (
    <>
      <time dateTime={start.toISOString()}>
        {getDate(start, { year: isOneDay })}
      </time>
      {!isOneDay && (
        <>
          –
          <time dateTime={end.toISOString()}>
            {getDate(end, { month: start.getMonth() !== end.getMonth() })}
          </time>
        </>
      )}
    </>
  )
}
const Event = ({ name, location, url, startDate, endDate }) => (
  <div>
    <h2>
      {name} ({location})
    </h2>
    <p>
      <EventDate startDate={startDate} endDate={endDate} />
    </p>
    <p>
      Website: <a href={url}>{url}</a>
    </p>
  </div>
)
export default Event
`},
        } ],
        //
        // 450 view event page
        //
        __eoview__450____________________: {
          resolve: `http://localhost:8000/dinosaurjs`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║ 450 view dinosaurjs page                    ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 500 Configure a theme to take options
        // The contentPath will default to “data” and the basePath to root ”/“.
        //  The function export in gatsby-config.js is only supported for themes
        //      the theme can no longer be used on its own !!!
        //      it will be used from the ${starter}
        //  the ${starter} will consume the ${themes[0]}
        //  the ${starter} still requires the object export in gatsby-config.js
        //
        __eofiles__events_500: [ {
          resolve: `${themePaths[0]}gatsby-config.js`,
          options: {
            __eodoc: `500 gatsby config the theme to take options`,
            content: `
module.exports = ({ contentPath = "data", basePath = "/" }) => ({
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentPath,
      },
    },
    {
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: "Event",
      },
    },
  ],
})
`},
        } ],
        //
        // 520 Update the contentPath in gatsby-node to use the option set in gatsby-config
        //
        __eofiles__node_520: [ { //
          resolve: `${themePaths[0]}gatsby-node.js`,
          options: {
            __eodoc: `520 gatsby-node for params`,
            content: `
const fs = require("fs")

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || "data"
  if (!fs.existsSync(contentPath)) {
    reporter.info(\`creating the \${contentPath} directory\`)
    fs.mkdirSync(contentPath)
  }
}

// Define the "Event" type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(\`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  \`)
  }

  // Define resolvers for custom fields
  exports.createResolvers = ({ createResolvers }, options) => {
    const basePath = options.basePath || "/"
    // Quick-and-dirty helper to convert strings into URL-friendly slugs.
    const slugify = str => {
      const slug = str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
      return \`/\${basePath}/\${slug}\`.replace(/\\/\\/+/g, "/")
    }

  // define a resolver for the slug field, on the Event type    
    createResolvers({
      Event: {
        slug: {
          resolve: source => slugify(source.name),
        },
      },
    })
  }

// Set up the call to create the root page
// query for events and create pages
exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || "/"
  actions.createPage({
    path: basePath,
    component: require.resolve(\`\${__dirname}/src/templates/events.js\`),
  })

  // Query for events
  const result = await graphql(\`
    query {
      allEvent(sort: { fields: startDate, order: ASC }) {
        nodes {
          id
          slug
        }
      }
    }
  \`)
  if (result.errors) {
    reporter.panic("error loading events", result.errors)
    return
  }
  // Create a page for each event
  const events = result.data.allEvent.nodes
  events.forEach(event => {
    const slug = event.slug
    actions.createPage({
      path: slug,
      component: require.resolve(\`\${__dirname}/src/templates/event.js\`),
      context: {
        eventID: event.id,
      },
    })
  })  
}
`,
          },
        } ],
        //
        // 530 test out this new options-setting in the ${starter}
        //  contentPath set to “events” so to look for content in an “events” directory
        //  basePath set to “events” so to creatw the events listing at /events
        //
        __eofiles__config_530: [ {
          resolve: `${starterPath}gatsby-config.js`,
          options: {
            __eodoc: `530 starter to use ${themes[0]} (${starter} gatsby-config)`,
            content: `
module.exports = {
  plugins: [
    {
      resolve: "${themes[0]}",
      options: {
        contentPath: "events",
        basePath: "/events",
      },
    },    
  ],
}
`,
          },
        } ],
        //
        // 535 restart server
        // an “events” directory will be automatically generated in site/events
        // there is a new /events page
        //
        __eorestart__535: {
          options: {
            __eodoc: `535 restart server`,
          },
        },
        //
        // 540 view events page
        //
        __eoview__540____________________: {
          resolve: `http://localhost:8000/events`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║  540 view events page (without events)      ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 560 Copy the events.yml from the starter to the theme
        //
        __eofiles_netlify_cms_560: [{
          resolve: `${starterPath}/events//events.yml`, // to
          options: {
            __eodoc: `560 Copy the events.yml from the starter to the theme`,
            path: `${themePaths[0]}data/events.yml`, // from
          },
        } ],
        //
        // 570 restart the development server
        //
        __eorestart__570: {
          options: {
            __eodoc: `570 restart the development server`,
          },
        },
        //
        // 580 view the events page
        //
        __eoview__580____________________: {
          resolve: `http://localhost:8000/events`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║         580 view the events page            ║
            ╚═════════════════════════════════════════════╝`,
          },
        },

        //
        // 600 Make themes extendable with gatsby-plugin-theme-ui
        //    using the gatsby-plugin-theme-ui package
        //
        __eofiles_theme0_with_dependencies_600: [{
          resolve: `${themePaths[0]}package.json`,
          options: {
            __eodoc: `600 ${themes[0]} manifest with peer gatsby dependencies`,
            content: {
              'name': `${themes[0]}`,
              'version': '1.0.0',
              'main': 'index.js', // specify a "main" entry point for theme as workspace
              'license': 'MIT',
              'scripts': {
                'build': 'gatsby build',
                'clean': 'gatsby clean',
                'develop': 'gatsby develop',
              },
              'devDependencies': {
                'gatsby': '^2.13.2',
                'react': '^16.8.6',
                'react-dom': '^16.8.6',
              },
              'peerDependencies': {
                'gatsby': '*',
                'react': '*',
                'react-dom': '*',
              },
              'dependencies': {
                'gatsby-source-filesystem': '*',
                'gatsby-transformer-yaml': '*',

                'gatsby-plugin-theme-ui': '*', // add theme-ui dependencies
                'theme-ui': '*',
                '@emotion/core': '*',
                '@emotion/styled': '*',
                '@mdx-js/react': '*',
              },
            },
          },
        } ],
        //
        // 610 yarn with theme-ui dependencies
        //
        __eoexec__yarn__610: {
          resolve: `yarn ${silent}`,
          options: {
            __eodoc: `610 yarn with theme-ui dependencies`,
            cwd: ``,
          },
        },
        //
        // 620 add the gatsby-plugin-theme-ui plugin to the theme config
        // gatsby-plugin-theme-ui takes a global theme context object and makes it available to all themes using gatsby-plugin-theme-ui
        //
        __eofiles_theme0_config_620: [ {
          resolve: `${themePaths[0]}gatsby-config.js`,
          options: {
            __eodoc: `620 add the gatsby-plugin-theme-ui plugin to the theme config`,
            content: `
module.exports = function ({ contentPath = "data", basePath = "/" }) {
  let res = {
    plugins: [
      "gatsby-plugin-theme-ui",      
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: contentPath,
        },
      },
      {
        resolve: "gatsby-transformer-yaml",
        options: {
          typeName: "Event",
        },
      },
    ],
  }
  return res
}
`,
          },
        } ],
        //
        // 630 create a theme.js file
        // gatsby-plugin-theme-ui uses Theme UI, which is part of a System UI network of tools,
        //    all of which follow the System UI theme specification
        //
        __eofiles__events_630: [ { //
          resolve: `${themePaths[0]}src/theme.js`,
          options: {
            __eodoc: `630 create a theme.js file`,
            content: `
export const theme = {
  space: [0, 4, 8, 16, 32],
  fonts: {
    body: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  },
  fontSizes: [16, 18, 20, 22, 27, 36],
  lineHeights: {
    body: 1.45,
    heading: 1.1,
  },
  colors: {
    gray: ["#efefef", "#ddd", "#333", "#111"],
    background: "#fff",
    primary: "rebeccapurple",
  },
  sizes: {
    default: "90vw",
    max: "540px",
  },
  styles: {
    Layout: {
      color: "gray.2",
      fontFamily: "body",
      fontSize: 1,
      lineHeight: "body",
    },
    Header: {
      backgroundColor: "primary",
      color: "background",
      fontWeight: "bold",
      margin: "0 auto",
      maxWidth: "max",
      padding: 3,
      width: "default",
      a: {
        color: "inherit",
      },
    },
    Main: {
      margin: "0 auto",
      maxWidth: "max",
      width: "default",
    },
    Container: {
      padding: 3,
    },
    h1: {
      color: "gray.3",
      fontSize: 5,
      fontWeight: "bold",
      lineHeight: "heading",
      margin: "1rem 0 0",
    },
    ul: {
      borderTop: "1px solid",
      borderColor: "gray.0",
      listStyle: "none",
      padding: 0,
    },
    li: {
      borderBottom: "1px solid",
      borderColor: "gray.1",
      padding: 2,
      "&:focus-within,&:hover": {
        backgroundColor: "gray.0",
      },
    },
  },
}
export default theme
`},
        } ],
        //
        // 640 override a theme with component shadowing
        // new file at gatsby-theme-events/src/gatsby-plugin-theme-ui/index.js
        //
        __eofiles__events_640: [ { //
          resolve: `${themePaths[0]}src/gatsby-plugin-theme-ui/index.js`,
          options: {
            __eodoc: `640 create shadow index file`,
            content: `
import { theme } from "../theme"
export default theme
`},
        } ],
        //
        // 650 import the layout
        //
        __eofiles__events_650: [ { //
          resolve: `${themePaths[0]}src/components/layout.js`,
          options: {
            __eodoc: `650 import the layout`,
            content: `
import React from "react"
import { Layout as ThemeLayout, Header, Main, Container } from "theme-ui"
const Layout = ({ children }) => (
  <div>
    <h1>Gatsby Events Theme</h1>
    {children}
  </div>
)
export default Layout
`},
        } ],
        //
        // 660 refactor the layout
        //
        __eofiles__events_660: [ { //
          resolve: `${themePaths[0]}src/components/layout.js`,
          options: {
            __eodoc: `660 refactor the layout`,
            content: `
import React from "react"
import { Layout as ThemeLayout, Header, Main, Container } from "theme-ui"
const Layout = ({ children }) => {
  return (
    <ThemeLayout>
      <Header>Gatsby Events Theme</Header>
      <Main>
        <Container>{children}</Container>
      </Main>
    </ThemeLayout>
  )
}
export default Layout
`},
        } ],
        //
        // 665 restart server
        //
        __eorestart__665: {
          options: {
            __eodoc: `665 restart server`,
          },
        },
        //
        // 670 view the events
        //
        __eoview__670____________________: {
          resolve: `http://localhost:8000/events`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║         670 view the events page            ║
            ╚═════════════════════════════════════════════╝`,
          },
        },
        //
        // 700 use the Style import from Theme UI
        //
        __eofiles__events_700: [ { //
          resolve: `${themePaths[0]}src/components/event-list.js`,
          options: {
            __eodoc: `700 use the Style import from Theme UI`,
            content: `
import React from "react"
import { Link } from "gatsby"
import { Styled } from "theme-ui"
const EventList = ({ events }) => {
  return (
    <>
      <Styled.h1>Upcoming Events</Styled.h1>
      <Styled.ul>
        {events.map(event => (
          <Styled.li key={event.id}>
            <strong>
              <Link to={event.slug}>{event.name}</Link>
            </strong>
            <br />
            {new Date(event.startDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            in {event.location}
          </Styled.li>
        ))}
      </Styled.ul>
    </>
  )
}
export default EventList
`},
        } ],
        //
        // 710 view the events
        //
        __eoview__710____________________: {
          resolve: `http://localhost:8000/events`,
          options: {
            __eodelay: delay,
            __eodoc: `
        ╔═════════════════════════════════════════════╗
        ║         710 view the events page            ║
        ╚═════════════════════════════════════════════╝`,
          },
        },
        __eodoc__800: `
        ┌───────────────────────────────────────┐
        |   800 could publish theme to npm      |
        └───────────────────────────────────────┘`,
        __eodoc__810: `
        ┌─────────────────────────────────────────┐
        |   810 could consume the published theme |
        └─────────────────────────────────────────┘`,
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

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
  async function eonitem (__eo = {}) {
    /* eslint-disable no-unused-vars */
    let isWin = process.platform === 'win32' // eslint-disable-line no-unused-vars
    let isLinux = process.platform === 'linux' // eslint-disable-line no-unused-vars
    const events = require('eodoes-events')
    /* eslint-enable no-unused-vars */

    const {report} = require('eodoes-muons')

    let state = {

      helpmsg: ` 
      will create aws services

      usage:      
      > node ./scripts/run eodoes-eodo-awsexpress ../eosites eoparse
`,

      eotags: {
        '--useWorkspaces': false, // use workspaces
        '--setCredentials': false, // set aws credentials
        '--isOffline': false, // https://medium.com/@kilgarenone/setting-up-serverless-2f811486573b
      },

    }

    /**********************
      * eoparse__parcel
      */
    state.eoparse__parcel = function (data, __) {
      let { eoroot } = __ // eslint-disable-line no-unused-vars
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars

      let silent = __.eonopts['silent'] ? '--silent' : '' // yarn silent
      let verbose = __.eonopts['verbose'] ? '--verbose' : '' // yarn verbose

      let {
        setCredentials, // tag: will pass credentials in the command line
        awskey, // flag: key
        awssecret, // flag: secret
        doLog, // save log to file
      } = __.eonopts

      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars

      let packages = `packages`
      let {useWorkspaces} = __.eonopts
      let {workspaces = [
        'compiler',
        'dashboard',
      ]} = __
      let packagesPath = useWorkspaces ? `${packages}/` : `./`
      let workspacePaths = workspaces.map(d => useWorkspaces ? `${packagesPath}${d}/` : `./`)

      report.trace({useWorkspaces, workspaces, workspacePaths}, __)

      /**
       *  parcel
       */
      let parcel = { // ---------------------- parcel

        __eofolders_root: ['.'],

        __eodoc_000: `
          ╭────────────────────────────────────────────────────────────╮
          │ 000 serverless website with aws                            │
          │ https://codeburst.io/how-to-build-your-first-serverless-website-aws-5cd72a1f7bfe        │
          ╰────────────────────────────────────────────────────────────╯`,
        //
        // 010 the event management process in aws
        //
        __eodoc_010: `

`,

        //
        // 012 configruation
        //
        __eodoc_012: `

`,

        // https://dashboard.serverless.com/tenants/sifbuilder/applications/eoawsexpress/services/event-collection/stage/dev/region/us-east-1
        //
        // 020 check node
        //
        __eoexec_node_020: [{
          resolve: `node -v`,
          options: {
            __eodoc: `020 check node`,
          },
        } ],
        //
        // 022 check yarn global
        //
        __eoexec_yarn_022: [{
          resolve: `yarn -v`,
          options: {
            __eodoc: `022 check yarn global`,
          },
        } ],

        //
        // 024 check serverless global
        //
        __eoexec_serverless_024: [{
          resolve: `serverless --version`,
          options: {
            __eodoc: `024 check serverless global`,
          },
        } ],
        //
        // 028 view aws
        //
        __eoview__028____________________: {
          resolve: `https://dashboard.serverless.com/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║     028  login to serverless                 ║
            ╚═════════════════════════════════════════════╝` },
        },
        //
        // 040 check aws-cli installed
        //
        __eoexec_aws_040: [{
          resolve: `aws --version`,
          options: {
            __eodoc: `040 check aws-cli installed ref. https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html`,
          },
        } ],
        //
        // 042 view aws
        //
        __eoview__042____________________: {
          resolve: `https://aws.amazon.com`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║     042  signup to aws                      ║
            ╚═════════════════════════════════════════════╝` },
        },

        //
        // 050 package.json
        //
        __eofiles_parcels_050: [{
          resolve: `package.json`,
          options: {
            __eodoc: `030 root manifest`,
            content: {
              name: `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: true,
              scripts: {},
              workspaces: useWorkspaces
                ? [ `${packagesPath}*` ]
                : [],
            },
          },
        } ],
        //
        // 060 package.json
        //
        __eofiles_workspace_060: [{
          resolve: useWorkspaces
            ? `${workspacePaths[0]}package.json`
            : `package.json`,
          options: {
            __eodoc: `060 ws0 manifest`,
            content: {
              'name': useWorkspaces
                ? `${workspaces[0]}`
                : `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: false,
              scripts: {},
              'dependencies': {
                'serverless': '*',
                'aws-sdk': '*',
                'express': '*',
                'body-parser': '*',
                'hbs': '*',
                'serverless-http': '*',
              },

            },
          },
        } ],
        //
        // 070 yarn workspaces[0]
        //
        __eoexec_ws0_yarn_070: {
          resolve: `yarn ${silent} ${verbose} `,
          options: {
            __eodoc: `
            ┌─────────────────────────────────────────┐
            |  070  yarn ${silent} ${verbose}         |
            └─────────────────────────────────────────┘`,
            cwd: ``,
          },
        },
        //
        // 080 aws configure or version
        //
        __eoexec_aws_configure_080: {
          resolve: setCredentials
            ? `serverless config credentials --provider aws --key ${awskey} --secret ${awssecret}`
            : ``,
          options: {
            __eodoc: `080 aws configure if setCredentials or ~/.aws/credentials`,
            __eodelay: delay,
            cwd: ``,
          },
        },

        //
        // 090 create aws 'event-collection' service from node template
        //
        __eoexec_serverless_create_090: {
          resolve: `serverless create -t aws-nodejs -n event-collection`,
          options: {
            __eodoc: `090 serverless create -t aws-nodejs -n event-collection`,
            __eodelay: delay,
            cwd: `${workspacePaths[0]}`,
          },
        },
        //
        // 100 handler
        //
        __eofiles_handler_100: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}handler.js`
              : `handler.js`,
            options: {
              __eodoc: `100 create handler.js to write record into a Kinesis Data Stream named event-collection`,
              content: `
const serverless = require("serverless-http")
const hbs = require("hbs")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.set("view engine", "hbs")

app.get("/", function(req, res) {
  res.status(200).render("index")
})

module.exports.gallery = serverless(app)
`,
            },
          } ],
        //
        // 106 handler
        //
        __eofiles_handler_106: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}views/index.hbs`
              : `views/index.hbs`,
            options: {
              __eodoc: `106 views folder with index.hbs`,
              content: `
<!DOCTYPE html>
<html lang=en>

<head>
<meta charset=UTF-8>
<meta name=viewport content="width=device-width, initial-scale=1.0">
<meta http-equiv=X-UA-Compatible content="ie=edge">
<meta http-equiv=refresh>
<title>Gallery</title>
<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0
}
body {
    padding: 2rem
}
ul {
    padding: 1rem;
    display: flex;
    list-style: none;
    justify-content: space-around;
    flex-wrap: wrap
}
li {
    background-color: #ffdfd9;
    color: #000;
    padding: .51rem
}
.container {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 290px));
    grid-gap: 1rem;
    padding: 1rem;
    justify-content: center;
    box-shadow: 0 1px 1px #000
}
img {
    background-position: top;
    background-size: cover;
    height: 200px;
    width: 290px;
    box-shadow: 0 2px 10px #000;
    cursor: pointer;
    transition: all .2s
}
img:hover {
    box-shadow: none;
    transform: scale(1.1)
}
</style>

<body>
<header>
    <nav>
        <ul>
            <li>Home</li>
            <li>Blog</li>
            <li>Contact</li>
            <li>Posts</li>
        </ul>
    </nav>
</header>
<div class=container>
    <div>
        <img src=https://images.pexels.com/photos/1117267/pexels-photo-1117267.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260 alt=ballon>
    </div>
    <div>
        <img src="https://images.pexels.com/photos/1117267/pexels-photo-1117267.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt=lion>
    </div>
    <div>
        <img src=https://images.pexels.com/photos/1117267/pexels-photo-1117267.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260 alt=model>
    </div>
    <div>
        <img src=https://images.pexels.com/photos/879479/pexels-photo-879479.jpeg?auto=compress&cs=tinysrgb&h=350 alt=easter-3204589_960_720>
    </div>
    <div>
        <img src=https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&h=350 alt=night-1927265_960_720>
    </div>
    <div>
        <img src=https://images.pexels.com/photos/956724/pexels-photo-956724.jpeg?auto=compress&cs=tinysrgb&h=350 alt=portrait-3013924_960_720>
    </div>
    <div>
        <img src=https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&h=350 alt=model>
    </div>
    <div>
        <img src=https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&h=350 alt=ballon>
    </div>
    <div>
        <img src=https://images.pexels.com/photos/1116558/pexels-photo-1116558.jpeg?auto=compress&cs=tinysrgb&h=350 alt=back-to-school-2629361_960_720>
    </div>
    <div>
        <img src=https://images.pexels.com/photos/956724/pexels-photo-956724.jpeg?auto=compress&cs=tinysrgb&h=350 alt=portrait-3013924_960_720>
    </div>
    <div>
        <img src=https://images.pexels.com/photos/956724/pexels-photo-956724.jpeg?auto=compress&cs=tinysrgb&h=350 alt=portrait-3013924_960_720>
    </div>
    <div>
        <img src=https://images.pexels.com/photos/1116558/pexels-photo-1116558.jpeg?auto=compress&cs=tinysrgb&h=350 alt=portrait-3013924_960_720>
    </div>
</div>
`,
            },
          } ],
        //
        // 110 aws event-collection
        //
        __eofiles_yml_110: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}serverless.yml`
              : `serverless.yml`,
            options: {
              __eodoc: `110 serverless.yml to deploy the collect function and assign an API Gateway event trigger to it`,
              content: `
service: gallery

# The 'provider' block defines where your service will be deployed
provider:
  name: aws
  runtime: nodejs8.10

# The 'functions' block defines what code to deploy
functions:
  app:
    handler: handler.gallery
    # The 'events' block defines how to trigger the http events
    events:
        - http: ANY /
        - http: 'ANY {proxy+}'         
`,
            },
          } ],
        //
        // 120 set serverless log or version
        //
        __eoexec_logs_120: {
          resolve: doLog
            ? `serverless logs -f collect -t`
            : `serverless --version`,
          options: {
            __eodoc: `120 serverless set log`,
            __eodelay: delay,
            cwd: `${workspacePaths[0]}`,
          },
        },
        //
        // 122 set serverless
        //
        __eoexec_serverless_122: {
          resolve: `serverless`,
          options: {
            __eodoc: `122 serverless`,
            __eodelay: delay,
            cwd: `${workspacePaths[0]}`,
          },
        },
        //
        // 130 deploy
        //
        __eoexec_deploy_130: {
          resolve: `serverless deploy -v`,
          options: {
            __eodoc: `130 serverless deploy`,
            __eodelay: delay,
            cwd: `${workspacePaths[0]}`,
          },
        },

        //
        // 999 END
        //
        __eodoc_999: `
          ╭─────────────────────────────────────────────╮
          │       999 END                               │
          ╰─────────────────────────────────────────────╯`,
        __eobreak: ``,

      }
      return parcel
    }

    /**********************
      * remove__parcel
      */

    state['remove_parcel'] = function (data, __) {
      /* eslint-disable no-unused-vars */
      const { eoroot } = __
      const {eon, version, author, license, descr} = __.eonopts
      const silent = __.eonopts['silent'] ? '--silent' : ''
      const { delay = 3969 } = __.eventsopts
      /* eslint-enable no-unused-vars */

      let packages = `packages`
      let {useWorkspaces} = __.eonopts
      let {workspaces} = __

      let packagesPath = useWorkspaces ? `${packages}/` : `./`
      let workspacePaths = workspaces.map(d => useWorkspaces ? `${packagesPath}${d}/` : `./`)

      let parcel = {

        __eoexec_deploy_140: {
          resolve: `serverless remove`,
          options: {
            __eodoc: `140 serverless remove`,
            __eodelay: delay,
            cwd: `${workspacePaths[0]}`,
          },
        },
      }
      return parcel
    }

    const remove = async (data, __) => {
      data.parcelname = 'remove_parcel'
      events.eoparse(data, __)
    }

    state.events = { remove }
    // ....................... enty
    let enty = {}
    enty.getState = () => state
    return enty
  }

  exports.eonitem = eonitem
})

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
    const isWin = process.platform === 'win32'
    const isLinux = process.platform === 'linux'
    const events = require('eodoes-events')
    /* eslint-enable no-unused-vars */

    const {report} = require('eodoes-muons')

    let state = {

      helpmsg: ` 
      will create aws service

      usage:      
      > node ./scripts/run eodoes-eodo-awsbit ../eosites eoparse
`,

      eotags: {
        '--useWorkspaces': true, // use workspaces
        '--setCredentials': false, // set aws credentials
        '--isOffline': false, // https://medium.com/@kilgarenone/setting-up-serverless-2f811486573b
        '--doLog': false, // save log to file
      },

      workspaces: [
        'compiler',
        'dashboard',
      ],

    }

    /**********************
      * eoparse__parcel
      */
    state.eoparse__parcel = async function (data, __) { // _e_ async
      /* eslint-disable no-unused-vars */

      const { eoroot } = __
      const {eon, version, author, license, descr, email} = __.eonopts
      const silent = __.eonopts['silent'] ? '--silent' : '' // yarn silent
      const verbose = __.eonopts['verbose'] ? '--verbose' : '' // yarn verbose
      const { delay = 3969 } = __.eventsopts
      const {
        setCredentials, // tag: will pass credentials in the command line
        awskey, // flag: key
        awssecret, // flag: secret
        doLog,
      } = __.eonopts

      const packages = `packages`
      const {useWorkspaces} = __.eonopts
      const {workspaces} = __
      const packagesPath = useWorkspaces ? `${packages}/` : `./`
      const workspacePaths = workspaces.map(d => useWorkspaces ? `${packagesPath}${d}/` : `./`)
      report.trace({useWorkspaces, workspaces, workspacePaths}, __)

      // https://docs.aws.amazon.com/apigateway/latest/developerguide/create-api-using-awscli.html
      // https://github.com/serverless/serverless/blob/master/docs/providers/aws/events/apigateway.md
      // https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/
      // https://github.com/serverless/serverless/issues/6140

      const {exec} = require('eodoes-muons')
      let cmdid = 'aws apigateway create-rest-api --name \'serve-dynamic-html-via-http-endpoint\' --region us-east-1'

      let resid = await exec({cmd: cmdid, options: {}}, __)

      let outid = JSON.parse(resid.stdout)
      let apigatewayId = outid['id']
      let apigatewayname = outid.name

      let cmdroot = `aws apigateway get-resources --rest-api-id ${apigatewayId} --region us-east-1`
      let resroot = await exec({cmd: cmdroot, options: {}}, __)
      let outroot = JSON.parse(resroot.stdout)

      let item = outroot['items'][0]
      let apigatewayRoot = item['id']
      let apigatewayPath = item['path']

      report.trace({apigatewayname, apigatewayId, apigatewayRoot, apigatewayPath}, __)

      /* eslint-enable no-unused-vars */
      /**
       *  parcel
       */
      let parcel = { // ---------------------- parcel

        __eodoc_000: `
          ╭────────────────────────────────────────────────────────────╮
          │ 000 get the API Gateway URL                            │
          │ http://www.goingserverless.com/blog/api-gateway-url       │
          ╰────────────────────────────────────────────────────────────╯`,
        //
        // 010 refs
        //
        __eodoc_010: `       
010 
https://github.com/serverless/examples/blob/master/aws-node-serve-dynamic-html-via-http-endpoint/serverless.yml              

012 environment variables
http://www.goingserverless.com/blog/using-environment-variables-with-the-serverless-framework

014 api gateway get url endpoint
http://www.goingserverless.com/blog/api-gateway-url        
https://stackoverflow.com/questions/55542422/how-to-get-url-endpoint-detail-as-variable-in-serverless-frameworks-serverless
https://github.com/serverless/serverless/blob/master/docs/providers/aws/events/apigateway.md#share-api-gateway-and-api-resources

016 prefixes
https://medium.com/@christophe.bougere/serverless-framework-tips-and-tricks-7ee88a01c4ab

018 serverless.yml reference
https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/
`,

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
        // 024 check aws-cli installed
        //
        __eoexec_aws_024: [{
          resolve: `aws --version`,
          options: {
            __eodoc: `024 check aws-cli installed ref. https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html`,
          },
        } ],

        //
        // 026 check serverless global
        //
        __eoexec_serverless_026: [{
          resolve: `serverless --version`,
          options: {
            __eodoc: `026 check serverless global`,
          },
        } ],

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
        // 080 view aws
        //
        __eoview__080____________________: {
          resolve: `https://dashboard.serverless.com/`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════╗
            ║     080  login to serverless                 ║
            ╚═════════════════════════════════════════════╝` },
        },
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
'use strict';

module.exports.landingPage = (event, context, callback) => {
  let dynamicHtml = '<p>Hey Unknown!</p>';
  // check for GET params and use if available
  if (event.queryStringParameters && event.queryStringParameters.name) {
    dynamicHtml = \`<p>Hey \${event.queryStringParameters.name}!</p>\`;
  }

  let APIG_UID = process.env.APIG_UID
  let APIG_URL = process.env.APIG_URL
  let GW_URL = process.env.GW_URL

  const html = \`
  <html>
    <style>
      h1 { color: #73757d; }
    </style>
    <body>
      <h1>Landing Page</h1>
      - \${dynamicHtml} - UID: \${APIG_UID} - URL: \${APIG_URL} - GW_URL: \${GW_URL}
    </body>
  </html>\`;

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html,
  };

  // callback is sending HTML back
  callback(null, response);
};
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
# Serving HTML through API Gateway for AWS Lambda

service: serve-dynamic-html-via-http-endpoint
frameworkVersion: ">=1.1.0 <2.0.0"

custom:
  region: us-east-1
  stage: dev
  # env: \${file(\${self:custom.relativePathToCommon}/env.yml)}
  # prefixes: \${file(\${self:custom.relativePathToCommon}/prefixes.yml)}

  # lib/serverless/common/prefixes.yml
  # ARN prefixes can be used to simplify references to resources
  prefixes:  
    arn:
      function: arn:aws:lambda:\${self:provider.region}:\${self:provider.stage}:function
      table: arn:aws:dynamodb:\${self:provider.region}:\${self:provider.stage}:table
      bucket: 'arn:aws:s3:::'
      activity: arn:aws:states:\${self:provider.region}:\${self:provider.stage}:activity
      stateMachine: arn:aws:states:\${self:provider.region}:\${self:provider.stage}:stateMachine
      cluster: arn:aws:states:\${self:provider.region}:\${self:provider.stage}:cluster
      service: arn:aws:states:\${self:provider.region}:\${self:provider.stage}:service
      role: arn:aws:iam::\${self:provider.stage}:role
      ssm: arn:aws:ssm:\${self:provider.region}:\${self:provider.stage}:parameter/
      ssmEnv: arn:aws:ssm:\${self:provider.region}:\${self:provider.stage}:parameter/
      batch: arn:aws:batch:\${self:provider.region}:\${self:provider.stage}:/v1/
      kms: arn:aws:kms:\${self:provider.region}:\${self:provider.stage}:key/
    
    # All the resources manually named should start with this prefix
    naming: \${self:service}-\${self:provider.stage}

provider:
  name: aws
  runtime: nodejs8.10
  environment:
    GW_URL:
      Fn::Join:
        - ""
        - - "https://"
          - Ref: "ApiGatewayRestApi"
          - ".execute-api.\${self:custom.region}.amazonaws.com/\${self:custom.stage}"
  # apiGateway:
  #   restApiId: ${apigatewayId}
  #   restApiRootResourceId: ${apigatewayRoot}

functions:
  landingPage:
    handler: handler.landingPage
    environment:
      APIG_UID: !Ref "ApiGatewayRestApi"
      APIG_URL:
        !Join
          - ''
          - - 'https://'
            - !Ref ApiGatewayRestApi
            - '.execute-api.'
            - \${opt:region, self:provider.region}
            - '.amazonaws.com/'
            - \${opt:stage, self:provider.stage}
    events:
      - http:
          method: get
          path: landing-page
  
resources:
  Outputs:
    ApiUrl:
      Description: "The API Gateway URL"
      Value:
        Fn::Join:
          - ""
          - - "https://"
            - Ref: ApiGatewayRestApi
            - ".execute-api.\${self:custom.region}.amazonaws.com/\${self:custom.stage}"

    ApiGatewayRestApiId:
      Value:
        Ref: ApiGatewayRestApi
      Export:
        Name: \${self:custom.stage}-ApiGatewayRestApiId
  
    ApiGatewayRestApiRootResourceId:
      Value:
         Fn::GetAtt:
          - ApiGatewayRestApi
          - RootResourceId 
      Export:
        Name: \${self:custom.stage}-ApiGatewayRestApiRootResourceId
`,
            },
          } ],

        //
        // 130 deploy
        //
        __eoexec_deploy_130: {
          resolve: `serverless deploy -v`, // --profile [my-aws-profile]
          options: {
            __eodoc: `130 serverless deploy`,
            __eodelay: delay,
            cwd: `${workspacePaths[0]}`,
          },
        },

        //
        // 150 http
        //
        __eofiles_http_150: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}test.http`
              : `test.http`,
            options: {
              __eodoc: `150 test.http`,
              content: `
GET https://${apigatewayId}.execute-api.us-east-1.amazonaws.com/dev/landing-page/?name=_e_

###
`,
            },
          } ],
        //
        // 170 http
        //
        __eoview__170____________________: {
          resolve: `https://${apigatewayId}.execute-api.us-east-1.amazonaws.com/dev/landing-page/?name=_e_`,
          options: {
            __eodelay: delay,
            __eodoc: `170 view with html`,
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

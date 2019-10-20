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

  const events = require('eodoes-events')

  // ....................... eonitem
  async function eonitem (__eo = {}) {
    let isWin = process.platform === 'win32' // eslint-disable-line no-unused-vars
    let isLinux = process.platform === 'linux' // eslint-disable-line no-unused-vars

    const {report} = require('eodoes-muons')

    let state = {

      helpmsg: ` 
      will create serverless application

      usage:      
      > node ./scripts/run eodoes-eodo-serverless ../eosites eoparse
`,

      eotags: {
        '--useWorkspaces': true, // use workspaces
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

        __eodoc_000: `
          ╭────────────────────────────────────────────────────────────╮
          │ 000 Webinar - Getting started with the serverless framework│
          │ https://www.youtube.com/watch?v=LXB2Nv9ygQc&t=2970s        │
          ╰────────────────────────────────────────────────────────────╯`,
        //
        // 010 the event management process in aws
        //
        __eodoc_010: ``,
        //
        // 012 configruation
        //
        __eodoc_012: ``,
        //
        // 020 check node
        // https://dashboard.serverless.com/tenants/sifbuilder/applications/eoserverless/services/event-collection/stage/dev/region/us-east-1
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
            __eodoc: `024 check serverless global - using 1.48.4 down from 1.51.1`,
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
            __eodoc: `060 root manifest`,
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
'use strict'

const AWS = require('aws-sdk')

module.exports = {
  create: async(event, context) => {
    let bodyObj = {}
    try {
      bodyObj = JSON.parse(event.body)
    } catch (jsonError) {
      console.log('There was an error parsing the body', jsonError)
      return {
        statusCode: 400
      }
    }

    if (typeof bodyObj.name === 'undefined' ||
    typeof bodyObj.age === 'undefined') {
      console.log('Missing parameters')
      return {
        statusCode: 400
      }
    }

    let putParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Item: {
        name: bodyObj.name,
        age: bodyObj.age
      }
    }
    let putResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      putResult = await dynamodb.put(putParams).promise()
    } catch(putError) {
      console.log('There was a problem putting the kitten')
      console.log('putParams', putParams)
      return {
        statusCode: 500
      }
    }

    return {
      statusCode: 201
    }
  },
  list: async(event, context) => {
    let scanParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE
    }

    let scanResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      scanResult = await dynamodb.scan(scanParams).promise()
    } catch(scanError) {
      console.log('There was a problem scanning the kittens')
      console.log('scanError', scanError)
      return {
        statusCode: 500
      }
    }

    if (scanResult.Items === null ||
    !Array.isArray(scanResult.Items) ||
    scanResult.Items.length === 0) {
      return {
        statusCode: 404
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(scanResult.Items.map(kitten=> {
        return {
          name: kitten.name,
          age: kitten.age
        }
      }))
    }
  },
  get: async(event, context) => {
    let getParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name
      }
    }
    let getResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      getResult = dynamodb.get(getParams).promise()
    } catch(getError) {
      console.log('There was a problem getting the kittens')
      console.log('getError', getError)
      return {
        statusCode: 500
      }
    }

    if (getResult.Item === null ) {
      return {
        statusCode: 404
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        name: getResult.Item.name,
        age: getResult.Item.age
      })
    }
  },

  update: async(event, context) => {
    let bodyObj = {}
    try {
      bodyObj = JSON.parse(event.body)
    } catch (jsonError) {
      console.log('There was an error parsing the body', jsonError)
      return {
        statusCode: 400
      }
    }

    if (typeof bodyObj.age === 'undefined') {
      console.log('Missing parameters')
      return {
        statusCode: 400
      }
    }

    let updateParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name
      },
      UpdateExpression: 'set #age = :age',
      ExpressionAtributeName: {
        '#age': 'age'
      },
      ExpressionAttributeValues: {
        ':age': bodyObj.age
      }
    }
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      dynamodb.update(updateParams).promise()
    } catch(updateError) {
      console.log('There was a problem getting the kittens')
      console.log('updateError', updateError)
      return {
        statusCode: 500
      }
    }

    return {
      statusCode: 200
    }    
  },
  delete: async(event, context) => {
    let deleteParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name
      }
    }
    let deleteResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      deleteResult = dynamodb.delete(deleteParams).promise()
    } catch(deleteError) {
      console.log('There was a problem deleting the kittens')
      console.log('deleteError', deleteError)
      return {
        statusCode: 500
      }
    }

    return {
      statusCode: 200
    }    
  },

}
              
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
# Welcome to Serverless!
#
# This file is the main config file for your service.
# It's very minimal at this point and uses default values.
# You can always add more config options for more control.
# We've included some commented out config examples here.
# Just uncomment any of them to get that config option.
#
# For full config options, check the docs:
#    docs.serverless.com
#
# Happy Coding!

service: serverless-webinar
#app: your-app-name
#tenant: your-tenant-name

# You can pin your service to only deploy with a specific Serverless version
# Check out our docs for more details
# frameworkVersion: "=X.X.X"

provider:
  name: aws
  runtime: nodejs10.x

# you can overwrite defaults here
#  stage: dev
#  region: us-east-1

# you can add statements to the Lambda function's IAM Role here
#  iamRoleStatements:
#    - Effect: "Allow"
#      Action:
#        - "s3:ListBucket"
#      Resource: { "Fn::Join" : ["", ["arn:aws:s3:::", { "Ref" : "ServerlessDeploymentBucket" } ] ]  }
#    - Effect: "Allow"
#      Action:
#        - "s3:PutObject"
#      Resource:
#        Fn::Join:
#          - ""
#          - - "arn:aws:s3:::"
#            - "Ref" : "ServerlessDeploymentBucket"
#            - "/*"

# you can define service wide environment variables here
environment:
  DYNAMODB_KITTEN_TABLE: kittenTable
#    variable1: value1

# you can add packaging information here
#package:
#  include:
#    - include-me.js
#    - include-me-dir/**
#  exclude:
#    - exclude-me.js
#    - exclude-me-dir/**

functions:
  create:
    handler: handler.create
    events:
      - http:
          path: /v1/kitten
          method: post
  list:
    handler: handler.list
    events:
      - http:
          path: /v1/kitten
          method: get
  get:
    handler: handler.get
    events:
      - http:
          path: /v1/kitten/{name}
          method: get    
  update:
    handler: handler.update
    events:
      - http:
          path: /v1/kitten/{name}
          method: put    
  delete:
    handler: handler.delete
    events:
      - http:
          path: /v1/kitten/{name}
          method: delete    
#    The following are a few example events you can configure
#    NOTE: Please make sure to change your handler code to work with those events
#    Check the event documentation for details
#    events:
#      - http:
#          path: users/create
#          method: get
#      - websocket: $connect
#      - s3: \${env:BUCKET}
#      - schedule: rate(10 minutes)
#      - sns: greeter-topic
#      - stream: arn:aws:dynamodb:region:XXXXXX:table/foo/stream/1970-01-01T00:00:00.000
#      - alexaSkill: amzn1.ask.skill.xx-xx-xx-xx
#      - alexaSmartHome: amzn1.ask.skill.xx-xx-xx-xx
#      - iot:
#          sql: "SELECT * FROM 'some_topic'"
#      - cloudwatchEvent:
#          event:
#            source:
#              - "aws.ec2"
#            detail-type:
#              - "EC2 Instance State-change Notification"
#            detail:
#              state:
#                - pending
#      - cloudwatchLog: '/aws/lambda/hello'
#      - cognitoUserPool:
#          pool: MyUserPool
#          trigger: PreSignUp
#      - alb:
#          listenerArn: arn:aws:elasticloadbalancing:us-east-1:XXXXXX:listener/app/my-load-balancer/50dc6c495c0c9188/
#          priority: 1
#          conditions:
#            host: example.com
#            path: /hello

#    Define function environment variables here
#    environment:
#      variable2: value2

# you can add CloudFormation resource templates here
#resources:
#  Resources:
#    NewResource:
#      Type: AWS::S3::Bucket
#      Properties:
#        BucketName: my-new-bucket
#  Outputs:
#     NewOutput:
#       Description: "Description for the output"
#       Value: "Some output value"
              
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
        // 140 deploy result
        //
        __eodoc_deploy_140: ` Result example:
Service Information
service: event-collection
stage: dev
region: us-east-1
stack: event-collection-dev
resources: 11
api keys:
  None
endpoints:
  POST - https://vv5j1n6dk9.execute-api.us-east-1.amazonaws.com/dev/collect
functions:
  collect: event-collection-dev-collect
layers:
  None

Stack Outputs
CollectLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:901591727102:function:event-collection-dev-collect:8
ServiceEndpoint: https://vv5j1n6dk9.execute-api.us-east-1.amazonaws.com/dev
ServerlessDeploymentBucketName: event-collection-dev-serverlessdeploymentbucket-12k0zssen20a5
`,
        //
        // 142 http file
        //
        __eofiles_https_file_142: [ {
          resolve: useWorkspaces
            ? `${workspacePaths[0]}test.http`
            : `test.http`,
          options: {
            __eodoc: `142 test.http`,
            content: `
POST <endpoint> 

{
  "name":"Fluffykins",
  "age":4,
}
###
GET <endpoint> 


###

GET <endpoint>/Fluffykins

###

PUT <endpoint>/{name}

{
  "age":4,
}
###

DELETE <endpoint> /{name}

{

}

`,
          },
        }],

        //
        // 150 application
        //
        __eoview__150____________________: {
          resolve: `https://dashboard.serverless.com/tenants/${author}/applications/serverless/services/event-collection/stage/dev/region/us-east-1`,
          options: {
            __eodelay: delay,
            __eodoc: `
            ╔═════════════════════════════════════════════════════════╗
            ║     150  application publishes to Serverless Dashboard  ║
            ╚═════════════════════════════════════════════════════════╝` },
        },
        //
        // 200 dashboard pageview
        //
        __eofiles_yml_200: [
          {
            resolve: `${workspacePaths[1]}PageView`,
            options: {
              __eodoc: `200 serverless.yml to deploy the collect function and assign an API Gateway event trigger to it`,
              content: `
cube('PageViews', {
  sql: 'select * from aws_web_serverless.aws_web_serverless_event_collection',  // table

  measures: {
    count: {
      type: 'count'
    },

    userCount: {
      sql: 'anonymous_id',
      type: 'countDistinct',
    }
  },

  dimensions: {
    url: {
      sql: 'url',
      type: 'string'
    },

    anonymousid: {
      sql: 'anonymous_id',
      type: 'string'
    },

    eventType: {
      sql: 'event_type',
      type: 'string'
    },

    referrer: {
      sql: 'referrer',
      type: 'string'
    },

    timestamp: {
      sql: 'from_iso8601_timestamp(timestamp)',
      type: 'time'
    }
  }
});`,
            },
          } ],
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
      * awstest__parcel
      */
    state['awstest_parcel'] = function (data, __) {
      let { eoroot } = __ // eslint-disable-line no-unused-vars
      let {eon, version, author, license, descr} = __.eonopts // eslint-disable-line no-unused-vars
      let silent = __.eonopts['silent'] ? '--silent' : '' // eslint-disable-line no-unused-vars
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars

      let parcel = {

        __eoexec_deploy_140: {
          // eslint-disable-next-line no-useless-escape
          resolve: `curl https://vv5j1n6dk9.execute-api.us-east-1.amazonaws.com/dev/collect -d "{\"anonymousId\" : \"123\", \"url\" : \"-\", \"eventType\" : \"pageView\" }" `,
          options: {
            __eodoc: `140 check service`,
            __eodelay: delay,
            cwd: ``,
          },
        },
      }
      return parcel
    }

    const awstest = async (data, __) => {
      data.parcelname = 'awstest_parcel'
      events.eoparse(data, __)
    }

    state.events = { awstest }

    // ....................... enty
    let enty = {}
    enty.getState = () => state
    return enty
  }

  exports.eonitem = eonitem
})

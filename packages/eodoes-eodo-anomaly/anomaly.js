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
      will create anomaly innovations mono cloud

      usage:      
      > node ./scripts/run eodoes-eodo-anomaly ../eosites eoparse
`,

      eotags: {
        '--useWorkspaces': true, // use workspaces
        '--setCredentials': false, // set aws credentials
        '--isOffline': false, // https://medium.com/@kilgarenone/setting-up-serverless-2f811486573b
        '--doLog': false, // save log to file
      },

      workspaces: [
        'a_service',
        'b_database',
        'c_uploads',
        'd_notes',
        'e_users',
        'f_auth',
      ],

    }

    /**********************
      * eoparse__parcel
      */
    state.eoparse__parcel = function (data, __) {
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

      /* eslint-enable no-unused-vars */

      const packages = `packages`
      const {useWorkspaces} = __.eonopts
      const {workspaces} = __
      const packagesPath = useWorkspaces ? `${packages}/` : `./`
      const workspacePaths = workspaces.map(d => useWorkspaces ? `${packagesPath}${d}/` : `./`)
      report.trace({useWorkspaces, workspaces, workspacePaths}, __)

      /**
       *  parcel
       */
      let parcel = { // ---------------------- parcel

        __eodoc_000: `
          ╭────────────────────────────────────────────────────────────╮
          │ 000 anomaly innovations                                    │
          │ https://github.com/AnomalyInnovations/serverless-stack-demo-mono-api/tree/master/services       │
          │ https://anoma.ly/                                          │
          │ https://seed.run/docs/deploying-monorepo-apps              │
          ╰────────────────────────────────────────────────────────────╯`,
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
              scripts: {
                deploy: 'serverless deploy -v',
                remove: 'serverless remove',
              },
              workspaces: useWorkspaces
                ? [ `${packagesPath}*` ]
                : [],
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
        // 080 create aws 'event-collection' service from node template
        //
        __eofiles_handler_080: [
          {
            resolve: `.gitignore`,
            options: {
              __eodoc: `080 gitignore`,
              content: `
# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules

# Serverless
.webpack
.serverless

# env
env.yml
.env
`,
            },
          } ],
        //
        // 090 package.json service
        //
        __eofiles_workspace_090: [{
          resolve: useWorkspaces
            ? `${workspacePaths[0]}package.json`
            : `package.json`,
          options: {
            __eodoc: `090 manifest`,
            content: {
              'name': useWorkspaces
                ? `${workspaces[0]}`
                : `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: false,
              scripts: {
                'deploy': 'serverless deploy -v',
                'remove': 'serverless remove',
              },
              'dependencies': {
                'serverless': '*',
                'aws-sdk': '*',
              },

            },
          },
        } ],
        //
        // 092 serverless service
        //
        __eofiles_serverless_092: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}serverless.yml`
              : `serverless.yml`,
            options: {
              __eodoc: `092 auth serverless.yml`,
              content: `
service: notes-app-mono-service

custom:
  stage: \${opt:stage, self:provider.stage}

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: us-east-1
`,
            },
          } ],
        //
        // 094 handler service
        //
        __eofiles_handler_094: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}handler.js`
              : `handler.js`,
            options: {
              __eodoc: `094 auth handler.js`,
              content: ``,
            },
          } ],

        //
        // 100 package.json database
        //
        __eofiles_workspace_100: [{
          resolve: useWorkspaces
            ? `${workspacePaths[1]}package.json`
            : `package.json`,
          options: {
            __eodoc: `100 manifest`,
            content: {
              'name': useWorkspaces
                ? `${workspaces[1]}`
                : `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: false,
              scripts: {
                'deploy': 'serverless deploy -v',
                'remove': 'serverless remove',
              },
              'dependencies': {
                'serverless': '*',
                'aws-sdk': '*',
              },

            },
          },
        } ],
        //
        // 110 serverless database
        //
        __eofiles_serverless_110: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[1]}serverless.yml`
              : `serverless.yml`,
            options: {
              __eodoc: `110    database     serverless.yml`,
              content: `
service: notes-app-mono-database

custom:
  # Our stage is based on what is passed in when running serverless
  # commands. Or fallsback to what we have set in the provider section.
  stage: \${opt:stage, self:provider.stage}
  # Set the table name here so we can use it while testing locally
  tableName: \${self:custom.stage}-mono-notes
  # Set our DynamoDB throughput for prod and all other non-prod stages.
  tableThroughputs:
    prod: 5
    default: 1
  tableThroughput: \${self:custom.tableThroughputs.\${self:custom.stage}, self:custom.tableThroughputs.default}

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: us-east-1
  environment:
    tableName: \${self:custom.tableName}

resources:
  Resources:
    NotesTable:
      Type: AWS::DynamoDB::Table
      Properties:
        # Generate a name based on the stage
        TableName: \${self:custom.tableName}
        AttributeDefinitions:
          - AttributeName: userId
            AttributeType: S
          - AttributeName: noteId
            AttributeType: S
        KeySchema:
          - AttributeName: userId
            KeyType: HASH
          - AttributeName: noteId
            KeyType: RANGE
        # Set the capacity based on the stage
        ProvisionedThroughput:
          ReadCapacityUnits: \${self:custom.tableThroughput}
          WriteCapacityUnits: \${self:custom.tableThroughput}

    Outputs:
      NotesTableArn:
        Value:
          Fn::GetAtt:
            - NotesTable
            - Arn
        Export:
          Name: \${self:custom.stage}-NotesTableArn              
`,
            },
          } ],

        //
        // 120 handler database
        //
        __eofiles_handler_120: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[1]}handler.js`
              : `handler.js`,
            options: {
              __eodoc: `120 database handler.js`,
              content: ``,
            },
          } ],

        //
        // 200 package.json uploads
        //
        __eofiles_workspace_200: [{
          resolve: useWorkspaces
            ? `${workspacePaths[2]}package.json`
            : `package.json`,
          options: {
            __eodoc: `200 manifest`,
            content: {
              'name': useWorkspaces
                ? `${workspaces[2]}`
                : `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: false,
              scripts: {
                'deploy': 'serverless deploy -v',
                'remove': 'serverless remove',
              },
              'dependencies': {
                'serverless': '*',
                'aws-sdk': '*',
              },

            },
          },
        } ],
        //
        // 210 serverless uploads
        //
        __eofiles_serverless_210: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[2]}serverless.yml`
              : `serverless.yml`,
            options: {
              __eodoc: `210 uploads serverless.yml`,
              content: `
service: notes-app-mono-uploads

custom:
  # Our stage is based on what is passed in when running serverless
  # commands. Or fallsback to what we have set in the provider section.
  stage: \${opt:stage, self:provider.stage}

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: us-east-1

resources:
  Resources:
    S3Bucket:
      Type: AWS::S3::Bucket
      Properties:
        # Set the CORS policy
        CorsConfiguration:
          CorsRules:
            -
              AllowedOrigins:
                - '*'
              AllowedHeaders:
                - '*'
              AllowedMethods:
                - GET
                - PUT
                - POST
                - DELETE
                - HEAD
              MaxAge: 3000

  # Print out the name of the bucket that is created
  Outputs:
    AttachmentsBucketArn:
      Value:
          Fn::GetAtt:
          - S3Bucket
          - Arn
      Export:
        Name: \${self:custom.stage}-AttachmentsBucketArn

    AttachmentsBucketName:
      Value:
        Ref: S3Bucket
      Export:
        Name: \${self:custom.stage}-AttachmentsBucket              
`,
            },
          } ],

        //
        // 220 handler
        //
        __eofiles_handler_220: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[2]}handler.js`
              : `handler.js`,
            options: {
              __eodoc: `220 uploads handler.js`,
              content: `
`,
            },
          } ],

        //
        // 300 package.json notes
        //
        __eofiles_workspace_300: [{
          resolve: useWorkspaces
            ? `${workspacePaths[3]}package.json`
            : `package.json`,
          options: {
            __eodoc: `300 manifest`,
            content: {
              'name': useWorkspaces
                ? `${workspaces[3]}`
                : `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: false,
              scripts: {
                'deploy': 'serverless deploy -v',
                'remove': 'serverless remove',
              },
              'dependencies': {
                'serverless': '*',
                'aws-sdk': '*',
              },

            },
          },
        } ],
        //
        // 310 serverless notes
        //
        __eofiles_serverless_310: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[3]}serverless.yml`
              : `serverless.yml`,
            options: {
              __eodoc: `310 notes serverless.yml`,
              content: `
service: notes-app-mono-notes

custom:
  # Our stage is based on what is passed in when running serverless
  # commands. Or fallsback to what we have set in the provider section.
  stage: \${opt:stage, self:provider.stage}

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: us-east-1

  # These environment variables are made available to our functions
  # under process.env.
  environment:
    tableName:
  #    \${file(../database/serverless.yml):custom.tableName}
      \${env:tableName}      

  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:DescribeTable
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      # Restrict our IAM role permissions to
      # the specific table for the stage
      Resource:
        - 'Fn::ImportValue': \${self:custom.stage}-NotesTableArn

functions:
  # Defines an HTTP API endpoint that calls the main function in create.js
  # - path: url path is /notes
  # - method: POST request
  # - cors: enabled CORS (Cross-Origin Resource Sharing) for browser cross
  #     domain api call
  # - authorizer: authenticate using the AWS IAM role
  get:
    # Defines an HTTP API endpoint that calls the main function in get.js
    # - path: url path is /notes/{id}
    # - method: GET request
    handler: handler.main
    events:
      - http:
          path: notes
          method: get
          cors: true
          authorizer: aws_iam

resources:
  Outputs:
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
        // 320 handler notes
        //
        __eofiles_handler_320: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[3]}handler.js`
              : `handler.js`,
            options: {
              __eodoc: `320 notes handler.js`,
              content: `
'use strict';

module.exports.main = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};              
`,
            },
          } ],

        //
        // 400 package.json users
        //
        __eofiles_workspace_400: [{
          resolve: useWorkspaces
            ? `${workspacePaths[4]}package.json`
            : `package.json`,
          options: {
            __eodoc: `400 manifest`,
            content: {
              'name': useWorkspaces
                ? `${workspaces[4]}`
                : `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: false,
              scripts: {
                'deploy': 'serverless deploy -v',
                'remove': 'serverless remove',
              },
              'dependencies': {
                'serverless': '*',
                'aws-sdk': '*',
              },

            },
          },
        } ],
        //
        // 410 handler users
        //
        __eofiles_serverless_410: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[4]}serverless.yml`
              : `serverless.yml`,
            options: {
              __eodoc: `410 users serverless.yml`,
              content: `
service: notes-app-mono-users

custom:
  # Our stage is based on what is passed in when running serverless
  # commands. Or fallsback to what we have set in the provider section.
  stage: \${opt:stage, self:provider.stage}

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: us-east-1

  apiGateway:
    restApiId:
      'Fn::ImportValue': \${self:custom.stage}-ApiGatewayRestApiId
    restApiRootResourceId:
      'Fn::ImportValue': \${self:custom.stage}-ApiGatewayRestApiRootResourceId

  # These environment variables are made available to our functions
  # under process.env.
  environment:
    tableName:
  #    \${file(../database/serverless.yml):custom.tableName}
      \${env:tableName}

  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:DescribeTable
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      # Restrict our IAM role permissions to
      # the specific table for the stage
      Resource:
        - 'Fn::ImportValue': \${self:custom.stage}-NotesTableArn

functions:
  # Defines an HTTP API endpoint that calls the main function in create.js
  # - path: url path is /users
  # - method: POST request
  # - cors: enabled CORS (Cross-Origin Resource Sharing) for browser cross
  #     domain api call
  # - authorizer: authenticate using the AWS IAM role
  get:
    # Defines an HTTP API endpoint that calls the main function in get.js
    # - path: url path is /users/{id}
    # - method: GET request
    handler: handler.main
    events:
      - http:
          path: users
          method: get
          cors: true
          authorizer: aws_iam              
`,
            },
          } ],

        //
        // 420 handler
        //
        __eofiles_handler_420: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[4]}handler.js`
              : `handler.js`,
            options: {
              __eodoc: `420 users handler.js`,
              content: `
'use strict';

module.exports.main = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};              
`,
            },
          } ],

        //
        // 500 package.json auth
        //
        __eofiles_workspace_500: [{
          resolve: useWorkspaces
            ? `${workspacePaths[5]}package.json`
            : `package.json`,
          options: {
            __eodoc: `500 manifest`,
            content: {
              'name': useWorkspaces
                ? `${workspaces[5]}`
                : `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: false,
              scripts: {
                'deploy': 'serverless deploy -v',
                'remove': 'serverless remove',
              },
              'dependencies': {
                'serverless': '*',
                'aws-sdk': '*',
              },

            },
          },
        } ],
        //
        // 510 serverless
        //
        __eofiles_serverless_510: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[5]}serverless.yml`
              : `serverless.yml`,
            options: {
              __eodoc: `510 auth serverless.yml`,
              content: `
service: notes-app-mono-auth

custom:
  # Our stage is based on what is passed in when running serverless
  # commands. Or fallsback to what we have set in the provider section.
  stage: \${opt:stage, self:provider.stage}

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: us-east-1

resources:
  Resources:
    CognitoUserPool:
      Type: AWS::Cognito::UserPool
      Properties:
        # Generate a name based on the stage
        UserPoolName: \${self:custom.stage}-mono-user-pool
        # Set email as an alias
        UsernameAttributes:
          - email
        AutoVerifiedAttributes:
          - email

    CognitoUserPoolClient:
      Type: AWS::Cognito::UserPoolClient
      Properties:
        # Generate an app client name based on the stage
        ClientName: \${self:custom.stage}-mono-user-pool-client
        UserPoolId:
          Ref: CognitoUserPool
        ExplicitAuthFlows:
          - ADMIN_NO_SRP_AUTH
        GenerateSecret: false

    # The federated identity for our user pool to auth with
    CognitoIdentityPool:
      Type: AWS::Cognito::IdentityPool
      Properties:
        # Generate a name based on the stage
        IdentityPoolName: \${self:custom.stage}MonoIdentityPool
        # Don't allow unathenticated users
        AllowUnauthenticatedIdentities: false
        # Link to our User Pool
        CognitoIdentityProviders:
          - ClientId:
              Ref: CognitoUserPoolClient
            ProviderName:
              Fn::GetAtt: [ "CognitoUserPool", "ProviderName" ]
              
    # IAM roles
    CognitoIdentityPoolRoles:
      Type: AWS::Cognito::IdentityPoolRoleAttachment
      Properties:
        IdentityPoolId:
          Ref: CognitoIdentityPool
        Roles:
          authenticated:
            Fn::GetAtt: [CognitoAuthRole, Arn]
            
    # IAM role used for authenticated users
    CognitoAuthRole:
      Type: AWS::IAM::Role
      Properties:
        Path: /
        AssumeRolePolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: 'Allow'
              Principal:
                Federated: 'cognito-identity.amazonaws.com'
              Action:
                - 'sts:AssumeRoleWithWebIdentity'
              Condition:
                StringEquals:
                  'cognito-identity.amazonaws.com:aud':
                    Ref: CognitoIdentityPool
                'ForAnyValue:StringLike':
                  'cognito-identity.amazonaws.com:amr': authenticated
        Policies:
          - PolicyName: 'CognitoAuthorizedPolicy'
            PolicyDocument:
              Version: '2012-10-17'
              Statement:
                - Effect: 'Allow'
                  Action:
                    - 'mobileanalytics:PutEvents'
                    - 'cognito-sync:*'
                    - 'cognito-identity:*'
                  Resource: '*'
                
                # Allow users to invoke our API
                - Effect: 'Allow'
                  Action:
                    - 'execute-api:Invoke'
                  Resource:
                    Fn::Join:
                      - ''
                      -
                        - 'arn:aws:execute-api:'
                        - Ref: AWS::Region
                        - ':'
                        - Ref: AWS::AccountId
                        - ':'
                        - 'Fn::ImportValue': \${self:custom.stage}-ApiGatewayRestApiId
                        - '/*'
                
                # Allow users to upload attachments to their
                # folder inside our S3 bucket
                - Effect: 'Allow'
                  Action:
                    - 's3:*'
                  Resource:
                    - Fn::Join:
                      - ''
                      -
                        - 'Fn::ImportValue': \${self:custom.stage}-AttachmentsBucketArn
                        - '/private/'
                        - '$'
                        - '{cognito-identity.amazonaws.com:sub}/*'

  # Print out the Id of the User Pool and Identity Pool that are created
  Outputs:
    UserPoolId:
      Value:
        Ref: CognitoUserPool

    UserPoolClientId:
      Value:
        Ref: CognitoUserPoolClient

    IdentityPoolId:
      Value:
        Ref: CognitoIdentityPool
`,
            },
          } ],
        //
        // 520 handler
        //
        __eofiles_handler_520: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[5]}handler.js`
              : `handler.js`,
            options: {
              __eodoc: `520 auth handler.js`,
              content: ``,
            },
          } ],

        //
        // 800 deploy
        //
        __eoexec_deploy_800: {
          resolve: useWorkspaces
            ? `yarn workspaces run deploy`
            : `yarn deploy`,
          options: {
            __eodoc: `800 serverless deploy`,
            __eodelay: delay,
            cwd: ``,
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

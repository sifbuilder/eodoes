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
    /* eslint-disable no-unused-vars */
    let isWin = process.platform === 'win32'
    let isLinux = process.platform === 'linux'
    /* eslint-enable no-unused-vars */

    const {report} = require('eodoes-muons')

    let state = {

      helpmsg: ` 
      will create serverless
      https://epsagon.com/blog/build-a-serverless-app-using-amazon-athena/

      usage:      
      > node ./scripts/run eodoes-eodo-awsproducts ../eosites eoparse
`,

      eotags: {
        '--useWorkspaces': true, // use workspaces
        '--setCredentials': false, // set aws credentials
        '--isOffline': false, // https://medium.com/@kilgarenone/setting-up-serverless-2f811486573b
      },

      workspaces: [
        'compiler',
        'dashboard',
      ],

      cloudops: {
        PROVIDER: `aws`,
        SERVICE_NAME: `eoservice`,
        REGION: `us-east-1`,
        KINESIS_STREAM: 'eo-data-stream',
        S3_BUCKET_NAME: `eo-s3-bucket`,
        FIREHOSE_PREFIX: 'eoprefix/',
        FIREHOSE_TO_S3_ROLE: 'eo-firehose-to-s3-role',
        FIREHOSE_STREAM: 'eo-firehose',
        FIREHOSE_BUCKET_NAME: 'eo-firehose-bucket',
        ATHENA_BUCKET_NAME: 'eo-athena-bucket',
        DYNAMO_DB_NAME: 'eo-dynamo-db',
        FUNCTIONS: [`collect`],
      },

    }

    /**********************
      * eoparse__parcel
      */
    state.eoparse__parcel = function (data, __) {
      /* eslint-disable no-unused-vars */

      const {eoroot} = __
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

      const {
        PROVIDER,
        SERVICE_NAME,
        REGION,
        S3_BUCKET_NAME,
        KINESIS_STREAM,
        FIREHOSE_PREFIX,
        FIREHOSE_TO_S3_ROLE,
        FIREHOSE_STREAM,
        FIREHOSE_BUCKET_NAME,
        ATHENA_BUCKET_NAME,
        DYNAMO_DB_NAME,
        FUNCTIONS,
      } = __.cloudops

      /* eslint-enable no-unused-vars */
      /**
       *  parcel
       */
      let parcel = { // ---------------------- parcel

        __eofolders_root: ['.'],

        __eodoc_000: `
          ╭──────────────────────────────────────────────────────────────────────╮
          │ 000 Building a Serverless App Using Amazon Athena                    │
          │ https://epsagon.com/blog/build-a-serverless-app-using-amazon-athena/ │
          ╰──────────────────────────────────────────────────────────────────────╯`,
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
            ║     028  login to serverless                ║
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
        //
        //
        //
        //
        //
        // 100 handler
        //
        __eofiles_handler_100: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}handler.js`
              : `handler.js`,
            options: {
              __eodoc: `100 create handler.js`,
              content: `
'use strict';
const productManager = require('./productManager');
module.exports.createProduct = async (event) => {
  const product = JSON.parse(event.body);
  try {
    await productManager.saveProduct(product);
    
    return {
      statusCode: 200,
      body: 'Product was saved in the storage'
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error
    };
  }
}

module.exports.searchProductByName = async (event) => {
  const name =
  event.queryStringParameters && event.queryStringParameters.name;
  const result = await productManager.searchProductByName(name);
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
 }

 module.exports.searchProductByName = async (name) => {
  const searchQuery = "SELECT * FROM products WHERE name='"+ name +"' ";
  const queryExecutionIdSearch = await startQueryExecutionAthena(searchQuery);
  return getQueryResults(queryExecutionIdSearch);
}

async function getQueryResults(queryExecutionId) {
  var executionDone = false;
  while (!executionDone) {
      executionDone = await isExecutionDone(queryExecutionId);
      console.log('waiting...')
      sleep(2000);
  }
 
  const results = await athena.getQueryResults(queryExecutionId).promise();
  return Promise.resolve(formatResults(results));
}

async function isExecutionDone(queryExecutionId) {
  const result = await athena.getQueryExecution(queryExecutionId).promise();
  if (result.QueryExecution.Status.State === 'SUCCEEDED') {
      return Promise.resolve(true);
  } else {
      return Promise.resolve(false);
  }
}
function formatResults(results) {
  var formattedResults = [];
 
  const rows = results.ResultSet.Rows;
  rows.forEach(function(row) {         
    var value = {
          productId: row.Data[0].VarCharValue,
          name: row.Data[1].VarCharValue,
          color: row.Data[2].VarCharValue
    };
    formattedResults.push(value);
  });
 
  return formattedResults;
} 
`,
            },
          } ],
        //
        // 110 aws yml
        //
        __eofiles_yml_110: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}serverless.yml`
              : `serverless.yml`,
            options: {
              __eodoc: `110 serverless.yml to deploy service`,
              content: `
service: ${SERVICE_NAME}
custom:
  ATHENA_BUCKET_NAME: ${ATHENA_BUCKET_NAME}
  DYNAMO_DB_NAME: ${DYNAMO_DB_NAME}
  FIREHOSE_PREFIX: ${FIREHOSE_PREFIX}
  FIREHOSE_TO_S3_ROLE: ${FIREHOSE_TO_S3_ROLE}
  FIREHOSE_STREAM: ${FIREHOSE_STREAM}
  FIREHOSE_BUCKET_NAME: ${FIREHOSE_BUCKET_NAME}
  KINESIS_STREAM: ${KINESIS_STREAM}
  PROVIDER: ${PROVIDER}
  REGION: ${REGION}
  S3_BUCKET_NAME: ${S3_BUCKET_NAME}
  SERVICE_NAME: ${SERVICE_NAME}

provider:
  name: aws
  runtime: nodejs8.10
  environment: \${self:custom}
  iamRoleStatements:
    - Effect: Allow
      Action:
        - "s3:GetBucketLocation"
        - "s3:GetObject"
        - "s3:ListBucket"
        - "s3:ListBucketMultipartUploads"
        - "s3:ListMultipartUploadParts"
        - "s3:AbortMultipartUpload"
        - "s3:CreateBucket"
        - "s3:PutObject"
      Resource:
        - "arn:aws:s3:::\${self:custom.S3_BUCKET_NAME}/*"
        - "arn:aws:s3:::\${self:custom.S3_BUCKET_NAME}"
        - "arn:aws:s3:::\${self:custom.ATHENA_BUCKET_NAME}"
        - "arn:aws:s3:::\${self:custom.ATHENA_BUCKET_NAME}/*"
    - Effect: "Allow"
      Action:
        - "glue:*"
      Resource:
          - "*"
    - Effect: "Allow"
      Action:
        - "athena:*"
      Resource:
        - "*"
functions:
  createProduct:
    handler: handler.createProduct
    events:
      - http:
          method: post
          path: product
  athenaInit:
    handler: athena.init
  searchProductByName:
    handler: handler.searchProductByName
    timeout: 10 # optional, in seconds, default is 6
    events:
      - http:
          method: get
          path: product    
resources:
  Resources:
    ProductS3Bucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: \${self:custom.S3_BUCKET_NAME}
    AthenaBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: \${self:custom.ATHENA_BUCKET_NAME}
`,
            },
          } ],
        //
        // 120 handler
        //
        __eofiles_component_120: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}productManager.js`
              : `ProductManager.js`,
            options: {
              __eodoc: `120 create ProductManager.js`,
              content: `
'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const uuidv1 = require('uuid/v1');
const FOLDER_NAME = 'raw';
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
module.exports.saveProduct = async product => {
    product.productId = uuidv1();
    const params = {
        Body: JSON.stringify(product),
        Bucket: S3_BUCKET_NAME,
        Key: \`\${FOLDER_NAME}/\${product.productId}\`,
        ContentType: "application/json"
    };  
    return s3.putObject(params).promise();
}

`,
            },
          } ],
        //
        //
        //
        //
        //
        //
        //
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
        // 150 application
        //
        __eoview__150____________________: {
          resolve: `https://dashboard.serverless.com/tenants/${author}/applications/awsproducts/services/event-collection/stage/dev/region/us-east-1`,
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
              __eodoc: `200 serverless.yml to deploy the ${FUNCTIONS[0]} function and assign an API Gateway event trigger to it`,
              content: `
cube('PageViews', {
  sql: 'select * from aws_web_analytics.aws_web_analytics_event_collection',  // table

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

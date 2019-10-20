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
      will create serverless

      usage:      
      > node ./scripts/run eodoes-eodo-analytics ../eosites eoparse
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
        ATHENA_BUCKET_NAME: 'eo-athena-bucket',
        DYNAMO_DB_NAME: 'eo-dynamo-db',
        FIREHOSE_PREFIX: 'eoprefix/',
        FIREHOSE_TO_S3_ROLE: 'eo-firehose-to-s3-role',
        FIREHOSE_STREAM: 'eo-firehose',
        FIREHOSE_BUCKET_NAME: 'eo-firehose-bucket',
        FUNCTIONS: [`collect`],
        KINESIS_STREAM: 'eo-data-stream',
        PROVIDER: `aws`,
        REGION: `us-east-1`,
        S3_BUCKET_NAME: `eo-s3-bucket`,
        SERVICE_NAME: `eo-service`,
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
        ATHENA_BUCKET_NAME,
        DYNAMO_DB_NAME,
        FIREHOSE_PREFIX,
        FIREHOSE_TO_S3_ROLE,
        FIREHOSE_STREAM,
        FIREHOSE_BUCKET_NAME,
        FUNCTIONS,
        KINESIS_STREAM,
        PROVIDER,
        REGION,
        S3_BUCKET_NAME,
        SERVICE_NAME,
      } = __.cloudops

      /* eslint-enable no-unused-vars */

      /**
       *  parcel
       */
      let parcel = { // ---------------------- parcel

        __eodoc_000: `
          ╭─────────────────────────────────────────────╮
          │ 000 Build a Cybersecurity Startup           │
          │ https://www.youtube.com/watch?v=BXw8vQXxvqc │
          │ https://dzone.com/articles/building-open-source-google-analytics-from-scratch │
          │ https://github.com/otofu-square/serverless-kinesis-firehose   │
          │ https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/ │
          │ https://medium.com/@christophe.bougere/serverless-framework-tips-and-tricks-7ee88a01c4ab │
          ╰─────────────────────────────────────────────╯`,
        //
        // 010 the event management process in aws
        //
        __eodoc_010: `
  an XHR request to an API Gateway is initiated in the visitor’s browser 
  the request event is then passed to Lambda where the event data is processed 
    and written to a Kinesis Data Stream 
  Kinesis Firehose uses the Kinesis Data Stream as input 
    and writes processed parquet files to S3
  Athena is used to query parquet files directly from S3
  Cube.js will generate SQL analytics queries 
    and provide an API for viewing the analytics in a browser
`,

        //
        // 012 configuration
        //
        __eodoc_012: `
Serverless needs access to the cloud provider account to create and manage resources
  https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/
Configure Serverless CLI to use the AWS Access Keys stored in AWS Profile
  serverless access https://www.youtube.com/watch?v=KngM5bfpttA
  keys: https://dashboard.serverless.com/tenants/sifbuilder/accessKeys

  https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html  
  serverless saves the aws credentials in ~/.aws/credentials
  serverless config credentials --provider aws --key key --secret secret

  https://dashboard.serverless.com/tenants/sifbuilder/applications/eoanalytics/services/event-collection/stage/dev/region/us-east-1  
  
  IAM Resources:

  Data Stream:
    kinesis stream name: event-collection
    shards: 2
    status: Active
  
  Delivery Stream:
    name: event-collection-delivery
    status: Active
    creawted: 2019-08-30T20:07+0200
    source: event-collection
    record transformation: Disabled
    destination: Amazon S3: aws-web-analytics-eoevent-collection 
  
  S3 buckets:
    name: aws-web-analytics-eoevent-collection 

  Glue Database tables:
    table: events2019 -> should be aws_web_analytics_eoevent_collection 
      "anonymousId" : "123", 
      "url" : "-", 
      "eventType" : "pageView" 
    database: aws_web_analytics
    location: s3://eoevents-collection/events2019/
    location: bucket/folder: s3://eoevents-collection/aws_web_analytics_eoevent_collection/ 
    classification: json

    CREATE EXTERNAL TABLE IF NOT EXISTS aws_web_analytics.aws_web_analytics_eoevent_collection (
      'anonymousId' int,
      'url' string,
      'eventType' string 
    )
    ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
    WITH SERDEPROPERTIES (
      'serialization.format' = '1'
    ) LOCATION 's3://eoevents-collection/'
    TBLPROPERTIES ('has_encrypted_data'='false');

    eg. dataset: s3://us-east-1.elasticmapreduce.samples/elb-access-logs/data/
     
  Glue crawlers: 
    events-crawler
    aws-web-analytics-eoevent-collection

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
        // 024 check serverless global
        //
        __eoexec_serverless_024: [{
          resolve: `serverless --version`,
          options: {
            __eodoc: `024 check serverless global - using 1.48.4 down from 1.51.1`,
          },
        } ],
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
        // 050 package.json
        //
        __eofiles_parcels_050: [{
          resolve: `package.json`,
          options: {
            __eodoc: `050 root manifest`,
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
        // serverless remove --stage dev --region us-east-1
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
              __eodoc: `100 create handler.js to write record into a Kinesis Data Stream named event-collection`,
              content: `
const AWS = require('aws-sdk')
const { promisify } = require('util')
const kinesis = new AWS.Kinesis()
const putRecord = promisify(kinesis.putRecord.bind(kinesis))

const stage = 'dev'
const streamCode = 'eo-data-stream'
const streamName = \`\${stage}-\${streamCode}\`

const response = (body, status) => {
  return {
    statusCode: status || 200,
    body: body && JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    }
  }
}
module.exports.collect = async (event, context) => { // function collect
  const body = JSON.parse(event.body)
  if (!body.anonymousId || !body.url || !body.eventType) {
    return response({
      error: 'anonymousId, url and eventType required'
    }, 400)
  }
  await putRecord({
    Data: JSON.stringify({
      anonymous_id: body.anonymousId,
      url: body.url,
      event_type: body.eventType,
      referrer: body.referrer,
      timestamp: (new Date()).toISOString(),
      source_ip: event.requestContext.identity.sourceIp,
      user_agent: event.requestContext.identity.userAgent
    }) + '\\n', // _e_ scape - add newline record separator for Athena and Kinesis Firehose
    PartitionKey: body.anonymousId,
    StreamName: \`\${streamName}\`  // service name
  })

  return response()
}
`,
            },
          } ],

        //
        // 104 rds.yml
        //
        __eofiles_policies_rds_104: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}policies/rds.yml`
              : `policies/rds.yml`,
            options: {
              __eodoc: `104 create policies/rds.yml to simplify references to resources`,
              content: `
# lib/serverless/common/policies/rds.yml
PolicyName: \${self:custom.prefixes.naming}-RdsPolicy
PolicyDocument:
  Version: '2012-10-17'
  Statement:
    - Effect: Allow
      Action:
        - ssm:GetParameter
        - ssm:GetParameters
      Resource:
        - \${self:custom.prefixes.arn.ssmEnv}rds-database
        - \${self:custom.prefixes.arn.ssmEnv}rds-host
        - \${self:custom.prefixes.arn.ssmEnv}rds-password
        - \${self:custom.prefixes.arn.ssmEnv}rds-username
        - \${self:custom.prefixes.arn.ssmEnv}rds-port
    - Effect: Allow
      Action:
        - kms:Decrypt
      Resource:
        - \${self:custom.prefixes.arn.kms}*
`,
            },
          } ],
        //
        // 106 rds.yml
        //
        __eofiles_helper_rds_106: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}serverless-helpers.js`
              : `serverless-helpers.js`,
            options: {
              __eodoc: `106 create serverless-helpers.js`,
              content: `
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const ECR_REPO_NAME = 'my-ecr-repo-name';
const DOCKER_IMAGE_NAME = 'my-docker-image-name';

/**
 * Get the URI of the last docker image in a given repository.
 * @param  {String} repoName       ECR repository name
 * @param  {String} imageTagPrefix Docker image tags (optional)
 * @param  {String} profile        AWS profile (optional)
 * @return {String}                Last image URI
 */
async function getLastImageUri(repoName, imageTagPrefix = '', profile) {
  // Make it works with AWS profiles
  if (profile) {
    AWS.CredentialProviderChain.defaultProviders = [
      () => new AWS.EnvironmentCredentials('AWS'),
      () => new AWS.EnvironmentCredentials('AMAZON'),
      () => new AWS.SharedIniFileCredentials({ profile }),
      () => {
        if (AWS.ECSCredentials.prototype.isConfiguredForEcsCredentials()) {
          return new AWS.ECSCredentials();
        }
        return new AWS.EC2MetadataCredentials();
      },
    ];
    const credentials = await new AWS.CredentialProviderChain().resolvePromise();
    AWS.config.credentials = credentials;
    return AWS;
  }
  const ecr = new AWS.ECR();

  // Get the repository uri
  const { repositories } = await ecr.describeRepositories({
    repositoryNames: [repoName],
  }).promise();
  const repositoryUri = repositories[0].repositoryUri;
  console.log('Repository uri: %s', repositoryUri);

  // List images
  let token;
  let images = [];
  do {
    const { imageDetails, nextToken } = await ecr.describeImages({
      repositoryName: repoName,
      nextToken: token,
    }).promise();
    token = nextToken;
    images = images.concat(imageDetails);
  } while (token);

  // Filter images, for this example we will simply take the first one
  // You can find a filtering by tags in the first revision of this gist:
  // https://gist.github.com/ChristopheBougere/d11ae9b11dbccfd13f4219b02bdeac6c/a36a66c8e88f700442fe4d8b15c04a45304680bb#file-serverless-helpers-js-L55
  const image = images[0];
  
  // Build the image uri
  const fullTag = image.imageTags[0] || '';
  const imageUri = \`\${repositoryUri}:\${fullTag}\`;
  console.log('Image uri: %s', imageUri);

  return imageUri;
}

/**
 * Return the last docker image URI corresponding to ECR_REPO_NAME and DOCKER_IMAGE_NAME
 * @param  {Object} serverless Serverless object
 * @return {String}            Last image URI
 */
async function getDockerImageUri(serverless) {
  return getLastImageUri(ECR_REPO_NAME, DOCKER_IMAGE_NAME, serverless.providers.aws.options['aws-profile']);
}

/**
 * Generate an AMI name composed of the date and the repo name
 * @return {String} AMI name
 */
function getAMIName() {
  return \`ecs-\${ECR_REPO_NAME}-\${new Date().toISOString().replace(/-/g, '').substring(0, 8)}\`;
}

/**
 * Return the content of the \`userData.sh\` file
 * @return {String} The user data code
 */
async function getUserDataCode() {
  const content = await fs.readFileSync(path.join(__dirname, 'userData.sh'), 'utf8');
  return content.toString();
}

module.exports = {
  getDockerImageUri,
  getAMIName,
  getUserDataCode,
};
`,
            },
          } ],

        //
        // 110 aws eoevent-collection
        //
        __eofiles_yml_110: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}serverless.yml`
              : `serverless.yml`,
            options: {
              __eodoc: `110 serverless.yml to deploy the ${FUNCTIONS[0]} function and assign an API Gateway event trigger to it`,
              content: `
# org: sifbuilder
app: eolan
service: ${SERVICE_NAME}

package:
 individually: false

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

  relativePathToCommon: '.'
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
  name: ${PROVIDER}
  runtime: nodejs8.10
  region: ${REGION}
  stage: dev
 
functions:
  collect:
    handler: handler.collect
    environment:
      STAGE: \${self:provider.stage}
    events:
      - http:
          path: collect
          method: post
          cors: true

resources:
  # Outputs:
  #   # Don't forget to export output values, and prefix them with \${self:custom.prefixes.naming}

  Resources:
    # Define here any CloudFormation resources
    # To uncomment only when using RDS
    # LambdaSecurityGroup: \${file(\${self:custom.relativePathToCommon}/lambda-security-group.yml)}
    FirehoseToS3Role:
      Type: AWS::IAM::Role
      Properties:
        RoleName: FirehoseToS3Role
        AssumeRolePolicyDocument:
          Statement:
          - Effect: Allow
            Principal:
              Service:
              - firehose.amazonaws.com
            Action:
            - sts:AssumeRole
        Policies:
        - PolicyName: FirehoseToS3Policy
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                - s3:AbortMultipartUpload
                - s3:GetBucketLocation
                - s3:GetObject
                - s3:ListBucket
                - s3:ListBucketMultipartUploads
                - s3:PutObject
                Resource: '*'    
    LambdaRole:
      Type: 'AWS::IAM::Role'
      Properties:
        RoleName: \${self:custom.prefixes.naming}-LambdaRole
        AssumeRolePolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Principal:
                Service:
                  - lambda.amazonaws.com
              Action: sts:AssumeRole
        ManagedPolicyArns:
          - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole # For CloudWatch
          - arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole # For RDS
        Policies:
          - \${file(\${self:custom.relativePathToCommon}/policies/rds.yml)}    
    Eodatastream:
      Type: AWS::Kinesis::Stream
      Properties:
        Name: \${self:provider.stage}-\${self:custom.KINESIS_STREAM}
        ShardCount: 1 
    
    Eoathenabucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: \${self:provider.stage}-\${self:custom.ATHENA_BUCKET_NAME}

    Eofirehosebucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: \${self:provider.stage}-\${self:custom.FIREHOSE_BUCKET_NAME}
        
    ServerlessKinesisFirehose:
      Type: AWS::KinesisFirehose::DeliveryStream
      Properties:
        DeliveryStreamName: \${self:provider.stage}-\${self:custom.FIREHOSE_BUCKET_NAME}
        S3DestinationConfiguration:
          BucketARN:
            Fn::Join:
            - ''
            - - 'arn:aws:s3:::'
              - Ref: Eofirehosebucket
          BufferingHints:
            IntervalInSeconds: "60"
            SizeInMBs: "1"
          CompressionFormat: "UNCOMPRESSED"
          Prefix: \${self:custom.FIREHOSE_PREFIX}
          RoleARN: { Fn::GetAtt: [ FirehoseToS3Role, Arn ] }
`,
            },
          } ],
        //
        //
        //
        // 130 deploy
        //
        __eoexec_deploy_130: {
          resolve: `serverless deploy -v`,
          options: {
            __eodoc: `130 serverless deploy -v`,
            __eodelay: delay,
            cwd: `${workspacePaths[0]}`,
          },
        },

        //
        // 200 dashboard pageview
        //
        __e__ofiles_yml_200: [
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
      * remove_parcel
      */
    state['remove_parcel'] = function (data, __) {
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

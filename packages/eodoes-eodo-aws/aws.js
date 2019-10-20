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
    const os = require('os')
    const {report} = require('eodoes-muons')
    const {wstree} = require('eodoes-muons')
    const { filer } = require('eodoes-muons')

    let isWin = process.platform === 'win32'
    let isLinux = process.platform === 'linux'
    /* eslint-enable no-unused-vars */

    let state = {

      helpmsg: ` 
      will aws

      usage:      
      > node ./scripts/run ./aws ../eosites eoparse --doc
      > node ./scripts/run eodoes-eodo-aws ../eosites eoparse --doc
      > node ./scripts/run eodoes-eodo-aws ../../.. eoparse --eon e --doc

      refs:
        https://www.youtube.com/watch?v=8LfzayKQ3oo
        https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
        https://docs.aws.amazon.com/cli/latest/reference/ec2/index.html#cli-aws-ec2
        https://docs.aws.amazon.com/systems-manager/latest/userguide/walkthrough-cli.html ssm 
        https://docs.aws.amazon.com/cli/latest/reference/ssm/send-command.html ssm send command
        https://www.youtube.com/watch?v=vP56l7qThNs wait until running
        https://www.youtube.com/watch?v=pK-LYoRwp-k jupyter
        https://www.youtube.com/watch?v=Oy4A6Pd5XzE tensorflow
`,

      eotags: {
        '--aws': 'aws1',
        '--terminate': false, // terminate instance
        '--describe': false, // describe instance
        '--restart': false, // restart instance
      },

      localwd: '~/data',

      aws1: {
        projectId: '',
        projectName: '',
        tagInstanceName: 'eo0401',
        tagVolumeName: 'eo0401v',
        regionName: 'eu-west-1', // --region eu-west-1
        amiName: 'Deep Learning AMI (Ubuntu) Version 24.2', // ami-0bde317a9562f3991
        instanceType: 't2.micro',
        keyPairname: 'eoaws',
        securityGroupName: 'eogroup',
      },
    }

    /**********************
      * eoparse__parcel
      */
    state[`eoparse__parcel`] = function (data, __) {
      /* eslint-disable no-unused-vars */
      let { eoroot, helpmsg } = __

      let {eon, version, author, license, descr, email} = __.eonopts
      let { delay = 3969 } = __.eventsopts

      let { regionName,
        instanceType, keyPairname, amiName,
        tagInstanceName, tagVolumeName, securityGroupName } = __.aws1

      let {
        useWorkspaces,
        packages,
        starter,
        themes,
        packagesPath,
        starterPath,
        themePaths,
      } = wstree(data, __)

      let homedir = os.homedir()
      let arch = os.arch()
      let platform = os.platform()
      let release = os.release()
      let tmpdir = os.tmpdir()

      let terminate = __.eonopts['terminate'] ? 1 : 0
      let describe = __.eonopts['describe'] ? 1 : 0
      let restart = __.eonopts['restart'] ? 1 : 0

      /* eslint-enable no-unused-vars */
      report.trace({useWorkspaces, packages, starter,
        themes, packagesPath, starterPath, themePaths}, __)

      let parcel = {},
        parcel_aws = {}

      /*****************************************
       *
       *
       *
       *   parcel_aws AWS
       *
       *
       *
       */
      parcel_aws = { // ---------------------- parcel

        __eodoc_000: `
      ╭─────────────────────────────────────────────╮
      │  000  config aws                           │
      ╰─────────────────────────────────────────────╯`,

        // +-------------------------
        //
        //
        //
        //    060 user.sh - show user, account
        //
        //
        //
        //
        __eofiles_user_060: [{
          resolve: `user.sh`,
          options: {
            __eodoc: `060 user.sh - show user, account`,
            content: `
#!/usr/bin/env bash

echo
echo "get user"
echo
USER=$(aws sts get-caller-identity \
  --region ${regionName} \
  --query "UserId" \
  --output text)
echo "user: $USER"

echo
echo "get Account"
echo
ACCOUNT=$(aws sts get-caller-identity \
  --region ${regionName} \
  --query "Account" \
  --output text)
echo "account: $ACCOUNT"

  `},

        }],
        // +-------------------------
        //
        //
        //
        //    080 create.sh - create new instance
        //
        //
        //
        //

        __eofiles_create_080: [{
          resolve: `create.sh`,
          options: {
            __eodoc: `080 create.sh - create new instance`,
            content: `
#!/usr/bin/env bash



# aws ec2 describe-images --region eu-west-1 
# --owners amazon 
# --filters "Name=platform,Values=windows" "Name=root-device-type,Values=ebs"                      
# aws ec2 describe-images --image-ids ami-0bde317a9562f3991 --region eu-west-1 

echo
echo "get security group id of group ${securityGroupName}"
echo
GROUPID=$(aws ec2 describe-security-groups \
  --region ${regionName} \
  --filters "Name=group-name,Values=${securityGroupName}" \
  --query "SecurityGroups[0].GroupId" \
  --output text)
if [ -z $GROUPID ]; then 
  echo "group not found, create group"
  aws ec2 create-security-group --region ${regionName}  \
    --group-name eogroup   \
    --description "security group"

  AWSIP=$(curl https://checkip.amazonaws.com)
  echo "AWSIP: $AWSIP"
  
  aws ec2 authorize-security-group-ingress \
    --region ${regionName} \
    --group-name eogroup  \
    --protocol tcp --port 22 --cidr \${AWSIP}/24
  aws ec2 authorize-security-group-ingress \
    --region ${regionName} \
    --group-name eogroup \
    --protocol tcp --port 3389 --cidr \${AWSIP}/24
  
  aws ec2 describe-security-groups \
    --region ${regionName} \
    --filters "Name=group-name,Values=${securityGroupName}" \
    --group-names ${securityGroupName}  
else
  echo "group found with id: $GROUPID"
fi

echo
echo "list instances with name ..."
echo
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[].Instances[].InstanceId \
  --output text
VAR_05=$(aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[*].InstanceId \
  --output text)
if [ -z $VAR_05 ]; then 
  echo "instance not found"
else
  echo "instance found"
fi
  
echo 
echo "list image with name ... ${amiName}"
echo
IMAGEID=$(aws ec2 describe-images --region eu-west-1  \
  --filter \
    Name=owner-alias,Values=amazon \
    Name=name,Values="${amiName}*" \
    Name=architecture,Values=x86_64 \
    Name=virtualization-type,Values=hvm \
    Name=root-device-type,Values=ebs \
    Name=block-device-mapping.volume-type,Values=gp2 \
  --query "reverse(sort_by(Images, &CreationDate))[*].[ImageId]" \
  --output text)
echo "IMAGEID: $IMAGEID"


echo 
echo "create instance (ifn) with tag ..."
echo
if [ -z $VAR_05 ]; then 
  echo "instance not found, run instance"  
  aws ec2 run-instances --image-id \${IMAGEID} --count 1 \
    --instance-type ${instanceType} \
    --key-name ${keyPairname} \
    --security-group-ids $GROUPID \
    --region ${regionName} \
    --tag-specifications \
      'ResourceType=instance,Tags=[{Key=Name,Value=${tagInstanceName}}]' \
      'ResourceType=volume,Tags=[{Key=Name,Value=${tagVolumeName}}]'    
else
  echo "instances found: $VAR_05"
fi

echo 
echo "list instance with tag ..."
echo
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[].Instances[].InstanceId \
  --output text
VAR_20=$(aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[].Instances[].InstanceId \
  --output text)
if [ -z "$VAR_20" ]; then 
  echo "instance not found"
else
  echo "instance ${tagInstanceName} found: $VAR_20"
fi
echo
INSTANCEID=$VAR_20
echo "instance ID :: $INSTANCEID"
echo


`},
        }],

        // +-------------------------
        //
        //
        //
        //    090 start.sh - start instance
        //
        //
        //
        //
        __eofiles_start_090: [{
          resolve: `start.sh`,
          options: {
            __eodoc: `090 start.sh - start instance`,
            content: `
#!/usr/bin/env bash

echo 
echo "get instance with name ..."
echo 
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[*].Instances[0].InstanceId \
  --output text
VAR_40=$(aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[*].Instances[0].InstanceId \
  --output text)
echo "instances with tag name ${tagInstanceName}: $VAR_40" 

echo 
echo "start instance ..."
echo 
if [ -z "$VAR_40" ]; then 
  echo "instance not found, do nothing"
else
  echo "start instance: $VAR_40"
  aws ec2 start-instances --region ${regionName} --instance-ids $VAR_40
fi

`},
        }],
        // +-------------------------
        //
        //
        //
        //    090 command.sh - run command
        //
        //
        //
        //
        __eofiles_command_090: [{
          resolve: `command.sh`,
          options: {
            __eodoc: `090 command.sh - run command`,
            content: `
#!/usr/bin/env bash

echo 
echo "get instance with tag ..."
echo
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[].Instances[].InstanceId \
  --output text
VAR_20=$(aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[].Instances[].InstanceId \
  --output text)
echo "instances with tag name ${tagInstanceName}: $VAR_20" 
if [ -z "$VAR_20" ]; then 
  echo "instance not found"
else
  echo "instance ${tagInstanceName} found: $VAR_20"
fi
echo
INSTANCEID=$VAR_20
echo "instance ID :: $INSTANCEID"

echo
echo "hello command ..."
echo
echo aws ssm send-command \
    --region ${regionName} \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["echo HelloWorld"] \
    --targets "Key=instanceids,Values=$INSTANCEID" \
    --comment "echo HelloWorld"
aws ssm send-command \
    --region ${regionName} \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["echo HelloWorld"] \
    --targets "Key=instanceids,Values=$INSTANCEID" \
    --comment "echo HelloWorld"

echo 
echo "ifconfig command ..."
echo
echo aws ssm send-command --region ${regionName} \
  --instance-ids $INSTANCEID \
  --document-name "AWS-RunShellScript" --comment "IP config" \
  --parameters commands=ifconfig \
  --output text
aws ssm send-command --region ${regionName} \
  --instance-ids $INSTANCEID \
  --document-name "AWS-RunShellScript" --comment "IP config" \
  --parameters commands=ifconfig \
  --output text

`},
        }],

        // +-------------------------
        //
        //
        //
        //    096 mlconfig.sh - remote IP
        //
        //
        //
        //
        __eofiles_mlconfig_096: [{
          resolve: `mlconfig.sh`,
          options: {
            __eodoc: `096 mlconfig.sh - remote IP`,
            content: `
#!/usr/bin/env bash


echo 
echo "get key from instance with name ..."
echo
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[*].KeyName \
  --output text
VAR_35=$(\
  aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[*].KeyName \
  --output text \
  )
if [ -z $VAR_35 ]; then 
  echo "data not found"
else
  echo "instance found $VAR_35"
fi
KEYNAME=$VAR_35
echo "KEYNAME: $KEYNAME"

echo 
echo "get dns from instance with name ..."
echo
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[*].Instances[*].NetworkInterfaces[0].Association.PublicDnsName \
  --output text
VAR_70=$(\
  aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[*].NetworkInterfaces[0].Association.PublicDnsName \
  --output text \
  )
 
if [ -z $VAR_70 ]; then 
  echo "data not found"
else
  echo "instance found $VAR_70"
fi
PUBLICDNS=$VAR_70
echo "public DNS: $PUBLICDNS"


`},
        }],

        // +-------------------------
        //
        //
        //
        //    120 jupyter.sh
        //
        //
        //
        //
        __eofiles_jupyter_120: [{
          resolve: `jupyter.sh`,
          options: {
            __eodoc: `120 jupyter.sh`,
            content: `
#!/usr/bin/env bash


echo 
echo "get key from instance with name ..."
echo
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[*].KeyName \
  --output text
VAR_35=$(\
  aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[*].KeyName \
  --output text \
  )
if [ -z $VAR_35 ]; then 
  echo "data not found"
else
  echo "instance found $VAR_35"
fi
KEYNAME=$VAR_35
echo "KEYNAME: $KEYNAME"

echo 
echo "get dns from instance with name ..."
echo
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[*].Instances[*].NetworkInterfaces[0].Association.PublicDnsName \
  --output text
VAR_70=$(\
  aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[*].NetworkInterfaces[0].Association.PublicDnsName \
  --output text \
  )
 
if [ -z $VAR_70 ]; then 
  echo "data not found"
else
  echo "instance found $VAR_70"
fi
PUBLICDNS=$VAR_70
echo "public DNS: $PUBLICDNS"

USERNAME=ubuntu
ssl -L localhost:8888:localhost:8888 -i ~/.ssh/${keyPairname} \${USERNAME}@\${PUBLICDNS}
source activate tensoflow_p36
jupyter notebook

# copy url to 
localhost:8888/TensorFlow/keras-tensorflow-mnist.ipynb

`},
        }],
        // +-------------------------
        //
        //
        //
        //    180 stop.sh - stop running instance
        //
        //
        //
        //
        __eofiles_stop_180: [{
          resolve: `stop.sh`,
          options: {
            __eodoc: `180 stop.sh - stop running instance`,
            content: `
#!/usr/bin/env bash

# local install python
# local install pip
# local install awscli

echo
echo "# local python"
if command -v python3 > /dev/null 2>&1; then
  python3 --version
else
  echo 'local python not found'
fi

echo
echo "# local pip"
if command -v pip > /dev/null 2>&1; then
  pip --version
else
  echo 'local pip not found'
fi

echo
echo "local aws"
if command -v aws > /dev/null 2>&1; then
  aws --version
else
  echo 'local aws not found, pip install awscli'
  pip install --upgrade --user awscli
  export PATH=/home/ec2-user/.local/bin:$PATH
  aws --version
fi

echo 
echo "check aws-cli credentials ..."
ls ~/.aws/credentials
if [ -f ~/.aws/credentials ]; then
  echo "credentials found"
else
  echo "place credentials in ~/.aws"
fi

# echo 
# echo "iam roles ..."

# echo 
# echo "iam policies ..."
# echo "PolicyName: EC2FullAccess"
# echo "PolicyType: AWS managed policy"

if [ ${describe} -eq "1" ]; then 
  echo 
  echo "instances ..."
  echo "would describe: aws ec2 describe-instances --region ${regionName}"
fi

echo 
echo "will stop instance ..."
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[*].Instances[0].InstanceId --output text
VAR_30=$(aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[0].InstanceId --output text)
echo "instances with tag name ${tagInstanceName}: $VAR_30" 
if [ -z "$VAR_30" ]; then 
  echo "instance not found, do nothing"
else
  echo "stop instance: $VAR_30"
  aws ec2 stop-instances --region ${regionName} --instance-ids $VAR_30
fi

if [ ${restart} -eq "1" ]; then 
  echo 
  echo "will start instance ..."
  echo aws ec2 describe-instances --region ${regionName} \
    --filters "Name=tag:Name,Values=${tagInstanceName}" \
    --query Reservations[*].Instances[0].InstanceId --output text
  VAR_40=$(aws ec2 describe-instances --region ${regionName} \
    --filters "Name=tag:Name,Values=${tagInstanceName}"\
    --query Reservations[*].Instances[0].InstanceId --output text)
  echo "instances with tag name ${tagInstanceName}: $VAR_40" 
  if [ -z "$VAR_40" ]; then 
    echo "instance not found, do nothing"
  else
    echo "start instance: $VAR_40"
    aws ec2 start-instances --region ${regionName} --instance-ids $VAR_40
  fi
fi


if [ ${terminate} -eq "1" ]; then 
  echo 
  echo "will terminate instance ..."
  echo aws ec2 describe-instances --region ${regionName} \
    --filters "Name=tag:Name,Values=${tagInstanceName}" \
    --query Reservations[*].Instances[0].InstanceId --output text
  VAR_50=$(aws ec2 describe-instances --region ${regionName} \
    --filters "Name=tag:Name,Values=${tagInstanceName}"\
    --query Reservations[*].Instances[0].InstanceId --output text)
  echo "instances with tag name ${tagInstanceName}: $VAR_50" 
  if [ -z "$VAR_50" ]; then 
    echo "instance not found, do nothing"
  else
    echo "terminate instance: $VAR_50"
    aws ec2 terminate-instances --region ${regionName} --instance-ids $VAR_50
  fi

  echo 
  echo "remove name tag from instance ..."
  echo aws ec2 describe-instances --region ${regionName} \
    --filters "Name=tag:Name,Values=${tagInstanceName}" \
    --query Reservations[*].Instances[0].InstanceId --output text
  VAR_50=$(aws ec2 describe-instances --region ${regionName} \
    --filters "Name=tag:Name,Values=${tagInstanceName}"\
    --query Reservations[*].Instances[0].InstanceId --output text)
  echo "instances with tag name ${tagInstanceName}: $VAR_50" 
  if [ -z "$VAR_50" ]; then 
    echo "instance not found, do nothing"
  else
    echo "delete tag name"
    aws ec2 delete-tags --region ${regionName} \
      --resources $VAR_50 \
      --tags Key=Name
  fi
fi

`},
        }],

        // +-------------------------
        //
        //
        //
        //    280 terminate.sh - terminate instances with tag name
        //
        //
        //
        //
        __eofiles_terminate_280: [{
          resolve: `terminate.sh`,
          options: {
            __eodoc: `280 terminate.sh - terminate instances with tag name`,
            content: `
#!/usr/bin/env bash

# echo
# echo "delete security group"
# echo
# aws ec2 delete-security-group --group-name my-sg

echo
echo "# local python"
if command -v python3 > /dev/null 2>&1; then
  python3 --version
else
  echo 'local python not found'
fi

echo
echo "# local pip"
if command -v pip > /dev/null 2>&1; then
  pip --version
else
  echo 'local pip not found'
fi

echo
echo "local aws"
if command -v aws > /dev/null 2>&1; then
  aws --version
else
  echo 'local aws not found, pip install awscli'
  pip install --upgrade --user awscli
  export PATH=/home/ec2-user/.local/bin:$PATH
  aws --version
fi

echo 
echo "check aws-cli credentials ..."
ls ~/.aws/credentials
if [ -f ~/.aws/credentials ]; then
  echo "credentials found"
else
  echo "place credentials in ~/.aws"
fi

# echo 
# echo "iam roles ..."

# echo 
# echo "iam policies ..."
# echo "PolicyName: EC2FullAccess"
# echo "PolicyType: AWS managed policy"

if [ ${describe} -eq "1" ]; then 
  echo 
  echo "instances ..."
  echo "would describe: aws ec2 describe-instances --region ${regionName}"
fi

echo 
echo "will terminate all instances with tag name ${tagInstanceName} ..."
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[*].Instances[0].InstanceId --output text
VAR_50=$(aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[0].InstanceId --output text)
echo "instances with tag name ${tagInstanceName}: $VAR_50" 
if [ -z "$VAR_50" ]; then 
  echo "instance not found, do nothing"
else
  echo "terminate instance: $VAR_50"
  aws ec2 terminate-instances --region ${regionName} --instance-ids $VAR_50
fi

echo 
echo "remove name tag from instance ..."
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[*].Instances[0].InstanceId --output text
VAR_50=$(aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[0].InstanceId --output text)
echo "instances with tag name ${tagInstanceName}: $VAR_50" 
if [ -z "$VAR_50" ]; then 
  echo "instance not found, do nothing"
else
  echo "delete tag name"
  aws ec2 delete-tags --region ${regionName} \
    --resources $VAR_50 \
    --tags Key=Name
fi


`},
        }],

        // +-------------------------
        //
        //
        //
        //    390 describe.sh - describe instance with tag name
        //
        //
        //
        //
        __eofiles_describe_390: [{
          resolve: `describe.sh`,
          options: {
            __eodoc: `390 describe.sh - describe instance with tag name`,
            content: `
#!/usr/bin/env bash

# local install python
# local install pip
# local install awscli

echo
echo "# local python"
if command -v python3 > /dev/null 2>&1; then
  python3 --version
else
  echo 'local python not found'
fi

echo
echo "# local pip"
if command -v pip > /dev/null 2>&1; then
  pip --version
else
  echo 'local pip not found'
fi

echo
echo "local aws"
if command -v aws > /dev/null 2>&1; then
  aws --version
else
  echo 'local aws not found, pip install awscli'
  pip install --upgrade --user awscli
  export PATH=/home/ec2-user/.local/bin:$PATH
  aws --version
fi

echo 
echo "check aws-cli credentials ..."
ls ~/.aws/credentials
if [ -f ~/.aws/credentials ]; then
  echo "credentials found"
else
  echo "place credentials in ~/.aws"
fi

# echo 
# echo "iam roles ..."

# echo 
# echo "iam policies ..."
# echo "PolicyName: EC2FullAccess"
# echo "PolicyType: AWS managed policy"

echo 
echo "describe instances ..."
echo 
echo "aws ec2 describe-instances --region ${regionName}"
aws ec2 describe-instances --region ${regionName}

echo 
echo command describe-instance-information
echo
echo aws ssm describe-instance-information --region eu-west-1 --output text \
  --query "InstanceInformationList[*]"
aws ssm describe-instance-information --region eu-west-1 --output text \
  --query "InstanceInformationList[*]"

`},
        }],

        // +-------------------------
        //
        //
        //
        //    490 list.sh: - list instances with tag name
        //
        //
        //
        //
        __eofiles_list_490: [{
          resolve: `list.sh`,
          options: {
            __eodoc: `490 list.sh: - list instances with tag name`,
            content: `
#!/usr/bin/env bash

echo 
echo "list image with name ... ${amiName}"
echo
IMAGEID=$(aws ec2 describe-images --region eu-west-1  \
  --filter \
    Name=owner-alias,Values=amazon \
    Name=name,Values="${amiName}*" \
    Name=architecture,Values=x86_64 \
    Name=virtualization-type,Values=hvm \
    Name=root-device-type,Values=ebs \
    Name=block-device-mapping.volume-type,Values=gp2 \
  --query "reverse(sort_by(Images, &CreationDate))[*].[ImageId]" \
  --output text)
echo "IMAGEID: $IMAGEID"

IMAGE=$(aws ec2 describe-images --region eu-west-1  \
  --filter \
    Name=owner-alias,Values=amazon \
    Name=name,Values="${amiName}*" \
    Name=architecture,Values=x86_64 \
    Name=virtualization-type,Values=hvm \
    Name=root-device-type,Values=ebs \
    Name=block-device-mapping.volume-type,Values=gp2 \
  --query "reverse(sort_by(Images, &CreationDate))[*].[ImageId,Name,Description]" \
  --output text)
echo "IMAGE: $IMAGE"


echo 
echo "list instance with tag ... ${tagInstanceName}"
echo
VAR_20=$(aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[].Instances[].InstanceId \
  --output text)
if [ -z "$VAR_20" ]; then 
  echo "instance not found"
else
  echo "instance ${tagInstanceName} found: $VAR_20"
fi

`},
        }],

        // 500 listall.sh
        //
        __eofiles_listall_500: [{
          resolve: `listall.sh`,
          options: {
            __eodoc: `500 listall.sh: list all `,
            content: `
#!/usr/bin/env bash

echo 
echo "list all "
echo


echo 
echo "instances:"
echo
aws ec2 describe-instances  --region ${regionName} --filter Name=instance-state-name,Values=running \
   --output table     \
   --query 'Reservations[].Instances[].{ID: InstanceId,Hostname: PublicDnsName,Name: Tags[?Key==\`Name\`].Value | [0],Type: InstanceType, Platform: Platform || \`Linux\`}'

echo 
echo "volumes:"
echo
aws ec2 describe-volumes \
  --region ${regionName} \
  --query 'Volumes[].{VolumeId: VolumeId,State: State,Size: Size,Name: Tags[0].Value,AZ: AvailabilityZone}' \
  --output table

  echo 
  echo "security groups:"
  echo
  aws ec2 --region ${regionName} \
    describe-security-groups \
    --query "SecurityGroups[].[GroupId, GroupName]" \
    --output text

echo 
echo "security rules:"
echo
aws ec2 --region ${regionName} \
  describe-security-groups \
  --query "SecurityGroups[].IpPermissions[].[FromPort,ToPort,IpProtocol,join(',',IpRanges[].CidrIp)]" \
  --group-id "$1" --output text

echo 
echo "subnets:"
echo
aws ec2 --region ${regionName} \
  describe-subnets \
  --output text
  

`},
        }],

        // +-------------------------
        //
        //
        //
        //    590 connect.sh - connect to instance with tag name
        //
        //
        //
        //
        __eofiles_connect_590: [{
          resolve: `connect.sh`,
          options: {
            __eodoc: `590 connect.sh - connect to instance with tag name`,
            content: `
#!/usr/bin/env bash
# In a terminal window, use the ssh command to connect to the instance. 
# You specify the private key (.pem) file, the user name for your AMI, 
# and the public DNS name for your instance. For example, if you used Amazon Linux 2 or the Amazon Linux AMI, the user name is ec2-user. For more information about finding the user name for an AMI and the DNS name for an instance, see Get Information About Your Instance.
# ssh -i /path/my-key-pair.pem ec2-user@ec2-198-51-100-1.compute-1.amazonaws.com


echo 
echo "connect to instance with tag ..."
echo

echo 
echo "get key from instance with name ..."
echo
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[*].KeyName \
  --output text
VAR_35=$(\
  aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[*].KeyName \
  --output text \
  )
if [ -z $VAR_35 ]; then 
  echo "data not found"
else
  echo "instance found $VAR_35"
fi
KEYNAME=$VAR_35
echo "KEYNAME: $KEYNAME"

echo 
echo "get dns from instance with name ..."
echo
echo aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}" \
  --query Reservations[*].Instances[*].NetworkInterfaces[0].Association.PublicDnsName \
  --output text
VAR_70=$(\
  aws ec2 describe-instances --region ${regionName} \
  --filters "Name=tag:Name,Values=${tagInstanceName}"\
  --query Reservations[*].Instances[*].NetworkInterfaces[0].Association.PublicDnsName \
  --output text \
  )
 
if [ -z $VAR_70 ]; then 
  echo "data not found"
else
  echo "instance found $VAR_70"
fi
PUBLICDNS=$VAR_70
echo "public DNS: $PUBLICDNS"

host=$PUBLICDNS
keyfile=~/.ssh/\${KEYNAME}.pem

for user in ec2-user ubuntu admin root 
do
  echo "ssh -i $keyfile $user@$host"
  if timeout 5 ssh -i $keyfile $user@$host true 2>/dev/null; then
    echo "ssh -i $keyfile $user@$host"
  fi
done


`},
        }],
        // +-------------------------
        //
        //
        //
        //    690 group.sh - security group
        //
        //
        //
        //
        __eofiles_group_690: [{
          resolve: `group.sh`,
          options: {
            __eodoc: `690 group.sh - security group`,
            content: `
#!/usr/bin/env bash
# https://docs.aws.amazon.com/cli/latest/userguide/cli-services-ec2-sg.html

echo
echo "get security group id of group ${securityGroupName}"
GROUPID=$(aws ec2 describe-security-groups \
  --region ${regionName} \
  --filters "Name=group-name,Values=${securityGroupName}" \
  --query "SecurityGroups[0].GroupId" \
  --output text)
if [ -z $GROUPID ]; then 
  echo "group not found, create group"
  aws ec2 create-security-group --region ${regionName}  \
    --group-name eogroup   \
    --description "security group"

  AWSIP=$(curl https://checkip.amazonaws.com)
  echo "AWSIP: $AWSIP"
  
  aws ec2 authorize-security-group-ingress \
    --region ${regionName} \
    --group-name eogroup  \
    --protocol tcp --port 22 --cidr \${AWSIP}/24
  aws ec2 authorize-security-group-ingress \
    --region ${regionName} \
    --group-name eogroup \
    --protocol tcp --port 3389 --cidr \${AWSIP}/24
  
  aws ec2 describe-security-groups \
    --region ${regionName} \
    --filters "Name=group-name,Values=${securityGroupName}" \
    --group-names ${securityGroupName}  
else
  echo "group found with id: $GROUPID"
fi

`},
        }],

        __eodoc_999: `
      ╭─────────────────────────────────────────────╮
      │       999 END                               │
      ╰─────────────────────────────────────────────╯`,
        __eobreak__end: `break end`,

      }

      /**
       *  parcel return
       */

      parcel = parcel_aws

      return parcel
    }

    // ....................... enty
    let enty = {}

    enty.getState = () => state

    return enty
  }

  exports.eonitem = eonitem
})

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
    const {filer} = require('eodoes-muons')

    let isWin = process.platform === 'win32'
    let isLinux = process.platform === 'linux'
    /* eslint-enable no-unused-vars */

    let state = {

      helpmsg: ` 
      will gcp

      usage:      

      > node ./scripts/run eodoes-do-gcp ../eosites eoparse --doc --gcp gcp501
      > node ./scripts/run eodoes-do-gcp ../../.. eoparse --eon e --doc
      > node ~/e/c/eodoes/scripts/run.js eodoes-do-gcp  ~/e/c/eodoes/eosites eoparse --doc --gcp gcp501
      > ~/c/e/c/eosites/eodoes-eo-gcp/info.sh

      resfs: 
      
        https://console.cloud.google.com/compute/instances?project=dulcet-aileron-253711&instancessize=50
        https://www.pugetsystems.com/labs/hpc/How-to-Install-TensorFlow-with-GPU-Support-on-Windows-10-Without-Installing-CUDA-UPDATED-1419/
        https://cloud.google.com/compute/docs/instances/connecting-advanced#thirdpartytools
        https://cloud.google.com/compute/docs/gpus/add-gpus
        https://docs.nvidia.com/deploy/cuda-compatibility/index.html#binary-compatibility__table-toolkit-driver

        https://cloud.google.com/sdk/gcloud/reference/
        https://cloud.google.com/blog/products/gcp/filtering-and-formatting-fun-with
        https://cloud.google.com/sdk/gcloud/reference/compute/instances/start
        https://cloud.google.com/sdk/gcloud/reference/compute/instances/describe
        https://cloud.google.com/compute/docs/gcloud-compute/
        https://parkmycloud.atlassian.net/wiki/spaces/PMCUG/pages/342163506/Create+Google+Cloud+Platform+GCP+Service+Account+-+Manually+Using+gcloud+CLI
        https://cloud.google.com/shell/docs/examples
        https://cloud.google.com/sdk/docs/#deb
        https://stackoverflow.com/questions/42379685/can-i-automate-google-cloud-sdk-gcloud-init-interactive-command
        https://medium.com/@pnatraj/how-to-run-gcloud-command-line-using-a-service-account-f39043d515b9
  
        https://stackoverflow.com/questions/25742867/why-is-this-gcloud-compute-copy-files-producing-an-error-message

        https://kb.netapp.com/app/answers/answer_view/a_id/1031259/~/how-to-extract-a-ssl-pem-private-key-from-a-.json-formatted-google-service        
 `,

      eotags: {
        '--gcp': 'gcp511',
        '--multizone': false,
        '--regionName': 'us-west1',
        '--zoneName': 'us-west1-a',
      },

      localwd: '~/data',
      localkd: '~/.ssh',

      gcp501: {
        projectId: 'eo0005',
        projectName: 'eo0005',
        svcAccount: 'eogcpuser',
        svcRole: 'eorole',
        instanceName: 'eo000501',
        diskName: 'eo000501disk',
        diskSize: '200GB',
        machineType: 'n1-standard-8',
        gpus: 0,
      },

      gcp511: {
        projectId: 'eo0005',
        projectName: 'eo0005',
        svcAccount: 'eogcpuser',
        svcRole: 'eorole',
        instanceName: 'eo000511',
        diskName: 'eo000511disk',
        diskSize: '200GB',
        machineType: 'n1-standard-8',
        gpus: 1,
      },

    }

    /**********************
      * eoparse__parcel
      */
    state[`eoparse__parcel`] = function (data, __) {
      /* eslint-disable no-unused-vars */
      let { eoroot, helpmsg } = __
      let eodoesdir = __dirname
      eodoesdir = filer.posixify(eodoesdir)
      eodoesdir = eodoesdir.toLowerCase()

      let {eon, version, author, license, descr, email} = __.eonopts
      let { delay = 3969 } = __.eventsopts

      let {gcp, multizone, regionName, zoneName } = __.eonopts

      let { projectId, instanceName,
        projectName, projectUser, svcNumber, machineType,
        diskSize,
        diskName, gpus,
        svcAccount, svcRole } = __[gcp] // default to gcp511

      /* eslint-enable no-unused-vars */

      let parcel = {},
        parcel_gcp = {}

      /*****************************************
       *  parcel_gcp
       */
      parcel_gcp = { // ---------------------- parcel

        __eodoc_000: `
      ╭─────────────────────────────────────────────╮
      │  000  gcp                                   │
      ╰─────────────────────────────────────────────╯`,

        // +-------------------------
        //    010 test.sh
        //
        __eofiles_test_010: [{
          resolve: `test.sh`,
          options: {
            __eodoc: `010 test.sh`,
            content: `
#!/usr/bash

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")

echo gcloud compute ssh \
  ${instanceName} \
  --project ${projectId} \
  --zone "\${GCP_ZONE}" \
  --command pwd
  
gcloud compute ssh \
  ${instanceName} \
  --project ${projectId} \
  --zone "\${GCP_ZONE}" \
  --command pwd

echo gcloud compute scp \
  ~/test.txt \
  ${instanceName}:~/data

echo gcloud compute scp \
  ${instanceName}:~/data/test.txt \
  ~/data \
  --zone "\${GCP_ZONE}"
  
echo gcloud compute ssh \
  ${instanceName} \
  --project ${projectId} \
  --zone "\${GCP_ZONE}" \
  --command "dpkg-query -W cuda"

echo gcloud compute ssh \
${instanceName} \
--project ${projectId} \
--zone "\${GCP_ZONE}" \
--command "cuda --version"

`},
        }],

        // +-------------------------
        //
        //    020 concert.py - convert key script
        //
        //
        __eofiles_concert_020: [{
          resolve: `concert.py`,
          options: {
            __eodoc: `020 concert.py - convert key script`,
            content: `
#!/usr/bin/env python

# usage: python script.py --input <input JSON filename>  --output <output PEM filename>

import json
import sys
from optparse import OptionParser

parser = OptionParser()

parser.add_option("-i", "--input", dest="input_json_filename",
                  help="Google JSON file", metavar="FILE")
parser.add_option("-o", "--output", dest="output_pem_filename",
                  help="Output PEM file", metavar="FILE")

(options, args) = parser.parse_args()

input_json_file = options.input_json_filename
output_pem_file = options.output_pem_filename

if input_json_file is None:
    parser.print_help()
    exit(1)

if output_pem_file is None:
    parser.print_help()
    exit(1)

with open(input_json_file) as infile:

    try:
        data = json.load(infile)
    except:
        print("Failed to parse '%s'" % input_json_file)
        exit(1)

    if not 'private_key' in data:
        print("Failed to find 'private_key' in json file '%s'" % input_json_file)
        exit(1)

    if not 'project_id' in data:
        print("Failed to find 'project_id' in json file '%s'" % input_json_file)
        exit(1)

    if not 'client_email' in data:
        print("Failed to find 'client_email' in json file '%s'" % input_json_file)
        exit(1)

    key = data['private_key']

    if len(key) == 0:
        print("'private_key' unexpectedly empty in json file '%s'" % input_json_file)
        exit(1)

    project_id = data['project_id']

    if len(project_id) == 0:
        print("'project_id' unexpectedly empty in json file '%s'" % input_json_file)
        exit(1)

    client_email = data['client_email']

    if len(client_email) == 0:
        print("'client_email' unexpectedly empty in json file '%s'" % input_json_file)
        exit(1)

    with open(output_pem_file, 'w') as outfile:
        outfile.write(key)

print("Project ID: %s" % project_id)
print("Client Email: %s" % client_email)
print("Successfully wrote PEM file '%s'" % output_pem_file)

exit(0)

# End of python script

`},
        }],

        // +-------------------------
        //
        //    040 iconnect.sh - ssh iconnect to compute instance
        //
        //
        __eofiles_iconnect_040: [{
          resolve: `iconnect.sh`,
          options: {
            __eodoc: `040 iconnect.sh - ssh iconnect to compute instance`,
            content: `
#!/usr/bash

PROJECT=${projectId}
INSTANCE=${instanceName}
ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")

echo "gcloud beta compute --project $PROJECT ssh --zone $ZONE $INSTANCE"
gcloud beta compute --project $PROJECT ssh --zone $ZONE $INSTANCE

`},
        }],

        // +-------------------------
        //
        //    060 storage.sh
        //
        //
        __eofiles_storage_060: [{
          resolve: `storage.sh`,
          options: {
            __eodoc: `060 storage.sh`,
            content: `
#!/usr/bin/env bash

echo 
echo "[:::::::::]   tbd STORAGE:"
echo 

# https://github.com/GoogleCloudPlatform/gcsfuse/blob/master/docs/installing.md
# https://github.com/GoogleCloudPlatform/gcsfuse/blob/master/docs/installing.md#ubuntu-and-debian-latest-releases

# gcp compute engine instance
# gcp storage bucket - will fuse to the compute engine
# $ install gcsfuse app https://youtu.be/IWw1FB7ZFd4?t=864


# 1) Add the gcsfuse distribution URL as a package source and import its public key:
export GCSFUSE_REPO=gcsfuse-\`lsb_release -c -s\`
echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | sudo tee /etc/apt/sources.list.d/gcsfuse.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

# 2) Update the list of packages available and install gcsfuse.
sudo apt-get update
sudo apt-get install gcsfuse

# 3) (Ubuntu before wily only) Add yourself to the fuse group, then log out and back in:
sudo usermod -a -G fuse $USER
exit

sudo mkdir /gcs-storage
sudo chmod 755 -R /gcs-storage
sudo gcsfuse pw-storage-filesystem /gcs-storage

mkdir cp100
cd cp100

# create a named git repository for the currently active Google Cloud Platform project.
gcloud source repos create default
gcloud source repos clone default
cd default
git pull  https://github.com/GoogleCloudPlatformTraining/cp100-bookshelf
git push origin master
cd
gsutil mb -l us-central1 gs://$DEVSHELL_PROJECT_ID
gsutil defacl ch -u AllUsers:R gs://$DEVSHELL_PROJECT_ID
gcloud container clusters create bookshelf \
  --scopes "https://www.googleapis.com/auth/userinfo.email","cloud-platform" \
  --num-nodes 2
cd ~/cp100/default/container-engine
sed -i s/your-project-id/$DEVSHELL_PROJECT_ID/ config.py
sed -i s/your-project-id/$DEVSHELL_PROJECT_ID/ bookshelf-frontend.yaml
gcloud config set container/cluster bookshelf
gcloud builds submit --tag gcr.io/$DEVSHELL_PROJECT_ID/bookshelf .
gcloud container clusters get-credentials bookshelf
kubectl apply -f bookshelf-frontend.yaml

# kubectl get pods
echo
echo Type [kubectl get pods] to get pod info
echo
# kubectl get services bookshelf-frontend
echo Type [kubectl get services bookshelf-frontend] to get frontend IP address
#update after code change
#kubectl apply -f bookshelf-frontend.yaml
#--------------
#build without config file - gcloud builds submit --tag gcr.io/$DEVSHELL_PROJECT_ID/quickstart-image .
#build with config file - gcloud builds submit --config cloudbuild.yaml .
#reapply updated image
#kubectl rolling-update bookshelf-frontend --image=gcr.io/$DEVSHELL_PROJECT_ID/bookshelf:latest
# commit changes to source repo
#git config user.name "admin"
#git config user.email "admin@professionalwirless.net"
#git add .
#git commit -m "comment"
#git push origin master


`},
        }],

        // +-------------------------
        //
        //    078 role.sh - yml role file
        //
        //
        __eofiles_role_078: [{
          resolve: `${svcRole}.yml`,
          options: {
            __eodoc: `078 ${svcRole}.yml - yml role file`,
            content: `
title: CLI Service Role
description: “CLI Service Role.”
stage: “ROLE”
includedPermissions:
— compute.autoscalers.get
— compute.autoscalers.list
— compute.autoscalers.update
— compute.instances.start
— compute.instances.startWithEncryptionKey
— compute.instances.stop
— compute.instances.get
— compute.instances.list
— compute.instanceGroupManagers.get
— compute.instanceGroupManagers.list
— compute.instanceGroupManagers.update
— compute.instanceGroupManagers.use
— compute.zones.get
— compute.zones.list
— monitoring.groups.get
— monitoring.groups.list
— monitoring.metricDescriptors.get
— monitoring.metricDescriptors.list
— monitoring.monitoredResourceDescriptors.get
— monitoring.monitoredResourceDescriptors.list
— monitoring.timeSeries.list
— resourcemanager.projects.get
` },
        } ],
        // +-------------------------
        //
        //    080 iconfig.sh - configure compute vm
        //
        //
        __eofiles_iconfig_080: [{
          resolve: `iconfig.sh`,
          options: {
            __eodoc: `080 iconfig.sh - configure compute vm`,
            content: `
#!/bin/bash

echo 
echo "[:::::::::]   GCLOUD INSTALL:"
echo 
# 
# Google Cloud SDK - configure
if command -v gcloud > /dev/null 2>&1; then
  echo "gcloud installed" 
else 
  echo "install gcloud"
  echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
  sudo apt-get install apt-transport-https ca-certificates
  curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
  sudo apt-get update && sudo apt-get install google-cloud-sdk
  sudo apt-get install google-cloud-sdk-app-engine-python
  sudo apt-get install google-cloud-sdk-app-engine-python-extras
  sudo apt-get install google-cloud-sdk-cloud-build-local
  gcloud init
fi

echo 
echo "[:::::::::]   GCLOUD VERSION:"
echo 
gcloud --version

echo 
echo "[:::::::::]   ZONE: ${zoneName}"
echo 
gcloud config set compute/zone ${zoneName}

echo 
echo "[:::::::::]   GCLOUD INFO:"
echo 
gcloud info

echo 
echo "[:::::::::]   LOGGEDIN: gcloud config list account --format 'value(core.account)'"
echo 
LOGGEDIN=$(gcloud config list account --format "value(core.account)")
if [ -z "$LOGGEDIN" ]; then 
  gcloud auth login
fi

# echo 
# echo "[:::::::::]   BILLING: gcloud alpha billing accounts list"
# echo 
# BILLINGACC=$(gcloud alpha billing accounts list --format="value(name)")
# if [ -z "$BILLINGACC" ]; then 
#   echo no billing account
# fi

echo 
echo "[:::::::::]   PROJECTS"
echo 
GCP_PROJECTS=$(gcloud projects list \
  --filter "${projectName}" \
  --format="value(name)")
GCP_PROJECT=\${GCP_PROJECTS[0]}
echo "GCP_PROJECTS: \${GCP_PROJECTS}"
echo "GCP_PROJECT: \${GCP_PROJECT}"

echo 
echo "[:::::::::]  PROJECTS:"
echo 
echo "projects:"
gcloud projects list \
  --format="value(createTime.date('%Y-%m-%d'),name,svcNumber,projectId)"

echo 
echo "[:::::::::]   PROJECT: gcloud create gcp project ${projectName}"
echo 
if [ -z "$GCP_PROJECT" ]; then 
  echo "create gcp project ${projectName}"
  gcloud projects create ${projectId} --name=${projectName}
fi   

echo 
echo "[:::::::::]   PROJECT set: gcloud config set project ${projectId}"
echo 
gcloud config set project ${projectId}

echo 
echo "[:::::::::]   IAM PROJECT POLICY:"
echo 
gcloud services enable iam.googleapis.com --quiet --quiet
gcloud services enable sourcerepo.googleapis.com --quiet
gcloud services enable container.googleapis.com --quiet
gcloud services enable datastore.googleapis.com --quiet
gcloud services enable cloudbuild.googleapis.com --quiet

gcloud services enable compute.instances.create --quiet
gcloud services enable compute.firewalls.create --quiet
gcloud services enable compute.zones.list --quiet
gcloud projects get-iam-policy ${projectId}  \
  --flatten="bindings[].members" \
  --format='table(bindings.role)'

echo 
echo "[:::::::::]   PROJECT BILLING:"
echo  
$ gcloud alpha billing accounts projects link \
  ${projectId} \
  --billing-account $BILLINGACC

echo 
echo [:::::::::]   SRVACC: set
echo 
SRVACC=$(gcloud iam service-accounts list \
  --filter="${svcAccount}" \
  --format "value(email)")
echo SRVACC: $SRVACC  
if [ -z $SRVACC ]; then 
  echo "1) Create service account ${svcAccount}"
  gcloud iam service-accounts create ${svcAccount} \
    --display-name "${svcAccount}"
fi   

# https://console.cloud.google.com/iam-admin/iam?orgonly=true&project=eo0005
echo 
echo "[:::::::::]   SRVACC: get"
echo "2) List the users as emails"
echo 
SRVACC=$(gcloud iam service-accounts list \
  --filter="${svcAccount}" \
  --format "value(email)")   
echo "SRVACC: $SRVACC"

echo 
echo "[:::::::::]   IAM USER POLICY:"
echo 
gcloud iam service-accounts get-iam-policy \
  $SRVACC

echo 
echo "[:::::::::]   KEY download: for $SRVACC"
echo 
echo "3) Download the service account key"
gcloud iam service-accounts keys create \
  ~/.ssh/${svcAccount}.json \
  --iam-account $SRVACC

echo 
echo "[:::::::::]   KEY file: find ~/.ssh -regex '.*${projectId}.*.json'"
echo 
KEYPATH=$(find ~/.ssh -regex '.*${projectId}.*.json')
echo "KEYPATH: $KEYPATH"

# https://console.cloud.google.com/iam-admin/serviceaccounts
if [ -f $KEYPATH ]; then
  echo "key file found"
else
  echo "key file not found !!!"
fi

echo 
echo "[:::::::::]   create ROLE"
echo 
# https://www.youtube.com/watch?v=BpNRwpAwB8o
# https://www.youtube.com/watch?v=IWw1FB7ZFd4
gcloud iam roles create ${svcRole} \
  --project ${projectId} \
  --file ./${svcRole}.yaml

echo 
echo "[:::::::::]  associate owner  _e_ ROLE"
echo 
echo "4 Associate a ROLE"
# gcloud projects add-iam-policy-binding <PROJECT ID> --role <ROLE NAME> --member serviceAccount:<EMAIL ADDRESS>
gcloud projects add-iam-policy-binding ${projectId} \
  --role "roles/owner" \
  --member "$SRVACC"

# curl -O https://s3.amazonaws.com/parkmycloud-public/ParkMyCloud-GCP-LimitedAccessRole.yaml

echo 
echo "[:::::::::]  ACTIVATE SRVACC FOR PROJECT:"
echo 
gcloud auth activate-service-account $SRVACC \
  --key-file=$KEYPATH

echo 
echo "[:::::::::]  get service accounts SRVACCS:"
echo 
gcloud auth list

echo 
echo "[:::::::::]  get project service acc SRVACC GET:"
echo 
ACC=$(gcloud auth list --filter ${projectId} --format="value(account)")
echo "ACC: $ACC"

echo 
echo "[:::::::::]   SRVACC: config"
echo 
gcloud config set account $ACC
  
echo 
echo "[:::::::::]  FW HTTP:"
echo 
FWHTTP=$(gcloud compute firewall-rules list \
  --filter="name=default-allow-http" \
  --format=text)
if [ -z "$FWHTTP" ]; then 
  gcloud compute firewall-rules \
    default-allow-http \
    --project=${projectId} \
    --direction=INGRESS \
    --priority=1000 \
    --network=default \
    --action=ALLOW \
    --rules=tcp:80 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=http-server 
else
  echo "FW HTTP allowed"
fi
echo 
echo "[:::::::::]  FW HTTPS:"
echo 
FWHTTPS=$(gcloud compute firewall-rules list \
  --filter="name=default-allow-https" \
  --format=text)
if [ -z "$FWHTTPS" ]; then 
  gcloud compute firewall-rules create \
    default-allow-https \
    --project=${projectId} \
    --filter="name=${projectId}" \
    --direction=INGRESS \
    --priority=1000 \
    --network=default \
    --action=ALLOW \
    --rules=tcp:443 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=https-server 
else
    echo "FW HTTPS allowed"
fi

`},
        }],
        // +-------------------------
        //
        //    090 info.sh
        //
        //
        __eofiles_info_090: [{
          resolve: `info.sh`,
          options: {
            __eodoc: `090 info.sh - info of compute vm`,
            content: `
#!/bin/bash

echo 
echo "[:::::::::]   PROJECT:"
echo 
echo "project: ${projectId}"

echo 
echo "[:::::::::]   INSTANCE:"
echo 
echo "instance: ${instanceName}"

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")

echo 
echo "[:::::::::]   GCLOUD VERSION:"
echo 
gcloud --version

echo 
echo "[:::::::::]   LOGGEDIN: gcloud config list account --format 'value(core.account)'"
echo 
LOGGEDIN=$(gcloud config list account --format "value(core.account)")
echo "LOGGEDIN: $LOGGEDIN"

# echo 
# echo "[:::::::::]   BILLING: gcloud alpha billing accounts list"
# echo 
# BILLINGACC=$(gcloud alpha billing accounts list --format="value(name)")
# if [ -z "$BILLINGACC" ]; then 
#   echo no billing account
# fi

echo 
echo "[:::::::::]   PROJECTS"
echo 
GCP_PROJECTS=$(gcloud projects list \
  --filter "${projectName}" \
  --format="value(name)")
GCP_PROJECT=\${GCP_PROJECTS[0]}
echo "GCP_PROJECT: \${GCP_PROJECT}"

echo 
echo "[:::::::::]  PROJECTS:"
echo 
echo "projects:"
gcloud projects list \
  --format="value(createTime.date('%Y-%m-%d'),name,svcNumber,projectId)"

echo 
echo [:::::::::]   SRVACC:
# https://console.cloud.google.com/iam-admin/iam?orgonly=true&project=eo0005
echo 
SRVACC=$(gcloud iam service-accounts list \
  --filter="${svcAccount}" \
  --format "value(email)")
echo SRVACC: $SRVACC  

echo 
echo "[:::::::::]  service accounts:"
echo 
gcloud auth list

echo 
echo "[:::::::::]  project service acc:"
echo 
ACC=$(gcloud auth list --filter "${projectId}" --format="value(account)")
echo "ACC: $ACC"

echo 
echo "[:::::::::]   IAM USER POLICY:"
echo 
gcloud iam service-accounts get-iam-policy \
  $SRVACC

echo 
echo "[:::::::::]  service account key - 3) From Download the service account key"
echo 
echo "SRVACC: ~/.ssh/${svcAccount}.json "
  
echo 
echo "[:::::::::]   KEY file: find ~/.ssh -regex '.*${projectId}.*.json'"
echo 
KEYPATH=$(find ~/.ssh -regex '.*${projectId}.*.json')
echo "KEYPATH: $KEYPATH"
# https://console.cloud.google.com/iam-admin/serviceaccounts
if [ -f $KEYPATH ]; then
  echo "key file found"
else
  echo "key file not found !!!"
fi

echo 
echo "[:::::::::]  gcloud ssh"
echo 
echo gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "pwd"

echo 
echo "[:::::::::]  gcloud scp"
echo   
echo gcloud compute scp ~/test.txt ${instanceName}:~/data

echo 
echo "[:::::::::]  pwd"
echo 
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "pwd"

echo 
echo "[:::::::::]  python3"
echo 
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command " \
  python3 --version; \
  which pityon3
"

echo 
echo "[:::::::::]  cuda toolkit"
echo
echo "https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html"

echo 
echo "[:::::::::]  Verify a CUDA-Capable GPU"
echo
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "lspci | grep -i nvidia"

echo 
echo "[:::::::::]  Verify You Have a Supported Version of Linux"
echo
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "uname -m && cat /etc/*release"


echo 
echo "[:::::::::]  Verify the System Has gcc Installed"
echo
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "gcc --version"  
  
echo 
echo "[:::::::::]  Verify the System Has gcc Installed"
echo
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "gcc --version"  

echo 
echo "[:::::::::]  Verify the System has the Correct Kernel Headers and Development Packages Installed"
echo 
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "uname -r"
  
# Ubuntu
# The kernel headers and development packages for the currently running kernel can be installed with:
# $ sudo apt-get install linux-headers-$(uname -r)

# 2.6. Download the NVIDIA CUDA Toolkit
# The NVIDIA CUDA Toolkit is available at http://developer.nvidia.com/cuda-downloads.

# Download Verification
# The download can be verified by comparing the MD5 checksum posted at http://developer.nvidia.com/cuda-downloads/checksums with t

echo 
echo "[:::::::::]  cuda"
echo   
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "cuda --version"
  
echo 
echo "[:::::::::]  libcudnn"
echo   
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "dpkg-query -W libcudnn"

echo 
echo "[:::::::::]  anaconda3 - conda activate environment"
echo 
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
    --command "
  export PATH='/home/e/anaconda3/bin:$PATH'; \
  conda --version; \
  which conda; \
  conda info --envs;
"

echo 
echo "[:::::::::]  conda - list packages"
echo 
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
    --command "
  export PATH='/home/e/anaconda3/bin:$PATH'; \
  conda --version; \
  conda list; \
"

echo 
echo "[:::::::::]  nvidia-smi"
echo
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "nvidia-smi"

echo 
echo "[:::::::::]  tensorflow - verify"
echo 
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "export PATH='/home/e/anaconda3/bin:$PATH'; \
      python -c 'import tensorflow as tf; print(tf.__version__)'"
    
echo 
echo "[:::::::::]  tensorflow - verify"
echo 
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "export PATH='/home/e/anaconda3/bin:$PATH'; \
              conda list | grep tensorflow" 
  
echo 
echo "[:::::::::]  numpy - version"
echo 
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "export PATH='/home/e/anaconda3/bin:$PATH'; \
      python -c 'import numpy as np; print(np.version.version)'"

                
                
`},
        }],

        // +-------------------------
        //
        //    100 start.sh
        //
        //
        __eofiles_start_100: [{
          resolve: `start.sh`,
          options: {
            __eodoc: `100 start.sh: ${instanceName} with ${gpus} gpus from ${zoneName} - start compute vm`,
            content: `
#!/bin/bash

echo 
echo "[:::::::::]  INSTANCES:"
echo 
gcloud compute instances list \
  --format "value(zone.basename())"

echo 
echo "[:::::::::]  INSTANCE ${instanceName}:"
echo 
GCP_INSTANCES=$(gcloud compute instances list \
  --filter "${instanceName}" \
  --format="value(name)")
GCP_INSTANCE=\${GCP_INSTANCES[0]}

if [ -z "$GCP_INSTANCE" ]; then 
  echo "instance not found"
else
  echo "instance \${GCP_INSTANCE} found"
fi

echo 
echo [:::::::::]   SRVACC: set
echo 
SRVACC=$(gcloud iam service-accounts list \
  --filter="${svcAccount}" \
  --format "value(email)")
echo SRVACC: $SRVACC  
if [ -z $SRVACC ]; then 
  echo "1) Create service account ${svcAccount}"
  gcloud iam service-accounts create ${svcAccount} \
    --display-name "${svcAccount}"
fi   


GPUS=${gpus}
echo "GPUS: $GPUS"

echo 
echo "[:::::::::]  INSTANCE create ${machineType} ${instanceName} in zone ${zoneName} with gpus ${gpus}:"
echo 
if [ -z "$GCP_INSTANCE" ]; then 

  if [[ $GPUS == 0 ]]; then 
    echo " instance with no GPU "

    gcloud beta compute instances create ${instanceName} \
    --project=${projectId} \
    --zone=${zoneName} \
    --machine-type=${machineType} \
    --subnet=default \
    --network-tier=PREMIUM \
    --maintenance-policy=TERMINATE \
    --service-account=$SRVACC \
    --scopes=https://www.googleapis.com/auth/cloud-platform \
    --tags=http-server,https-server \
    --image=ubuntu-1804-bionic-v20190918 \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=${diskSize} --boot-disk-type=pd-standard \
    --boot-disk-device-name=${diskName} --reservation-affinity=any \
    --labels=type=eoinstance

  else
    echo " instance with ${gpus} GPUs "


MULTIZONE=${multizone}    
echo "MULTIZONE: $MULTIZONE"

    if [ $MULTIZONE = true ]; then 

      echo "multizone"

      for zone in us-central1-f us-west1-b us-central1-a us-central1-c us-central1-b us-west1-a \
        europe-west4-a europe-west4-c europe-west4-b
      do
        echo "zone: $zone"
        gcloud beta compute instances create ${instanceName} \
        --project=${projectId} \
        --zone=$zone \
        --machine-type=${machineType} \
        --subnet=default \
        --network-tier=PREMIUM \
        --maintenance-policy=TERMINATE \
        --service-account=$SRVACC \
        --scopes=https://www.googleapis.com/auth/cloud-platform \
        --accelerator=type=nvidia-tesla-v100,count=${gpus} \
        --tags=http-server,https-server \
        --image=ubuntu-1804-bionic-v20190918 \
        --image-project=ubuntu-os-cloud \
        --boot-disk-size=${diskSize} --boot-disk-type=pd-standard \
        --boot-disk-device-name=${diskName} --reservation-affinity=any \
        --labels=type=eoinstance
      done      

    else 

      echo "unizone"

      gcloud beta compute instances create ${instanceName} \
      --project=${projectId} \
      --zone=${zoneName} \
      --machine-type=${machineType} \
      --subnet=default \
      --network-tier=PREMIUM \
      --maintenance-policy=TERMINATE \
      --service-account=$SRVACC \
      --scopes=https://www.googleapis.com/auth/cloud-platform \
      --accelerator=type=nvidia-tesla-v100,count=${gpus} \
      --tags=http-server,https-server \
      --image=ubuntu-1804-bionic-v20190918 \
      --image-project=ubuntu-os-cloud \
      --boot-disk-size=${diskSize} --boot-disk-type=pd-standard \
      --boot-disk-device-name=${diskName} --reservation-affinity=any \
      --labels=type=eoinstance

    fi  
  fi
else
  echo "project ${instanceName} found"
fi 

echo 
echo "[:::::::::]  ZONE"
echo 
GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")
echo "GCP_ZONE \${GCP_ZONE}"

echo 
echo "[:::::::::]  CONFIG ZONE"
echo 
gcloud config set compute/zone $GCP_ZONE

echo 
echo "[:::::::::]  INSTANCE start"
echo 
GCP_INSTANCE=$(gcloud compute instances list --filter="${instanceName}")
if [ -z "$GCP_INSTANCE" ]; then 
  echo "could not find instance"
else
  echo "GCP_INSTANCE: \${GCP_INSTANCE}"

  gcloud compute instances describe \
  ${instanceName} \
    --format='get(networkInterfaces[0].accessConfigs[0].natIP)'

  echo 
  echo "[:::::::::]  PUBLIC NETWORK INTERFACE:"
  echo https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address
  echo 
  GCP_IP=$(gcloud compute instances list \
    --filter="name=${instanceName}" \
    --format "get(networkInterfaces[0].accessConfigs[0].natIP)")
  echo "GCP_IP \${GCP_IP}"
  if [ -z "$GCP_IP" ]; then 
    echo "public network interface not found. start instance"
    echo "gcloud compute instances start \
    ${instanceName} \
    --zone=$GCP_ZONE"
  else
    echo "public network interface found: $GCP_IP"
  fi
  
  echo 
  echo "[:::::::::]  START:"
  echo 
  gcloud compute instances start \
  ${instanceName} \
  --zone=$GCP_ZONE

fi

`},
        } ],

        // +-------------------------
        //
        //    110 stop.sh
        //
        //
        __eofiles_stop_110: [{
          resolve: `stop.sh`,
          options: {
            __eodoc: `110 stop.sh: stop instance - stop compute vm`,
            content: `
#!/usr/bin/env bash

echo 
echo "[:::::::::]  INSTANCE:"
echo 
gcloud compute instances list \
  --filter="${instanceName}"

echo 
echo "[:::::::::]  NATIP:"
echo 
GCP_IP=$(gcloud compute instances list \
  --filter="${instanceName}" \
  --format "get(networkInterfaces[0].accessConfigs[0].natIP)")
  echo "GCP_IP \${GCP_IP}"
if [ -z "$GCP_IP" ]; then 
  echo "public network interface not found. do nothing"
else
  echo "public network interface found. stop instance"

  echo 
  echo "[:::::::::]  STOP:"
  echo 

  GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
  --format "value(zone.basename())")
  echo "GCP_ZONE \${GCP_ZONE}"

  echo "# gcloud compute instances stop ${instanceName} --zone=\${GCP_ZONE}"
  gcloud compute instances stop ${instanceName} --zone=\${GCP_ZONE}
fi

`},
        } ],

        // +-------------------------
        //
        //    112 resolve.sh
        //
        //
        __eofiles_resolve_112: [{
          resolve: `resolve.sh`,
          options: {
            __eodoc: `112 resolve.sh - overwrite /etc/resolve.conf`,
            content: `
#!/bin/bash
cat /etc/resolv.conf
sudo bash -c 'echo "nameserver 8.8.8.8" > /etc/resolv.conf'
` },
        }],

        // +-------------------------
        //
        //    116 stopall.sh
        //
        //
        __eofiles_stopall_116: [{
          resolve: `stopall.sh`,
          options: {
            __eodoc: `116 stopall.sh - stop all vm`,
            content: `
#!/usr/bin/env bash

echo 
echo "[:::::::::]  INSTANCES:"
echo 
INSTANCES=$(gcloud compute instances list \
  --format "get(name)")
echo $INSTANCES

for INSTANCE in $INSTANCES
do
  echo "instance: $INSTANCE"

  GCP_ZONE=$(gcloud compute instances list --filter=$INSTANCE \
    --format "value(zone.basename())")
  echo "zone: $GCP_ZONE"

  echo "stop instance $INSTANCE in zone: $GCP_ZONE"
  gcloud compute instances stop $INSTANCE --zone=$GCP_ZONE
done
`},
        } ],

        // +-------------------------
        //
        //    118 jconnect.sh
        //
        //
        __eofiles_jconnect_118: [{
          resolve: `jconnect.sh`,
          options: {
            __eodoc: `118 jconnect.sh - start jupyter notebook in vm`,
            content: `
#!/usr/bin/env bash

# https://towardsdatascience.com/running-jupyter-notebook-in-google-cloud-platform-in-15-min-61e16da34d52

echo 
echo "[:::::::::]  INSTANCE"
echo 
GCP_INSTANCE=$(gcloud compute instances list \
  --filter="${instanceName}")
if [ -z "$GCP_INSTANCE" ]; then 
  echo "could not find instance"

else
  echo "GCP_INSTANCE: $GCP_INSTANCE"

  echo 
  echo "[:::::::::]  ZONE"
  echo 
  GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
  --format "value(zone.basename())")
  echo "GCP_ZONE \${GCP_ZONE}"
  

  # https://console.cloud.google.com/networking/addresses/list?project=${projectId}
  echo make ip static  
  echo 
  echo "[:::::::::]  PUBLIC DNS GCP_IP"
  echo 
  GCP_IP=$(gcloud compute instances list \
    --filter="name=${instanceName}" \
    --format "get(networkInterfaces[0].accessConfigs[0].natIP)")
  echo "GCP_IP \${GCP_IP}"
    
  echo 
  echo "[:::::::::]   KEY file: find ~/.ssh -regex '.*${projectId}.*.json'"
  echo 
  KEYPATH=$(find ~/.ssh -regex '.*${projectId}.*.json')
  echo "KEYPATH: $KEYPATH"
  if [ -f $KEYPATH ]; then
    echo "key file found"
  else
    echo "key file not found !!!"
    echo create pem ifn
    echo i identity_file  https://man.openbsd.org/ssh.1
    echo "python concert.py --input <input JSON filename>  --output <output PEM filename>"
    echo check keyfile permissions
    echo chmod 600 $KEYPATH  
  fi

  echo 
  echo "[:::::::::]   FIREWALL open tcp 8888"
  echo
  echo gcloud compute --project=eo0005 firewall-rules create eofwrule \
    --description="eo firewall rule" --direction=INGRESS \
    --priority=1000 --network=default --action=ALLOW \
    --rules=tcp:8888 --source-ranges=0.0.0.0/0

  echo 
  echo "[:::::::::]   KEY file: find ~/.ssh -regex '.*${projectId}.*.pem'"
  echo 
  KEYPATH=$(find ~/.ssh -regex '.*${projectId}.*.pem')
  echo "KEYPATH: $KEYPATH"
  if [ -f $KEYPATH ]; then
    echo "key file found"
  else
    echo "key file not found !!!"
  fi

  echo 
  echo "[:::::::::]  ssh -L "
  echo 
  # https://cloud.google.com/solutions/connecting-securely
  echo "$ jupyter notebook"
  echo " copy url to localhost:8888/TensorFlow/keras-tensorflow-mnist.ipynb"
  gcloud compute ssh ${instanceName}  \
  --project ${projectId} \
  --zone $GCP_ZONE \
  -- -L 8888:localhost:8888  

fi

`},

        } ],

        // +-------------------------
        //
        //    120 icuda.sh - icuda instance with cuda, nvidia-smi, libcudnn
        //
        //
        __eofiles_icuda_120: [{
          resolve: `icuda.sh`,
          options: {
            __eodoc: `120 icuda.sh - icuda instance with cuda, nvidia-smi, libcudnn`,
            content: `
#!/bin/bash

echo 
echo "[:::::::::]  PROPS"
echo 
GCP_PROJECT_NAME=${instanceName}
echo "# GCP_PROJECT_NAME \${GCP_PROJECT_NAME}"

GCP_PROJECT_ID=${projectId}
echo "# GCP_PROJECT_ID \${GCP_PROJECT_ID}"

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")
echo "GCP_ZONE \${GCP_ZONE}"

echo 
echo "[:::::::::]  LOCAL PWD"
echo 
cd ~/data
echo "local pwd: $(pwd)"

echo 
echo "[:::::::::]  gcloud PWD"
echo 
gcloud compute --project "\${GCP_PROJECT_ID}" ssh \
  --zone "\${GCP_ZONE}" \
  "\${GCP_PROJECT_NAME}" \
  --command "pwd"

echo 
echo "[:::::::::]  apt-get update"
echo   
gcloud compute --project "\${GCP_PROJECT_ID}" ssh \
  --zone "\${GCP_ZONE}" \
  "\${GCP_PROJECT_NAME}" \
  --command "sudo apt-get update"

echo 
echo "[:::::::::]  CUDA"
# wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-repo-ubuntu1804_10.0.130-1_amd64.deb
echo
# https://gist.github.com/kauffmanes/5e74916617f9993bc3479f401dfec7da
# https://jensenwaud.com/2019/01/17/installing-anaconda-on-windows-subsystem-for-linux/
# https://www.pugetsystems.com/labs/hpc/Install-TensorFlow-with-GPU-Support-on-Windows-10-without-a-full-CUDA-install-1172/        
gcloud compute --project "\${GCP_PROJECT_ID}" ssh \
  --zone "\${GCP_ZONE}" \
  "\${GCP_PROJECT_NAME}" \
  --command "if ! dpkg-query -W cuda ; \
    then \
      echo Add Nvidia repositories \
      sudo apt-key adv --fetch-keys http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub; \
      curl -O https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-repo-ubuntu1804_10.1.243-1_amd64.deb; \
      sudo dpkg -i cuda-repo-ubuntu1804_10.1.243-1_amd64.deb; \
      sudo apt-get update; \
      sudo apt-get install cuda-10-1; \
      sudo nvidia-smi -pm 1; \
      apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub \
      apt-get update \
      wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb \
      dpkg -i nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb \
      apt-get update \
    fi"

echo 
echo "[:::::::::]  Set sticky path defaults"
echo    
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
  --command "export CUDA_HOME=/usr/local/cuda >> ~/.bashrc;"    
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
  --command "export PATH=$PATH:$CUDA_HOME/bin >> ~/.bashrc;"    
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
  --command "export LD_LIBRARY_PATH=/usr/local/cuda/extras/CUPTI/lib64:$LD_LIBRARY_PATH >> ~/.bashrc;"

echo 
echo "[:::::::::]  nvidia-smi"
echo
gcloud compute --project "\${GCP_PROJECT_ID}" ssh \
  --zone "\${GCP_ZONE}" \
  "\${GCP_PROJECT_NAME}" \
  --command "nvidia-smi"

echo   
echo "[:::::::::]  libcudnn"

# # Install drivers, CUDA and cuDNN
# apt-get -y install --no-install-recommends nvidia-driver-418
# apt-get -y install --no-install-recommends cuda-10-0 libcudnn7=*+cuda10.0 
# libcudnn7-dev=*+cuda10.0
# apt-get -y install --no-install-recommends libnvinfer5=5.*+cuda10.0 
# libnvinfer-dev=5.*+cuda10.0

echo
gcloud compute --project "\${GCP_PROJECT_ID}" ssh \
  --zone "\${GCP_ZONE}" \
  "\${GCP_PROJECT_NAME}" \
  --command "if ! dpkg-query -W libcudnn ; \
    then \
      curl -O https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/libcudnn7_7.6.4.38-1+cuda10.1_amd64.deb; \
      sudo dpkg -i libcudnn7_7.6.4.38-1+cuda10.1_amd64.deb; \
    fi"  

`},
        } ],

        // +-------------------------
        //
        //    122 wcuda.sh - wcuda instance with cuda, nvidia-smi, libcudnn
        //
        //
        __eofiles_wcuda_122: [{
          resolve: `wcuda.sh`,
          options: {
            __eodoc: `122 wcuda.sh - wcuda instance with cuda, nvidia-smi, libcudnn`,
            content: `
#!/bin/bash

echo 
echo "[:::::::::]  LOCAL PWD"
echo 
cd ~/data
echo "local pwd: $(pwd)"

export PATH="$HOME/anaconda3/bin:$PATH";

echo 
echo "[:::::::::]  CURL"
echo
if dpkg-query -W curl ; then
  echo "curl installed"
else
  echo "install curl"
  sudo dpkg -i curl
fi

echo 
echo "[:::::::::]  GIT"
echo
if dpkg-query -W git ; then
  echo "git installed"
else
  echo "install git"
  sudo dpkg -i git
fi

echo 
echo "[:::::::::]  conda"
echo
conda --version

echo 
echo "[:::::::::]  tensorflow"
echo
TFVER=$(python -c 'import tensorflow as tf; print(tf.__version__)')
echo "tensorflow: $TFVER"
if [ "$TFVER" == "1.14.0" ] ; then
  echo "tensorflow $TFVER installed"
else
  echo "install tensorflow"
  conda install -c anaconda tensorflow-gpu
  TFVER=$(python -c 'import tensorflow as tf; print(tf.__version__)')
  echo "tensorflow: $TFVER"  
fi

echo 
echo "[:::::::::]  CUDA"
echo
if dpkg-query -W cuda-10* ; then
  echo "cuda 10 installed"
else
  echo "intall cuda"
  echo "Add Nvidia repositories"
  sudo apt-key adv --fetch-keys http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub;
  curl -O https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-repo-ubuntu1804_10.1.243-1_amd64.deb;
  sudo dpkg -i cuda-repo-ubuntu1804_10.1.243-1_amd64.deb;
  sudo apt-get install cuda-10-1;
  sudo nvidia-smi -pm 1;
  apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub
  wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
  dpkg -i nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
fi

echo 
echo "[:::::::::]  Would sticky path defaults"
echo    
echo export CUDA_HOME=/usr/local/cuda >> ~/.bashrc;
echo export PATH=$PATH:$CUDA_HOME/bin >> ~/.bashrc;
echo export LD_LIBRARY_PATH=/usr/local/cuda/extras/CUPTI/lib64:$LD_LIBRARY_PATH >> ~/.bashrc;

echo 
echo "[:::::::::]  nvidia-smi"
echo
if command -v nvidia-smi > /dev/null 2>&1; then
  echo "nvidia-smi installed" 
else 
  echo "install nvidia"  
  sudo apt install nvidia-340
  sudo apt install nvidia-utils-390
fi
nvidia-smi

echo 
echo "[:::::::::]  libcudnn7"
echo
if  dpkg-query -W libcudnn7 ; then
  echo "libcudnn installed"             
else
  echo "install libcudnn"   
  curl -O https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/libcudnn7_7.6.4.38-1+cuda10.1_amd64.deb;
  sudo dpkg -i libcudnn7_7.6.4.38-1+cuda10.1_amd64.deb;
fi
            

`},
        } ],

        // +-------------------------
        //
        //    124 wcudafaces.sh - wcuda instance with cuda, nvidia-smi, libcudnn
        //
        //
        __eofiles_wcudafaces_124: [{
          resolve: `wcudafaces.sh`,
          options: {
            __eodoc: `124 wcudafaces.sh - wcudafaces instance with cuda, nvidia-smi, libcudnn`,
            content: `
#!/bin/bash

echo 
echo "[:::::::::]  LOCAL PWD"
echo 
cd ~/data
echo "local pwd: $(pwd)"

export PATH="$HOME/anaconda3/bin:$PATH";

echo 
echo "[:::::::::]  CURL"
echo
if dpkg-query -W curl ; then
  echo "curl installed"
else
  echo "install curl"
  sudo dpkg -i curl
fi

echo 
echo "[:::::::::]  GIT"
echo
if dpkg-query -W git ; then
  echo "git installed"
else
  echo "install git"
  sudo dpkg -i git
fi

echo 
echo "[:::::::::]  PYTHON"
echo
echo python --version
conda install python=3.6.9

echo 
echo "[:::::::::]  conda"
echo
conda --version

echo 
echo "[:::::::::]  tensorflow"
echo
TFVER=$(python -c 'import tensorflow as tf; print(tf.__version__)')
echo "tensorflow: $TFVER"
if [ "$TFVER" == "1.12.2" ] ; then
  echo "tensorflow $TFVER installed"
else
  pip install --ignore-installed --upgrade tensorflow==1.12.2
#  echo "install tensorflow"
#  conda install -c anaconda tensorflow-gpu
#  TFVER=$(python -c 'import tensorflow as tf; print(tf.__version__)')
#  echo "tensorflow: $TFVER"  
fi

echo 
echo "[:::::::::]  CUDA"
echo
if dpkg-query -W cuda-9* ; then
  echo "cuda 9 installed"
else
  echo "intall cuda 9"
  wget https://developer.nvidia.com/compute/cuda/9.0/Prod/local_installers/cuda-repo-ubuntu1604-9-0-local_9.0.176-1_amd64-deb
  dpkg -i cuda-repo-ubuntu1604-9-0-local_9.0.176-1_amd64-deb
  apt-key add /var/cuda-repo-9-0-local/7fa2af80.pub
  apt-get update
  apt-get install cuda=9.0.176-1
fi
`},
        }],
        // +-------------------------
        //
        //    130 cudrivers.sh - cudrivers
        //
        //
        __eofiles_cudrivers_130: [{
          resolve: `cudrivers.sh`,
          options: {
            __eodoc: `130 cudrivers.sh - cudrivers`,
            content: `
#!/bin/bash

echo 
echo "[:::::::::]  PROPS"
echo 
GCP_PROJECT_NAME=${instanceName}
echo "# GCP_PROJECT_NAME \${GCP_PROJECT_NAME}"

GCP_PROJECT_ID=${projectId}
echo "# GCP_PROJECT_ID \${GCP_PROJECT_ID}"

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")
echo "GCP_ZONE \${GCP_ZONE}"

echo 
echo "[:::::::::]  LOCAL PWD"
echo 
cd ~/data
echo "local pwd: $(pwd)"

echo 
echo "[:::::::::]  gcloud PWD"
echo 
gcloud compute --project "\${GCP_PROJECT_ID}" ssh \
  --zone "\${GCP_ZONE}" \
  "\${GCP_PROJECT_NAME}" \
  --command "pwd"

echo 
echo "[:::::::::]  apt-get update"
echo   
gcloud compute --project "\${GCP_PROJECT_ID}" ssh \
  --zone "\${GCP_ZONE}" \
  "\${GCP_PROJECT_NAME}" \
  --command "sudo apt-get update"

echo 
echo "[:::::::::]  CUDA"
echo
# Install drivers, CUDA and cuDNN
apt-get -y install --no-install-recommends nvidia-driver-418
apt-get -y install --no-install-recommends cuda-10-0 libcudnn7=*+cuda10.0 libcudnn7-dev=*+cuda10.0
apt-get -y install --no-install-recommends libnvinfer5=5.*+cuda10.0 libnvinfer-dev=5.*+cuda10.0

`},
        }],

        // +-------------------------
        //
        //    136 iconda.sh - conda, tf, keras
        //
        //
        __eofiles_iconda_136: [{
          resolve: `iconda.sh`,
          options: {
            __eodoc: `136 iconda.sh - conda, tf, keras`,
            content: `
#!/usr/bash

# if running bash
if [ -n "$BASH_VERSION" ]; then
    echo "# run .bashrc if it exists"
    if [ -f "~/.bashrc" ]; then
        echo "# run .bashrc"
        . "~/.bashrc"
    fi
fi

echo 
echo "[:::::::::]  LOCAL PYTHON"
echo 
if command -v python3 > /dev/null 2>&1; then
  python3 --version
else
  echo 'local python not found'
fi

echo 
echo "[:::::::::]  LOCAL PWD"
echo 
mkdir -p ~/data
cd ~/data
echo "local pwd: $(pwd)"

GCP_INSTANCE_NAME=${instanceName}
echo "GCP_INSTANCE_NAME \${GCP_INSTANCE_NAME}"

GCP_PROJECT_ID=${projectId}
echo "GCP_PROJECT_ID \${GCP_PROJECT_ID}"

GCP_INSTANCES=$(gcloud compute instances list --format="json")
GCP_IP=$(gcloud compute instances list --filter="${instanceName}" --format "get(networkInterfaces[0].accessConfigs[0].natIP)")
echo "GCP_IP \${GCP_IP}"

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")
echo "GCP_ZONE \${GCP_ZONE}"

GCP_DATES=$(gcloud projects list --format="value(createTime.date('%Y-%m-%d'))")
GCP_DATE=\${GCP_DATES[0]}

GCP_NAMES=$(gcloud projects list --format="value(name)")
GCP_NAME=\${GCP_NAMES[0]}

GCP_PROJECTNUMBS=$(gcloud projects list --format="value(projectNumb)")
GCP_PROJECTNUMB=\${GCP_PROJECTNUMBS[0]}

GCP_PROJECTIDS=$(gcloud projects list --format="value(projectId)")
GCP_PROJECTID=\${GCP_PROJECTIDS[0]}

echo 
echo "[:::::::::]  PWD"
echo 
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_INSTANCE_NAME}" \
      --command "pwd"
      
echo 
echo "[:::::::::]  PYTHON"
echo 
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_INSTANCE_NAME}" \
      --command "python3 --version"

echo 
echo "[:::::::::]  ANACONDA (ifn)"
echo 
gcloud compute --project "\${GCP_PROJECT_ID}" ssh \
  --zone "\${GCP_ZONE}" \
  "\${GCP_INSTANCE_NAME}" \
  --command "if [ -x $(command -v conda) ]; \
    then \
      echo $(command -v conda); \
      echo conda found, do nothing; \
      which conda; \
      $(command -v conda) --version; \
    else \
      echo conda not found, install environment; \
      echo install Anaconda3-5.2.0-Linux-x86_64; \
      wget https://repo.continuum.io/archive/Anaconda3-2019.07-Linux-x86_64.sh; \
      chmod +x ./Anaconda3-2019.07-Linux-x86_64.sh; \
      sh ./Anaconda3-2019.07-Linux-x86_64.sh -u; \
      echo add conda to path; \
      export PATH=~/anaconda3/bin:$PATH; \
      echo update conda; \
      $(command -v conda) update -n base -c defaults conda; \
      $(command -v conda) info --envs; \
      $(command -v conda) list; \
      $(command -v conda) install tensorflow-gpu; \
      $(command -v conda) install keras; \
      $(command -v conda) install tqdm; \
      $(command -v conda) install pillow; \
      $(command -v conda) install numpy; \
      $(command -v conda) install requests; \
      $(command -v conda) install cudatoolkit; \
      $(command -v conda) install dnnlib; \
      $(command -v conda) install -c vladsaveliev gdown; \
      $(command -v conda) install -c conda-forge opencv; \
      $(command -v conda) install -c conda-forge dlib; \
      $(command -v conda) update --all; \
    fi"

echo 
echo "[:::::::::]  tf verify"
echo 
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
  --command "python \
    with tf.device('/gpu:0'): \
      a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a') \
      b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b') \
      c = tf.matmul(a, b) \
      sess = tf.Session(config=tf.ConfigProto(log_device_placement=True)) \
      print(sess.run(c))  
  "

`},
        } ],

        // +-------------------------
        //
        //    140 iinstall.sh - conda, tf, keras
        //
        //
        __eofiles_iinstall_140: [{
          resolve: `iinstall.sh`,
          options: {
            __eodoc: `140 iinstall.sh - conda, tf, keras`,
            content: `
#!/usr/bash

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")

# if running bash
if [ -n "$BASH_VERSION" ]; then
    echo "# run .bashrc if it exists"
    if [ -f "~/.bashrc" ]; then
        echo "# run .bashrc"
        . "~/.bashrc"
    fi
fi

echo 
echo "[:::::::::]  tensorflow"
echo 
gcloud compute ssh ${instanceName} --project ${projectId} --zone "\${GCP_ZONE}" \
  --command "export PATH='/home/e/anaconda3/bin:$PATH'; \
      python -c 'import tensorflow as tf; print(tf.__version__)'"

echo 
echo "[:::::::::]  cuda"
echo     
gcloud compute ssh \
${instanceName} \
--project ${projectId} \
--zone "\${GCP_ZONE}" \
--command "dpkg-query -W cuda"

echo 
echo "[:::::::::]  cuda"
echo       
echo gcloud compute ssh \
${instanceName} \
--project ${projectId} \
--zone "\${GCP_ZONE}" \
--command "cuda --version"

` },
        } ],

        __eodoc_999: `
      ╭─────────────────────────────────────────────╮
      │       999 END                               │
      ╰─────────────────────────────────────────────╯`,
        __eobreak__end: `break end`,

      }

      /**
       *  parcel return
       */
      parcel = parcel_gcp
      return parcel
    }

    // ....................... enty
    let enty = {}
    enty.getState = () => state
    return enty
  }

  exports.eonitem = eonitem
})

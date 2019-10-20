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

      // https://cloud.google.com/tpu/docs/tutorials/resnet

      helpmsg: ` 
      will ganfaces

      usage:      

      > node ./scripts/run eodoes-eodo-ganfaces ../eosites eoparse --doc
      > node ./scripts/run eodoes-eodo-ganfaces ../../.. eoparse --eon e --doc


      resfs: 
      
        https://console.cloud.google.com/compute/instances?project=dulcet-aileron-253711&instancessize=50
        https://www.pugetsystems.com/labs/hpc/How-to-Install-TensorFlow-with-GPU-Support-on-Windows-10-Without-Installing-CUDA-UPDATED-1419/
        https://cloud.google.com/compute/docs/instances/connecting-advanced#thirdpartytools
        https://cloud.google.com/compute/docs/gpus/add-gpus
        https://docs.nvidia.com/deploy/cuda-compatibility/index.html#binary-compatibility__table-toolkit-driver

 `,

      eotags: {
        '--gcp': 'gcp1',
      },

      localwd: '~/data',
      localkd: '~/.ssh',

      gcp1: {
        projectId: 'eo0005',
        projectName: 'eo0005',
        svcAccount: 'eogcpuser',
        svcRole: 'eorole',
        instanceName: 'eo000501',
        diskName: 'eo0501disk',
        regionName: 'europe-west4',
        zoneName: 'europe-west4-a',
        diskSize: '200GB',
        machineType: 'n1-standard-8',
        projectIam: 'developer',
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

      let { projectId, instanceName,
        projectName, projectUser, svcNumber, machineType,
        regionName, zoneName, diskSize,
        diskName, projectIam,
        svcAccount, svcRole } = __.gcp1

      /* eslint-enable no-unused-vars */

      let parcel = {},
        parcel_gcp = {}

      /*****************************************
       *  parcel_gcp
       */
      parcel_gcp = { // ---------------------- parcel

        __eodoc_000: `
      ╭─────────────────────────────────────────────╮
      │  000  config gc                             │
      ╰─────────────────────────────────────────────╯`,
        // +-------------------------
        //
        //
        //
        //    310 verify.sh - verify tf
        //
        //
        //
        //

        __eofiles_verify_310: [{
          resolve: `verify.py`,
          options: {
            __eodoc: `310 verify.py  https://amunategui.github.io/fast-gpu-gcloud/`,
            content: `
import tensorflow as tf            
with tf.device('/gpu:0'):
  a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
  b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
c = tf.matmul(a, b)
# Creates a session with log_device_placement set to True.
sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))
# Runs the op.
print(sess.run(c))
`},
        } ],

        // +-------------------------
        //
        //
        //
        //    400 rgan.sh
        //
        //
        //
        //
        __eofiles_rgan_400: [{
          resolve: `rgan.sh`,
          options: {
            __eodoc: `400 rgan.sh, launch arxiv script`,
            content: `
#!/usr/bin/env bash

#
#   dir
#
GAN_DIR=$HOME/c/e/c/ml/ai/arxiv
echo
echo GAN_DIR: $GAN_DIR
mkdir -p $GAN_DIR
cd $GAN_DIR

#
#   src env
#

SRC_DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo SRC_DIR: $SRC_DIR

#
#   eo env
#
cd $SRC_DIR
echo "local pwd: $(pwd)"
echo "local ls: $(ls)"

#
#   copy from eo to local data
#
mkdir -p ~/data
cp ./arxiv.sh ~/data/
cp ./verify.py ~/data/
cd ~/data
echo "local pwd: $(pwd)"
echo "local ls: $(ls)"

#
#   remote env
#
echo  
GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" --format "value(zone.basename())")
echo "GCP_ZONE \${GCP_ZONE}"

GCP_PROJECT_NAME=${instanceName}
echo "GCP_PROJECT_NAME \${GCP_PROJECT_NAME}"

GCP_PROJECT_ID=${projectId}
echo "GCP_PROJECT_ID \${GCP_PROJECT_ID}"

echo remote pwd:
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
      --command "pwd"

      
echo create remote data
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
      --command "mkdir -p ~/data"
      
#
#   scp to remote
#      
echo gcloud compute scp ~/data/arxiv.sh "\${GCP_PROJECT_NAME}":~/data --zone \${GCP_ZONE}
gcloud compute scp ~/data/arxiv.sh "\${GCP_PROJECT_NAME}":~/data/ --zone \${GCP_ZONE}


echo gcloud compute scp ~/data/verify.py "\${GCP_PROJECT_NAME}":~/data --zone \${GCP_ZONE}
gcloud compute scp ~/data/verify.py "\${GCP_PROJECT_NAME}":~/data/ --zone \${GCP_ZONE}

#
#   show remote
#    
echo gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" --command "echo; echo pwd:; pwd"
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
      --command "echo; echo pwd:; pwd"
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
      --command "echo; echo ls ~/data:; ls ~/data"

#
#   run remote verify
# 
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
      --command "$(command -v python) ~/data/verify.py"
      
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
      --command "$(command -v nvidia-smi)"
      
# echo 'export CUDA_HOME=/usr/local/cuda' >> ~/.bashrc
# echo 'export PATH=$PATH:$CUDA_HOME/bin' >> ~/.bashrc
# echo 'export LD_LIBRARY_PATH=/usr/local/cuda/extras/CUPTI/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
# source ~/.bashrc

#
#   run remote arxiv
# 
# https://stackoverflow.com/questions/216202/why-does-an-ssh-remote-command-get-fewer-environment-variables-then-when-run-man
gcloud compute --project "\${GCP_PROJECT_ID}" ssh --zone "\${GCP_ZONE}" "\${GCP_PROJECT_NAME}" \
      --command "sh --login ~/data/arxiv.sh"

`},
        }],

        // +-------------------------
        //
        //
        //
        //    500 insights.sh
        //
        //
        //
        //
        __eofiles_insights_500: [{
          resolve: `insights.sh`,
          options: {
            __eodoc: `500 ${eoroot}/insights.sh, launch arxiv insights script`,
            content: `
#!/usr/bin/env bash

echo 
echo "[:::::::::]   GAN DIR"
echo
GAN_DIR=${eoroot}
echo
echo GAN_DIR: $GAN_DIR
mkdir -p $GAN_DIR
cd $GAN_DIR
echo pwd: $(pwd)

echo 
echo "[:::::::::]   CWD"
echo
SRC_DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo SRC_DIR: $SRC_DIR
cd $SRC_DIR
echo pwd: $(pwd)

echo 
echo "[:::::::::]   stylegan-encoder"
echo
if test -d $SRC_DIR/stylegan-encoder ; then
  echo 'encoder found'
else 
  git clone https://github.com/pbaylies/stylegan-encoder
fi
cd stylegan-encoder/ 
echo pwd: $(pwd)

echo 
echo "[:::::::::]   create file list_images.py"
echo
cat > list_images.py << ENDOFFILE
from PIL import Image
import os
imgs = sorted(os.listdir('raw_images'))

print("Found %d images in %s" %(len(imgs), 'raw_images'))
if len(imgs) == 0:
  print("Upload images to the raw_images folder!")
else:
  print(imgs)

for img_path in imgs:
  img = Image.open('raw_images/' + img_path)
  
  w,h = img.size
  rescale_ratio = 256 / min(w,h)
  img = img.resize((int(rescale_ratio*w),int(rescale_ratio*h)), Image.LANCZOS)
  # display(img)
ENDOFFILE

echo 
echo "[:::::::::]   create folder raw_images "
echo
if test -d raw_images ; then
  echo 'raw_images found'
else
  echo 'mkdir raw_images'
  mkdir -p 'raw_images/'

  echo 
  echo "[:::::::::]   get raw_images from github"
  echo
  wget  -O raw_images/img1.jpg https://github.com/sifbuilder/eodoes/raw/master/packages/eodoes-eodo-eofaces/img/2019-09-22_19-04-13.jpg
  wget  -O raw_images/img2.jpg https://github.com/sifbuilder/eodoes/raw/master/packages/eodoes-eodo-eofaces/img/2019-09-22_19-09-43.jpg
  wget  -O raw_images/img3.jpg https://github.com/sifbuilder/eodoes/raw/master/packages/eodoes-eodo-eofaces/img/2019-09-22_19-13-39.jpg
  wget  -O raw_images/img4.jpg https://github.com/sifbuilder/eodoes/raw/master/packages/eodoes-eodo-eofaces/img/2019-09-22_19-21-27.jpg
  wget  -O raw_images/img5.jpg https://github.com/sifbuilder/eodoes/raw/master/packages/eodoes-eodo-eofaces/img/2019-09-22_19-22-27.jpg
  wget  -O raw_images/img6.jpg https://github.com/sifbuilder/eodoes/raw/master/packages/eodoes-eodo-eofaces/img/2019-09-22_19-24-22.jpg
  

fi

echo 
echo "[:::::::::]   run list_images.py"
echo
echo "python3 list_images.py"
python3 list_images.py 

echo 
echo "[:::::::::]   run align_images.py"
echo
mkdir -p 'aligned_images/'
echo "python3 align_images.py"
# !rm -rf sample_data
python3 align_images.py raw_images/ aligned_images/ --output_size=1048

echo 
echo "[:::::::::]   run encode_images.py"
echo
echo "python3 encode_images.py"
python3 encode_images.py --batch_size=2 --load_resnet='data/finetuned_resnet.h5' --lr=0.01 --decay_rate=0.8 --iterations=200 --use_l1_penalty=0.3 aligned_images/ generated_images/ latent_representations/

# dlib
# https://files.pythonhosted.org/packages/05/57/e8a8caa3c89a27f80bc78da39c423e2553f482a3705adc619176a3a24b36/dlib-19.17.0.tar.gz
                               

` },
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

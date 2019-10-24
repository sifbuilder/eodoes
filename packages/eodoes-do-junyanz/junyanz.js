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
      will junyanz

      usage:      

      > node ./scripts/run eodoes-do-junyanz ../eosites eoparse --doc --gcp gcp501
      > node ./scripts/run eodoes-do-junyanz ../../.. eoparse --eon e --doc
      > node ~/c/e/c/eodoes/scripts/run.js eodoes-do-junyanz  ~/e/c/eodoes/eosites eoparse --doc --gcp gcp501
      > ~/c/e/c/eosites/eodoes-eo-junyanz/resolve.sh

      https://colab.research.google.com/github/sifbuilder/eodoes/blob/master/packages/eodoes-do-junyanz/code/CycleGAN.ipynb

      resfs: 
        https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix

        jupyter nbconvert in.ipynb --to notebook --ClearOutputPreprocessor.enabled=True --stdout > out.ipynb
        jupyter nbconvert --to script in.ipynb

 `,

      eotags: {
        '--gcp': 'gcp511',
        '--multizone': false,
        '--regionName': 'us-west1',
        '--zoneName': 'us-west1-a',
        '--env': 'base',
        '--copymodel': false,
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
        machineType: 'n1-standard-4',
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

      let {eon, version, author, license, descr, email} = __.eonopts
      let { delay = 3969 } = __.eventsopts

      let {gcp, multizone, regionName, zoneName, env, copymodel} = __.eonopts

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
      │  000  gcp insights                          │
      ╰─────────────────────────────────────────────╯`,

        // +-------------------------
        //
        //    120 copydatamodel data - copy data from eodoes to eosite domain knwon by wsl script
        //
        __eofiles_copydatamodel_120: [
          {
            resolve: `data/model`,
            options: {
              __eodoc: `120 copydatamodel.sh - copy data from eodoes to eosite domain knwon by wsl script
data
  model
    - stylegan-encoder.zip  
        After guessing the initial latent codes using the pretrained ResNet, 
        it will run gradient descent to optimize the latent faces
        it will optimize w vectors, not z-vectors
        https://github.com/pbaylies/stylegan-encoder
        https://github.com/pbaylies/stylegan-encoder/archive/master.zip
    - finetuned_resnet.h5 - pre-trained resnet encoder: estimates latent code for an image
        https://drive.google.com/file/d/1aT59NFy9-bNyXjDuZOTMl0qX0jmZc6Zb/view
    - karras2019stylegan-ffhq-1024x1024.pkl - pretrained StyleGAN network from NVIDIA trained on faces
        https://drive.google.com/uc?id=1MEGjdvVpUsu1jB4zrXZN7Y4kBBOzizDQ
    - vgg16_zhang_perceptual.pkl - pretrained VGG-16 network, trained on ImageNet
        Standard LPIPS metric to estimate perceptual similarity.
        https://drive.google.com/uc?id=1N2-m9qszOeVC9Tq77WxsLnuWwOedQiD2
    - vgg16_weights_tf_dim_ordering_tf_kernels_notop.h5
        https://github.com/MinerKasch/applied_deep_learning/raw/master/vgg16_weights_tf_dim_ordering_tf_kernels_notop.h5
    - shape_predictor_68_face_landmarks.dat
        https://github.com/AKSHAYUBHAT/TensorFace/raw/master/openface/models/dlib/shape_predictor_68_face_landmarks.dat
    - dlib-19.18.0.tar.gz
      http://pypi.fcio.net/packages/1e/62/aacb236d21fbd08148b1d517d58a9d80ea31bdcd386d26f21f8b23b1eb28/dlib-19.18.0.tar.gz#md5=556cb941c7d78d49bb0266484ba25a63
`,
              path: copymodel ? 'data/model' : '' },
          } ],
        //
        // 182 git clone - stylegan-encoder
        //
        __eoexec_p_git_182: [{
          resolve: copymodel ? `git clone https://github.com/pbaylies/stylegan-encoder --depth 1` : '',
          options: {
            __eodoc: `182 git clone - stylegan-encoder`,
          },
        } ],

        // +-------------------------
        //    262 cp - data/code => code
        //
        __eofiles_dcode_262: [
          {
            resolve: `code`,
            options: {
              __eodoc: `262a cp d.code => s.code`,
              path: 'code' },
          },

        ],

        // +-------------------------
        //    274 wcode.sh
        //
        __eofiles_wcode_274: [{
          resolve: `wcode.sh`,
          options: {
            __eodoc: `274a wcode.sh - copy SITE/code to instance home/code`,
            content: `
#!/usr/bash

DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "src $DIR"

mkdir -p ~/code/
echo cp -r \${DIR}/code ~/
cp -r \${DIR}/code ~/
`},
        },
        ],

        // +-------------------------
        //    278 wclear.sh - clear code
        //
        __eofiles_wclear_278: [{
          resolve: `wclear.sh`,
          options: {
            __eodoc: `278 wclear.sh - clear code`,
            content: `
#!/usr/bash

echo rm -r ~/code/
rm -r ~/code/
`},
        } ],

        // +-------------------------
        //    284 wstyle.sh - python style.py
        //
        __eofiles_wstyle_284: [{
          resolve: `wstyle.sh`,
          options: {
            __eodoc: `284 wstyle.sh - python style.py`,
            content: `
#!/usr/bash

pwd
cd $HOME/code
ls
$(command -v python) --version 
$(command -v python) style.py
`},
        } ],

        // +-------------------------
        //    286 istyle.sh - python style.py
        //
        __eofiles_istyle_286: [{
          resolve: `istyle.sh`,
          options: {
            __eodoc: `286 istyle.sh - python style.py`,
            content: `
#!/usr/bash

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")
echo "GCP_ZONE $GCP_ZONE"

gcloud compute ssh \
  ${instanceName} \
  --project ${projectId} \
  --zone "\${GCP_ZONE}" \
  --command "
ls
cd ~/code
$(command -v python) --version 
$(command -v python) style.py
"
  
`},
        } ],

        // +-------------------------
        //    290 icode.sh - s.code => i.home/code
        //
        __eofiles_icode_290: [{
          resolve: `icode.sh`,
          options: {
            __eodoc: `290 icode.sh - s.code => i.home/code`,
            content: `
#!/usr/bash

DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "src $DIR"

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")
echo "GCP_ZONE $GCP_ZONE"

echo gcloud compute scp \
  --zone $GCP_ZONE \
  --recurse \
  $DIR/code \
  ${instanceName}:~/

gcloud compute scp \
  --zone $GCP_ZONE \
  --recurse \
  $DIR/code \
  ${instanceName}:~/

gcloud compute ssh \
  ${instanceName} \
  --project ${projectId} \
  --zone "\${GCP_ZONE}" \
  --command "ls -la ~/code"
  
`},
        } ],

        // +-------------------------
        //    300 iclear.sh - clear code folder in instance
        //
        __eofiles_iclear_300: [{
          resolve: `iclear.sh`,
          options: {
            __eodoc: `300 iclear.sh - clear code folder in instance`,
            content: `
#!/usr/bash

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")
echo "GCP_ZONE $GCP_ZONE"

echo gcloud compute ssh \
  ${instanceName} \
  --project ${projectId} \
  --zone "\${GCP_ZONE}" \
  --command "rm -r ~/code"
  
gcloud compute ssh \
${instanceName} \
--project ${projectId} \
--zone "\${GCP_ZONE}" \
--command "rm -r ~/code"

`},
        } ],

        // +-------------------------
        //    320 ito.sh - bring folders from instance
        //
        __eofiles_ito_320: [{
          resolve: `ito.sh`,
          options: {
            __eodoc: `320 ito.sh - bring folders from instance`,
            content: `
#!/usr/bash

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")
echo "GCP_ZONE $GCP_ZONE"

DIR=$HOME 
echo mkdir -p \${DIR}/tmp
mkdir -p \${DIR}/tmp

gcloud compute ssh \
${instanceName} \
--project ${projectId} \
--zone "\${GCP_ZONE}" \
--command "ls -la ~/code"

gcloud compute scp \
--zone $GCP_ZONE \
--recurse \
${instanceName}:~/code/videos \
~/tmp

gcloud compute scp \
--zone $GCP_ZONE \
--recurse \
${instanceName}:~/code/generated_images \
~/tmp

gcloud compute scp \
--zone $GCP_ZONE \
--recurse \
${instanceName}:~/code/aligned_images \
~/tmp

`},
        } ],

        // +-------------------------
        //
        //    420 jconnect.sh - for jupyter notebook - with 8888 port forwarding
        //
        //
        __eofiles_jconnect_420: [{
          resolve: `jconnect.sh`,
          options: {
            __eodoc: `420 jconnect.sh - for jupyter notebook - with 8888 port forwarding`,
            content: `
#!/usr/bash

echo 
echo "[:::::::::]  zone "
echo 
GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")
echo "GCP_ZONE $GCP_ZONE"#


echo "about to port forward on 8888"
echo "conda activate ${env}"
echo "jupyter notebook --no-browser --port=8888"


echo 
echo "[:::::::::]  ssh -L "
echo 
# https://cloud.google.com/solutions/connecting-securely
echo "connect to instance"
gcloud compute ssh ${instanceName}  \
  --project ${projectId} \
  --zone $GCP_ZONE \
  -- -L 8888:localhost:8888 
  

`},
        }],

        // +-------------------------
        //
        //    010 ping.sh
        //
        //
        __eofiles_ping_010: [{
          resolve: `ping.sh`,
          options: {
            __eodoc: `010 ping.sh`,
            content: `
#!/usr/bash

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")

echo "gcloud compute ssh \
  ${instanceName} \
  --project ${projectId} \
  --zone "\${GCP_ZONE}" \
  --command pwd"

gcloud compute ssh \
  ${instanceName} \
  --project ${projectId} \
  --zone "\${GCP_ZONE}" \
  --command "pwd"

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
            __eodoc: `040 iconnect.sh - ssh connect to compute instance`,
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
        //    050 start.sh
        //
        //
        __eofiles_start_050: [{
          resolve: `start.sh`,
          options: {
            __eodoc: `050 start.sh: ${instanceName} with ${gpus} gpus from ${zoneName} - start compute vm`,
            content: `
#!/bin/bash

echo 
echo "[:::::::::]  START:"
echo 
gcloud compute instances start ${instanceName}

`},
        } ],
        // +-------------------------
        //
        //    060 stop.sh
        //
        //
        __eofiles_stop_060: [{
          resolve: `stop.sh`,
          options: {
            __eodoc: `060 stop.sh: stop instance - stop compute vm`,
            content: `
#!/usr/bin/env bash

echo 
echo "[:::::::::]  STOP:"
echo 

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")
echo "GCP_ZONE \${GCP_ZONE}"

echo "# gcloud compute instances stop ${instanceName} --zone=\${GCP_ZONE}"
gcloud compute instances stop ${instanceName} --zone=\${GCP_ZONE}

`},
        } ],

        // +-------------------------
        //
        //    100 iconda.sh
        //
        //
        __eofiles_iconda_100: [{
          resolve: `iconda.sh`,
          options: {
            __eodoc: `100 iconda.sh - conda config cloud compute instance
create with: conda env create -f environment.yml 
export with: conda env export > environment.yml
`,
            content: `
#!/usr/bash

GCP_ZONE=$(gcloud compute instances list --filter="${instanceName}" \
--format "value(zone.basename())")

# ~/anaconda3
gcloud compute ssh \
  ${instanceName} \
  --project ${projectId} \
  --zone "\${GCP_ZONE}" \
  --command "
export PATH='$HOME/anaconda3/bin:$PATH';
conda --version;
conda install
  python=3.7.4
  tensorflow-gpu
  keras
  tqdm
  pillow
  numpy
  requests
  cudatoolkit; 
conda install -c conda-forge gdown;
conda install -c conda-forge opencv;
conda install -c conda-forge dlib;    
conda update --all;
"
`},
        }],

        // +-------------------------
        //
        //    200 wconda.sh
        //
        //
        __eofiles_wconda_200: [{
          resolve: `wconda.sh`,
          options: {
            __eodoc: `200 wconda.sh - conda config cloud compute instance`,
            content: `
#!/usr/bash

echo 
echo "[:::::::::]  CONDA PY36:"
echo 
export PATH="$HOME/anaconda3/bin:$PATH";
$(command -v conda) --version
$(command -v conda) env list
$(command -v conda) create -n py36 
$(command -v conda) activate py36
$(command -v conda) install python=3.6.2 
$(command -v conda) install tensorflow-gpu=1.12
# wget https://developer.nvidia.com/compute/cuda/9.0/Prod/local_installers/cuda-repo-ubuntu1604-9-0-local_9.0.176-1_amd64-deb
# dpkg -i cuda-repo-ubuntu1604-9-0-local_9.0.176-1_amd64-deb
# apt-key add /var/cuda-repo-9-0-local/7fa2af80.pub
# apt-get update
# apt-get install cuda=9.0.176-1

`},
        }],

        // +-------------------------
        //
        //    888 resolve.sh
        //
        //
        __eofiles_resolve_888: [{
          resolve: `resolve.sh`,
          options: {
            __eodoc: `888 resolve.sh - overwrite /etc/resolve.conf`,
            content: `
#!/bin/bash
cat /etc/resolv.conf
sudo bash -c 'echo "nameserver 8.8.8.8" > /etc/resolv.conf'
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

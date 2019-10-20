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
    let isLinux = process.platform === 'linux' // eslint-disable-line no-unused-vars
    /* eslint-enable no-unused-vars */

    let state = {

      helpmsg: ` 
      will create the eonic wsl workspace

      usage:      
      > node ./scripts/run eodoes-eodo-eowsl ../eosites eoparse --eon eowsl
      > node ./scripts/run eodoes-eodo-eowsl ../../.. eoparse --eon e --doc

      /mnt/c/e/s/l.sh
`,
    }

    /**********************
      * eoparse__parcel
      */
    state[`eoparse__parcel`] = function (data, __) {
      /* eslint-disable no-unused-vars */
      let { eoroot } = __
      let {eon, version, author, license, descr, email} = __.eonopts
      let { delay = 3969 } = __.eventsopts

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

      /* eslint-enable no-unused-vars */
      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      /**
       *  parcel
       */
      let parcel = { // ---------------------- parcel

        __eodoc_000: `
      ╭─────────────────────────────────────────────╮
      │  000  config eowsl                          │
      │  https://rharshad.com/windows-subsystem-for-linux   │
      │  https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly/   │
      │  https://docs.docker.com/v17.09/engine/installation/linux/docker-ce/ubuntu/   │
      ╰─────────────────────────────────────────────╯`,

        //
        // 010
        //
        __eodoc_010: `
Pre-requisites:
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux        

`,

        //
        // 040 idocker.sh
        //
        __eofiles_idocker_040: [{
          resolve: `s/idocker.sh`,
          options: {
            __eodoc: `040 idocker.sh`,
            content: `
set -e

if command -v docker > /dev/null 2>&1; then
  echo docker is available
else
  echo "# docker"
  echo "# Updating package lists"
  sudo apt-add-repository -y ppa:git-core/ppa
  sudo apt-get update  -y

  echo "# Ensure that CA certificates are installed"
  sudo apt-get -y install apt-transport-https ca-certificates

  echo "# Add Docker repository key to APT keychain"
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

  echo "# Update where APT will search for Docker Packages"
  echo "sudo add-apt-repositor deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

  echo "# Update package lists"
  sudo apt-get update

  echo "# Verifies APT is pulling from the correct Repository"
  sudo apt-cache policy docker-ce

  echo "# Installing Docker"
  sudo apt-get -y install docker-ce

  echo "# Add user account to the docker group"
  sudo usermod -aG docker $(whoami)

  echo "# Installing Docker-Compose"
  sudo curl -L "https://github.com/docker/compose/releases/download/1.13.0/docker-compose-$(uname -s)-$(uname -m)"     -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose

  echo "# Print installation details for user"
  echo ''
  echo 'Installation completed, versions installed are:'
  echo ''
  echo -n 'Docker:         '
  docker --version
  echo -n 'Docker Compose: '
  docker-compose --version

  # Print reminder of need to logout in order for these changes to take effect!
  echo ''
  echo "Please logout then login before continuing."
            
fi
`,
          },
        }],
        //
        // 060 igit.sh
        //
        __eofiles_igit_060: [{
          resolve: `s/igit.sh`,
          options: {
            __eodoc: `060 igit.sh`,
            content: `
set -e

# git
if command -v git > /dev/null 2>&1; then
  echo git is available
else
    echo "# git"
    echo "# Updating package lists"
    sudo apt-add-repository -y ppa:git-core/ppa
    sudo apt-get update

    echo "# Installing Git"
    sudo apt-get install -y git

    echo "# Installing nvm dependencies"
    sudo apt-get -y install build-essential libssl-dev

    echo "# Executing nvm installation script"
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

    echo "# Set up nvm environment without restarting the shell"
    export NVM_DIR="\${HOME}/.nvm"
    [ -s "\${NVM_DIR}/nvm.sh" ] && . "\${NVM_DIR}/nvm.sh"
    [ -s "\${NVM_DIR}/bash_completion" ] && . "\${NVM_DIR}/bash_completion"

    echo "# Installing nodeJS"
    nvm install 8
    nvm use 8

    echo "# Ensure that CA certificates are installed"
    sudo apt-get -y install apt-transport-https ca-certificates

    echo "# Install python v2 if required"
    set +e
    COUNT="$(python -V 2>&1 | grep -c 2.)"
    if [ \${COUNT} -ne 1 ]
    then
        sudo apt-get install -y python-minimal
    fi

    echo ''
    echo 'Installation completed, versions installed are:'
    echo ''
    echo -n 'Node:           '
    node --version
    echo -n 'npm:            '
    npm --version
    echo -n 'Python:         '
    python -V

    echo ''
    echo "Please logout then login before continuing."

fi
`,
          },
        }],
        //
        // 100 deb.sh
        //
        __eofiles_deb_100: [{
          resolve: `s/l.sh`,
          options: {
            __eodoc: `100 deb.sh`,
            content: `
#!/usr/bin/env bash

# refs
#  https://rharshad.com/windows-subsystem-for-linux/

echo "# Exit on any failure"
echo
set -e
NL=$'\\n'

echo "# ubuntu check release"
echo
lsb_release -a

echo "# set update mark"
if test -d ~/.updated ; then
  echo 'update mark found'
else
  echo 'update'
  sudo apt update && sudo apt upgrade
  mkdir ~/.updated
fi

echo
if [ ! -d "$HOME/.local/bin" ] ; then
echo "# create user's private ~/.local/bin if it does not exists"
mkdir -p $HOME/.local/bin
fi
echo "# set PATH so it includes user's private ~/.local/bin"
PATH="$HOME/.local/bin:$PATH"

echo "# C mount root"
echo
if test -d '/c' ; then
  echo 'c root found'
else
  echo 'serverless credentials not found'
  mkdir -p $HOME/e # sudo mkdir /c
fi
if test -d $HOME/e/e ; then
  echo '_e_nv found'
else 
  ln -s /mnt/c/e $HOME/e # sudo mount --bind /mnt/c /c
fi

ENTRY_DIR=$(cd -P "$(dirname "\${BASH_SOURCE[0]}")" && pwd)
echo
echo ENTRY_DIR: $ENTRY_DIR
export ENTRY_DIR="$ENTRY_DIR"
export PATH="$ENTRY_DIR/bin:$PATH"

ROOT_DIR=$ENTRY_DIR/.. # /mnt/c/e/s/..
echo
echo ROOT_DIR: $ROOT_DIR
export ROOT_DIR=$ROOT_DIR

echo
PORT_DIR=$ROOT_DIR/p
echo
echo PORT_DIR: $PORT_DIR
export PORT_DIR="$ROOT_DIR/p"

echo "# add $HOME/.local/bin to the  WSL $PATH"
echo
export PATH="$HOME/.local/bin:$PATH"

echo "# aliases to ~/.bashrc"
echo
alias tocode='cd "$ROOT_DIR/c"'
alias toeodo='cd "$ROOT_DIR/c/eodoes"'

echo "# dos2unix"
echo
if ! command -v "dos2unix" > /dev/null; then
  echo dos2unix is available
else
  echo dos2unix is not available
  sudo apt install dos2unix
fi

echo "# unzip"
echo
if ! command -v "unzip" > /dev/null; then
  echo unzip is available
else
  echo unzip is not available
  sudo apt install unzip
fi

echo
echo "# CURL"
echo
if command -v curl > /dev/null 2>&1; then
  echo curl is available
else
  echo curl is not available
  sudo apt install curl
fi

echo
echo "# GIT"
echo
sh $ENTRY_DIR/igit.sh
if command -v git > /dev/null 2>&1; then
  echo git is available
else
  echo git is not available
fi

echo
echo "# VSCODE"
echo
# Install the Windows Subsystem for Linux along with your preferred Linux distribution.
# Install Visual Studio Code on the Windows side (not in WSL).
# Install the Remote Development extension pack.
# https://code.visualstudio.com/docs/remote/wsl
VSCODE_PATH=$PORT_DIR/VSCode
VSCODE_BIN=$PORT_DIR/VSCode/bin
echo "# add $VSCODE_PATH to path"
export PATH=$VSCODE_PATH:$PATH
export PATH=$VSCODE_BIN:$PATH
echo "# ln $VSCODE_BIN/code-insiders to $HOME/.local/bin/vscode"
ln -fs $VSCODE_BIN/code-insiders $HOME/.local/bin/vscode

echo
echo "# NODE"
echo
# WSL node/npm https://askubuntu.com/questions/1036806/how-to-remove-npm-and-reinstall-npm-completely-in-18-04
# sudo apt-get remove nodejs npm
if command -v node > /dev/null 2>&1; then
  echo node is available
else
  echo node is not available
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
nodejs --version

echo
echo "# NPM"
echo
if command -v npm > /dev/null 2>&1; then
  echo npm is available
  npm list -g | head -n 1
  npm root -g # /usr/lib/node_module
  npm ls -g --depth=0
else
  echo npm is not available
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
npm --version

echo
echo "# YARN"
echo
if command -v yarn > /dev/null 2>&1; then
  echo yarn is available
else
  echo yarn is not available
  # sudo npm install -g yarn
fi

echo
echo "# serverless"
echo
echo
if command -v serverless > /dev/null 2>&1; then
  echo serverless is available
else
  echo serverless is not available
  # sudo npm install -g serverless
fi

echo "# alias eodo"
alias eodo="cd $HOME/e/c/eodoes"
echo "# cd eodoes"
cd $HOME/e/c/eodoes


# sudo dpkg --configure -a
# sudo apt-get upgrade -y
# sudo apt-get dist-upgrade
# sudo do-release-upgrade


echo
echo "# PYTHON"
# https://www.pugetsystems.com/eotags/hpc/How-to-Install-TensorFlow-with-GPU-Support-on-Windows-10-Without-Installing-CUDA-UPDATED-1419/
echo
if command -v python > /dev/null 2>&1; then
  python --version
else
  echo 'python not found'
fi

echo
echo "# PYTHON3"
echo
if command -v python3 > /dev/null 2>&1; then
  python3 --version
else
  echo 'python3 not found'
fi

echo
echo "# PIP"
echo
if command -v pip > /dev/null 2>&1; then
  echo 'pip found'
else
  echo 'pip not found'
  sudo apt install python-pip
  echo "_e_ todo # Change the shebang specification in /usr/bin/pip to /usr/bin/python3"
fi

echo
# echo "# docker"
# sh $ENTRY_DIR/idocker.sh
# # echo "export DOCKER_HOST=tcp://localhost:2375" >> ~/.bashrc && source ~/.bashrc
# # Configure WSL to Connect to Docker for Windows
# export DOCKER_HOST=tcp://localhost:2375
# docker info
# docker-compose --version

# dlib
# https://files.pythonhosted.org/packages/05/57/e8a8caa3c89a27f80bc78da39c423e2553f482a3705adc619176a3a24b36/dlib-19.17.0.tar.gz

`,
          },
        }],
        //
        // 200 deb.sh
        //
        __eofiles_deb_200: [{
          resolve: `s/conda.sh`,
          options: {
            __eodoc: `200 conda.sh`,
            content: `
#!/usr/bin/env bash

# # cuda
# # https://gist.github.com/kauffmanes/5e74916617f9993bc3479f401dfec7da
# # https://jensenwaud.com/2019/01/17/installing-anaconda-on-windows-subsystem-for-linux/

echo
echo "# conda check"
echo
if command -v conda > /dev/null 2>&1; then
  echo conda is available
  # https://www.pugetsystems.com/eotags/hpc/Install-TensorFlow-with-GPU-Support-on-Windows-10-without-a-full-CUDA-install-1172/        

  conda info --envs
  conda list
  
  echo "# conda tensorflow-gpu"
  conda install tensorflow-gpu
  
  echo "# conda keras"
  conda install keras
  
  echo "# conda tqdm"
  conda instal
  
  echo "# conda pillow"
  conda install pillow
  
  echo "# conda numpy"
  conda install numpy
  
  echo "# conda requests"
  conda install requests
  
  echo "# conda gdown"
  conda install -c vladsaveliev gdown
  
  echo "# conda opencv"
  conda install -c conda-forge opencv
  
  echo "# conda dnnlib"
  conda install dnnlib        
  
  echo "# conda dlib"
  conda install -c conda-forge dlib            
  
  echo "# conda cudatoolkit"
  conda install cudatoolkit
  
  echo "# conda  update --all"
  conda update --all

else
  echo conda is not available
  echo install Anaconda3-5.2.0-Linux-x86_64

  wget https://repo.continuum.io/archive/Anaconda3-2019.07-Linux-x86_64.sh

  chmod +x ./Anaconda3-2019.07-Linux-x86_64.sh
  bash ./Anaconda3-2019.07-Linux-x86_64.sh
  echo "# add conda to path"
  export PATH=~/anaconda3/bin:$PATH
  echo "# update conda"
  conda update -n base -c defaults conda

fi


`,
          },
        }],

        __eodoc_999: `
      ╭─────────────────────────────────────────────╮
      │       999 END                               │
      ╰─────────────────────────────────────────────╯`,
        __eobreak__end: `break end`,

      }
      return parcel
    }

    // ....................... enty
    let enty = {}

    enty.getState = () => state

    return enty
  }

  exports.eonitem = eonitem
})

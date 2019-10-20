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
    const {report} = require('eodoes-muons')
    const {wstree} = require('eodoes-muons')

    const { filer } = require('eodoes-muons')
    const { resolvepath } = filer

    let isWin = process.platform === 'win32'
    let isLinux = process.platform === 'linux' // eslint-disable-line no-unused-vars

    let state = {

      helpmsg: ` 
      will create the eonic portable workspace

      usage:      
      > node ./scripts/run eodoes-eodo-eospace ../eosites eoparse --eon eospace
      > node ./scripts/run eodoes-eodo-eospace ../../.. eoparse --eon e --doc --microkey _s_

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
      /* eslint-enable no-unused-vars */

      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      /**
       *  parcel
       */
      let parcel = { // ---------------------- parcel

        __eodoc_000: `
      ╭─────────────────────────────────────────────────────────╮
      │  000  create eospace                                    │
      ╰─────────────────────────────────────────────────────────╯`,

        //
        // 101 s readme
        //
        __eofiles_s_readme_101: [{
          resolve: `s/readme.txt`,
          options: {
            content: `101 create s: scripts

create shortcut with 
drive eg: G:
site eg: e
Traget: C:\\Windows\\System32\\cmd.exe /K "{{drive}} && {{drive}}\\{{site}}\\s\\w.bat && CD {{drive}}\\{{site}}\\c"
Start in: {{drive}}\\{{drive}}\\c\\
`,
          },
        } ],

        __eofiles_s_w_102: [{
          resolve: `s/w.bat`,
          options: {
            __eodoc: `102 create s/w.bat`,
            content: `
echo off

SET scriptPath=%~dp0 
SET HOMEDRIVE=%scriptPath:~0,2%
SET scriptDir=%scriptPath:~0,-1%
%HOMEDRIVE% && CD %scriptDir%
echo scriptDir: %scriptDir%

pushd %scriptDir%
pushd ..
set entryDir=%cd%
echo entryDir: %entryDir%
set sysDir=%cd%
echo sysDir: %sysDir%
popd

:WINPRGS
SET WINPATH="C:\\Program Files (x86)\\"

:XCRIPTS
set xcriptDir=%entryDir%\\s
set PATH=%xcriptDir%;%Path%

:PORT
set portEntryDir=%entryDir%
set portDir=%entryDir%\\p
echo portDir=%portDir%

doskey pretty=git log --pretty=format:"%%h%%x09%%ad%%x09%%s" --date=short
doskey tweet=git log --pretty=format:"%%h%%x09%%ad%%x09%%s" --date=short --grep=tweet

:HOME_PORTABLE
set homeDir=%entryDir%\\h
set HOME=%homeDir%
set HOMEPATH=%homeDir%

:DATA_PORTABLE
SET APPDATA=%homeDir%\\AppData
SET LOCALAPPDATA=%homeDir%\\AppData

:TEMP_PORTABLE
SET TMP=%homeDir%\\tmp
SET TEMP=%homeDir%\\temp
SET USERPROFILE=%homeDir%

:ROOT_PORTABLE
set rootDir=%entryDir%\\e

:NODE
echo "set nodeDir to be %rootDir%"
set nodeDir=%rootDir%
echo "add %nodeDir% to PATH"
set Path=%nodeDir%;%Path%
set NODE_PATH=%nodeDir%\\node_modules

set NODE_ENV=development
echo|set /p=node:
node -v
echo|set /p=npm:
call npm --version
call npm root -g

REM npm will save here registry.npmjs.org/:_authToken
set NPM_CONFIG_USERCONFIG=%homeDir%\\.npmrc

:CODE
set workDir=%entryDir%\\c
cd %workDir%
echo currentDir: %workDir%

`,
          },
        } ],

        //
        // 110 c readme
        //
        __eofiles_c_readme: [{
          resolve: `c/readme.txt`,
          options: {
            __eodoc: `110 create c: code`,
            content: `c: code

        will have code folder c/eodo
        c/eodo will have .eslintrc.js
        vscode will open with vscode . in c/eodo
        `,
          },
        } ],
        //
        // 120 d readme
        //
        __eofiles_d: [{
          resolve: `d/readme.txt`,
          options: {
            __eodoc: `120 create d/readme.txt`,
            content: `data`,
          },
        }],
        //
        // 130 e readme
        //
        __eofiles_e: [{
          resolve: `e/readme.txt`,
          options: {
            __eodoc: `130 create e: root`,
            content: `root`,
          },
        }],
        //
        // 132 e npm fetch
        //
        __eofetch_e_npm_fetch: [{ // e
          resolve: `http://nodejs.org/dist/npm/npm-1.4.9.zip`,
          options: {
            __eodoc: `132 download npm tar`,
            file: `e/npm-1.4.9.zip`,
          },
        }],
        //
        // 134 e npm unzip
        //
        __eounzip_e_npm_unzip: [{
          resolve: `e/npm-1.4.9.zip`,
          options: {
            __eodoc: `134 unzip npm tar`,
            folder: `e`,
          },
        }],
        //
        // 136 e node fetch
        //
        __eofetch_e_node: [{
          resolve: isWin
            ? `http://nodejs.org/dist/v10.16.2/node-v10.16.2-win-x64.zip`
            : `http://nodejs.org/dist/v10.16.2/node-v10.16.2-linux-x64.tar.gz`,
          options: {
            __eodoc: `136 download node tar`,
            file: isWin
              ? `e/node-v10.16.2-win-x64.zip`
              : `e/node-v10.16.2-linux-x64.tar.gz`,
          },
        }],
        //
        // 138 e node unzip
        //
        __eounzip_e_node: [{
          resolve: isWin
            ? `e/node-v10.16.2-win-x64.zip`
            : `e/node-v10.16.2-linux-x64.tar.gz`,
          options: {
            __eodoc: `138 unzip node tar`,
            folder: `e`,
          },
        }],
        //
        // 139 e node move
        //
        __eofolders_e_node: [{
          resolve: `e`,
          options: {
            __eodoc: `139 copy unzipped node folder to parent`,
            path: isWin
              ? `e/node-v10.16.2-win-x64` // from
              : `e`, // _e_
          },
        }],
        //
        // 140 g readme
        //
        __eofiles_g: [{ // g
          resolve: `g/readme.txt`,
          options: {
            __eodoc: `140 create g/readme.txt`,
            content: `graphics`,
          },
        }],
        //
        // 150 h readme
        //
        __eofiles_h: [{
          resolve: `h/readme.txt`,
          options: {
            __eodoc: `150 create h: home`,
            content: `
home
./AppData/npm-cache 
./temp/npm-2200-7e56ed13
./.vscode/extensions
./.ssh/id_rsa
./.ssh/id_rsa.pub
./.ssh/known_hosts

check that ssh looks for keys here with
> ssh -vT git@github.com
`,
          },
        }],
        //
        // 152 h npmrc
        //
        __eofiles_h_npm: [{
          resolve: `h/.npmrc`,
          options: {
            __eodoc: `152 create h/.npmrc inc authToken`,
            content: `//registry.npmjs.org/:_authToken=`,
          },
        }],
        //
        // 160 h folders
        // h/AppData/Roaming - vscode
        //
        __eofolders_h: ['h/AppData', 'h/AppData/Roaming', 'h/temp', 'h/tmp', 'h/.ssh', 'h/.vscode'],

        __eofiles_i: [{ // i
          resolve: `i/readme.txt`,
          options: {
            __eodoc: `160 create i: invest`,
            content: `i: invest`,
          },
        }],
        //
        // 170 m readme
        //
        __eofiles_m: [{
          resolve: `m/readme.txt`,
          options: {
            __eodoc: `170 create m: movies`,
            content: `movies`,
          },
        }],
        //
        // 180 p readme
        //
        __eofiles_p: [{
          resolve: `p/readme.txt`,
          options: {
            __eodoc: `180 create p: portable`,
            content: ``,
          },
        }],
        //
        // 182 p git fetch
        //
        __eofetch_p_git: [{
          resolve: `https://github.com/sifbuilder/PortableGit-2.8.0-64-bit/archive/master.zip`,
          options: {
            __eodoc: `182 PortableGit-2.8.0-64-bit`,
            file: `p/PortableGit-2.8.0-64-bit.zip`,
          },
        } ],
        //
        // 184 p git unzip
        //
        __eounzip_p_git: [{
          resolve: `p/PortableGit-2.8.0-64-bit.zip`,
          options: {
            __eodoc: `184 unzip eodo git`,
            folder: `p`,
          },
        }],
        //
        // 186 p git move
        //
        __eofolders_p_git: [{
          resolve: `p/PortableGit`,
          options: {
            __eodoc: `186 copy unzipped git to abstract folder`,
            path: `p/PortableGit-2.8.0-64-bit-master`,
          },
        }],
        //
        // 187 add git to s/w.bat
        //
        __eofiles_s_w_git_187: [{
          resolve: `s/w.bat`,
          options: {
            op: 'append',
            content: `
:PORTGIT
set Path=%portDir%\\PortableGit;%path%
set Path=%portDir%\\PortableGit\\cmd;%path%
set Path=%portDir%\\PortableGit\\usr\\bin;%path%
set Path=%portDir%\\PortableGit\\mingw64\\libexec\\git-core;%path%
set Path=%portDir%\\PortableGit\\mingw64\\bin;%path%

:GIT
set gitdir=%portDir%
git --version
git config --global user.name "sifbuilder"
git config --global user.email sifbuilder@gmail.com
git config --global core.longpaths true
REM set HOME=%cd%/home
REM git --cd-to-home            
`,
          },
        }],
        //
        // 188 p vscode signature
        //
        __eofiles_p_vscode_sign: [{ // p vscode
          resolve: 'p/VSCode/data/signature.txt',
          options: {
            __eodoc: `188 create VSCode signature`,
            content: `VSCode: ` + new Date(),
          },
        }],
        //
        // 190 p vscode fetch
        //
        __eofetch_p_vscode: [{
          resolve: `https://go.microsoft.com/fwlink/?Linkid=850640`,
          options: {
            __eodoc: `190 download vscode
            https://code.visualstudio.com/
            https://code.visualstudio.com/docs/?dv=winzip&build=insiders            `,
            file: `p/VSCode-insiders.zip`,
          },
        }],
        //
        // 192 p vscode unzip
        //
        __eounzip_p_vscode: [{
          resolve: `p/VSCode-insiders.zip`,
          options: {
            __eodoc: `192 unzip vscode tar`,
            folder: `p/VSCode`,
          },
        }],
        //
        // 194 p vscode settings
        //
        __eofiles_p_vscode_config: [{
          resolve: `p/VSCode/data/user-data/User/settings.json`,
          options: {
            __eodoc: `194 create c/eodo/.vscode/settings.json`,
            // Windows %APPDATA%\Code\User\settings.json
            // Mac $HOME/Library/Application Support/Code/User/settings.json
            // Linux $HOME/.config/Code/User/settings.json
            content: `
 {
"editor.minimap.enabled": false,
"git.enabled": true,
"git.path": "%entryDir%\\\\p\\\\PortableGit\\\\mingw64\\\\bin\\\\git.exe",
"terminal.integrated.shell.windows": "C:\\\\Windows\\\\System32\\\\cmd.exe",
"terminal.integrated.shellArgs.windows": [
    "/k",
    "%entryDir%\\\\s\\\\win\\\\w.bat"
],
"editor.detectIndentation": true,
"editor.tabSize": 2,
"editor.insertSpaces": true,
"eslint.enable": true,
"eslint.run": "onType",
"eslint.options": { "configFile": ".eslintrc.js" },
"eslint.nodePath": "%entryDir%\\\\e\\\\node.exe",
"eslint.alwaysShowStatus": true,
"eslint.autoFixOnSave": false,
"eslint.validate": [ "javascript", { "language": "html", "autoFix": true } ],
}
`,
          },
        },
        {
          resolve: `p/VSCode/data/user-data/User/launch.json`,
          options: {
            __eodoc: `196 create c/eodo/.vscode/launch.json`,
            content: `
{
  "version": "0.0.1",
  "configurations": [
      {
        "type": "node",
        "request": "launch",
        "name": "Launch readme",
        "program": "\${workspaceFolder}\\\\app.js",
        "runtimeExecutable": "%entryDir%\\\\e\\\\node.exe"
      },
      {
        "type": "chrome",
        "request": "launch",
        "name": "Launch Chrome against localhost",
        "url": "http://localhost:8080",
        "webRoot": "\${workspaceFolder}"
    }
    ]
}
`,
          },
        },
        {
          resolve: `p/VSCode/data/user-data/User/keybindings.json`,
          options: {
            __eodoc: `198 create c/eodo/.vscode/keybindings.json`,
            content: `
[
  {
      "key": "ctrl+alt+win+x",
      "command": "console.log.wrap.down.prefix",
      "when": "editorTextFocus"
  },
  {
      "key": "ctrl+alt+win+c",
      "command": "eslint.executeAutofix"
  },
  {
      "key":  "alt+q",
      "command": "workbench.action.terminal.sendSequence",
      "args": {
        "text": "workspaceFolder: \\\${workspaceFolder}",
      }
    }
]
`,
          },
        } ],
        //
        // 196 add vscode to s/w.bat
        //
        __eofiles_s_w_vscode_196: [{
          resolve: `s/w.bat`,
          options: {
            op: 'append',
            content: `
:VSCODE
set PATH=%portDir%\\VSCode;%PATH%
echo|set /p=vscode:
call %portDir%\\VSCode\\bin\\code-insiders -v
doskey vscode=%portDir%\\VSCode\\bin\\code-insiders $*
`,
          },
        }],
        //
        // 200 p vscode extensions
        //
        __eoexec_p_vscode_extensions: [{
          resolve: `p/vscode/bin/code-insiders --install-extension dsznajder.es7-react-js-snippets`,
          options: {
            __eodoc: `200 vscode extension: ES7 React/Redux/GraphQL/React-Native snippets`,
            cwd: ``,
          },
        },
        {
          resolve: `p/vscode/bin/code-insiders --install-extension dbaeumer.vscode-eslint
          `,
          options: {
            __eodoc: `202 VS Code ESLint extension: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint`,
            cwd: ``,
          },
        },
        {
          resolve: `p/vscode/bin/code-insiders --install-extension msjsdiag.debugger-for-chrome
          `,
          options: {
            __eodoc: `204 Debugger for Chrome: https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome`,
            cwd: ``,
          },
        },
        {
          resolve: `p/vscode/bin/code-insiders --install-extension CoenraadS.bracket-pair-colorizer
          `,
          options: {
            __eodoc: `206 Bracket Pair Colorizer: https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer`,
            cwd: ``,
          },
        },
        {
          resolve: `p/vscode/bin/code-insiders --install-extension KnisterPeter.vscode-github
          `,
          options: {
            __eodoc: `208 GitHub: https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-github`,
            cwd: ``,
          },
        },
        {
          resolve: `p/vscode/bin/code-insiders --install-extension midnightsyntax.vscode-wrap-console-log
          `,
          options: {
            __eodoc: `210 https://marketplace.visualstudio.com/items?itemName=midnightsyntax.vscode-wrap-console-log`,
            cwd: ``,
          },
        },
        {
          resolve: `p/vscode/bin/code-insiders --install-extension ms-vscode-remote.vscode-remote-extensionpack
          `,
          options: {
            __eodoc: `211 https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack`,
            cwd: ``,
          },
        } ],
        //
        // 212 p python fetch
        //
        __eofetch_p_python_212: [{
          resolve: `https://www.python.org/ftp/python/3.7.4/python-3.7.4-embed-amd64.zip`,
          options: {
            __eodoc: `212 download python tar`,
            file: `p/python-3.7.4-embed-amd64.zip`,
          },
        }],
        //
        // 214 p python unzip
        //
        __eounzip_p_python_214: [{
          resolve: `p/python-3.7.4-embed-amd64.zip`,
          options: {
            __eodoc: `214 unzip python tar`,
            folder: `p/python`,
          },
        }],

        //
        // 216 add to s/w.bat
        //
        __eofiles_s_w_python_216: [{
          resolve: `s/w.bat`,
          options: {
            op: 'append',
            content: `
:PYTHON
set PYTHONPATH=%portDir%\\python
set PATH=%PYTHONPATH%;%PATH%

call python --version



`,
          },
        }],
        //
        // 217 p python pip
        //
        __eofiles_p_python_pip_217: [{
          resolve: `p/python/python37._pth`,
          options: {
            __eodoc: `217 p/python37._pth https://stackoverflow.com/questions/42666121/pip-with-embedded-python`,
            content: `python37.zip
.

# Uncomment to run site.main() automatically
# import site
import site
`,
          },
        }],
        //
        // 218 p python pip
        //
        __eofetch_p_python_pip_218: [{
          resolve: `https://bootstrap.pypa.io/get-pip.py`,
          options: {
            __eodoc: `218 download get-pip.py`,
            file: `p/python/get-pip.py`,
          },
        }],
        //
        // 219 npm install eslint
        //
        __eoexec_python_pip_get_219: [{
          resolve: `python get-pip.py`,
          options: {
            __eodoc: `219 install pip`,
            cwd: `p/python`,
          },
        }],
        //
        // 220 add to s/w.bat
        //
        __eofiles_s_w_pip_220: [{
          resolve: `s/w.bat`,
          options: {
            op: 'append',
            content: `
set PYTHONLIB=%portDir%\\python\\Lib
set PYTHONSCRIPTS=%portDir%\\python\\Scripts
set PYTHONPATH=%PYTHONPATH%;%PYTHONLIB%
set PATH=%PYTHONPATH%;%PATH%
set PATH=%PYTHONSCRIPTS%;%PATH%

call pip --version


`,
          },
        }],
        //
        // 230 r readme
        //
        __eofiles_r: [{
          resolve: `r/readme.txt`,
          options: {
            content: `230 create r: readings`,
          },
        }],
        //
        // 240 t readme
        //
        __eofiles_t: [{ // t
          resolve: `t/readme.txt`,
          options: {
            __eodoc: `240 create t: tmp`,
            content: `tmp`,
          },
        }],
        //
        // 250 v readme
        //
        __eofiles_v: [{
          resolve: `v/readme.txt`,
          options: {
            content: `250 video`,
          },
        }],
        //
        // 260 x readme
        //
        __eofiles_x: [{
          resolve: `x/readme.txt`,
          options: {
            content: `260 package`,
          },
        }],

        //
        // 280 show npm prefix
        //
        __eoexec_show_env: {
          resolve: `npm get prefix`,
          options: {
            __eodoc: `280 show npm prefix`,
            cwd: ``,
          },
        },
        //
        // 300 npm install npm@latest
        //
        __eoexec_npm_latest_300: {
          resolve: `npm --prefix ${resolvepath(['e'])}  install -g npm@latest`,
          options: {
            __eodoc: `300 npm install -g npm@latest in ${resolvepath(['e'])} `,
            cwd: `e`, // root
          },
        },
        //
        // 310 npm install yarn@latest
        //
        __eoexec_yarn_latest_320: [{
          resolve: `npm --prefix ${resolvepath(['e'])} install -g yarn@latest`,
          options: {
            __eodoc: `310 npm install yarn in ${resolvepath(['e'])}`,
            cwd: ``,
          },
        }],
        //
        // 320 npm install eslint
        //
        __eoexec_npm_eslint_320: [{
          resolve: `npm --prefix ${resolvepath(['e'])}  install -g eslint`,
          options: {
            __eodoc: `320 npm install eslint in ${resolvepath([eoroot, 'e'])}`,
            cwd: ``,
          },
        },
        {
          resolve: `npm --prefix ${resolvepath(['e'])}  install -g eslint-plugin-html`,
          options: {
            __eodoc: `npm install eslint-plugin-html in ${resolvepath([eoroot, 'e'])}`,
            cwd: ``,
          },
        },
        {
          resolve: `npm --prefix ${resolvepath(['e'])} install -g eslint-plugin-destructuring`,
          options: {
            __eodoc: `npm install eslint-plugin-destructuring in ${resolvepath(['e'])}`,
            cwd: ``,
          },
        } ],
        //
        // 330 npm install gatsby
        //
        __eoexec_npm_gatsby_330: [{
          resolve: `npm --prefix ${resolvepath(['e'])} install -g gatsby`,
          options: {
            __eodoc: `330 npm install -g gatsby in ${resolvepath([eoroot, 'e'])}`,
            cwd: ``,
          },
        } ],
        //
        // 340 npm install netlify
        //
        __eoexec_npm_netlify_340: [{
          resolve: `npm --prefix ${resolvepath(['e'])} install -g netlify-cli`,
          options: {
            __eodoc: `340 npm install -g netlify-cli in ${resolvepath([eoroot, 'e'])}`,
            cwd: ``,
          },
        } ],
        //
        // 350 npm install git
        //
        __eoexec_git_latest_350: [{
          resolve: author
            ? `git config --global user.name ${author}`
            : ``,
          options: {
            __eodoc: author
              ? `git config --global user.name ${author}`
              : `no author registered`,
            cwd: ``,
          },
        },
        {
          resolve: email
            ? `git config --global user.email ${email}`
            : ``,
          options: {
            __eodoc: email
              ? `git config --global user.email ${email}`
              : `no email registered`,
            cwd: ``,
          },
        } ],

        //
        // 500 s win
        //
        __eofiles_s_win_500: [{
          resolve: `s/win.js`,
          options: {
            content: `
const fs = require('fs')
const path = require('path')

let entryDir = path.basename(process.cwd())
let directoryExists = (filePath) => {
  try {
    return fs.statSync(filePath).isDirectory()
  } catch (err) {
    return false
  }
}

if (directoryExists('.git')) console.log('git repository')
// python -m pip install jupyter


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

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
      will opencv4nodejs

      usage:      
      > node ./scripts/run eodoes-eodo-opencv4nodejs ../eosites eoparse
`,

      eotags: {
        '--useWorkspaces': false, // use workspaces
        '--setCredentials': false, // set aws credentials
        '--isOffline': false, // https://medium.com/@kilgarenone/setting-up-serverless-2f811486573b
        '--doLog': false, // save log to file
      },

      workspaces: [
        'compiler',
        'dashboard',
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
          │ 000 opencv4nodejs                                          │
          │ https://www.npmjs.com/package/opencv4nodejs                │
          │ https://github.com/justadudewhohacks/opencv4nodejs         │
          │                         TO BE DONE                         │
          ╰────────────────────────────────────────────────────────────╯`,
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
            __eodoc: `060 ws0 manifest`,
            content: {
              'name': useWorkspaces
                ? `${workspaces[0]}`
                : `${eon}`,
              version: `${version}`,
              license: `${license}`,
              private: false,
              scripts: {
                'ing': 'node index.js',
              },
              'dependencies': {
                'opencv4nodejs': '*',
                'windows-build-tools': '*',
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
        // 100 index
        //
        __eofiles_index_100: [
          {
            resolve: useWorkspaces
              ? `${workspacePaths[0]}index.js`
              : `index.js`,
            options: {
              __eodoc: `100 create index.js https://www.npmjs.com/package/opencv4nodejs`,
              content: `
'use strict'

const cv = require('opencv4nodejs');

const rows = 100; // height
const cols = 100; // width
 
// empty Mat
const emptyMat = new cv.Mat(rows, cols, cv.CV_8UC3);
 
// fill the Mat with default value
const whiteMat = new cv.Mat(rows, cols, cv.CV_8UC1, 255);
const blueMat = new cv.Mat(rows, cols, cv.CV_8UC3, [255, 0, 0]);
 
// from array (3x3 Matrix, 3 channels)
const matData = [
  [[255, 0, 0], [255, 0, 0], [255, 0, 0]],
  [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  [[255, 0, 0], [255, 0, 0], [255, 0, 0]]
];
const matFromArray = new cv.Mat(matData, cv.CV_8UC3);
 
// from node buffer
const charData = [255, 0, ...];
const matFromArray = new cv.Mat(Buffer.from(charData), rows, cols, cv.CV_8UC3);
 
// Point
const pt2 = new cv.Point(100, 100);
const pt3 = new cv.Point(100, 100, 0.5);
 
// Vector
const vec2 = new cv.Vec(100, 100);
const vec3 = new cv.Vec(100, 100, 0.5);
const vec4 = new cv.Vec(100, 100, 0.5, 0.5);
`,
            },
          } ],
        //
        // 200 run
        //
        __eoexec_yarn_200: [{
          resolve: `yarn run ing`,
          options: {
            __eodoc: `200 run`,
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

    // ....................... enty
    let enty = {}
    enty.getState = () => state
    return enty
  }

  exports.eonitem = eonitem
})

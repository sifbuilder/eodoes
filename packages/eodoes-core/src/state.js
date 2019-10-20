/**********************
 *    eodoes-core/state
 */
const state = {

  config: {
    ide: 'vscode',
  },

  eopars: [ // positional arguments - compete with flags
    'eodo',
    'eodir',
  ],
  eotags: {
    '--debug': false, // console log debug msgs
    '--doc': false, // show doc microevent msgs
    '--doit': false, // force tag
    '--help': false,
    '--hold': false, // hold signal
    '--track': false, // show changes to __ state
    '--nomsg': false, // about exec stream
    '--noout': false, // about exec stream
    '--noerr': false, // about exec stream
    '--silent': false, // yarn silent
    '--trace': false, // show trace values
    '--verb': false, // show verbose
    '--view': false, // send eoview microevents to browser
    '--useWorkspaces': false, // use workspaces
    '--author': 'sifbuilder',
    '--descr': 'eonized space',
    '--email': 'sifbuilder@gmail.com',
    '--gitmsg': 'init_git',
    '--license': 'GPL-3.0',
    '--manager': 'yarn',
    '--version': '0.0.1',
  },

  doevents: [],
  argv: [],

  posixsep: '/',
  eoprefix: 'eo_',

  // ... does patter: eon-does-
  inScopePattern: new RegExp(
    `^(?<prefixCodeName>(?<name>.*)).(?<ext>js)$`,
    'i'
  ),
  outScopePattern: new RegExp(
    `^(?<prefixCodeName>(?<name>.*)).(?<type>test).(?<ext>js)$`,
    'i'
  ),

  recordfile: 'eodolog.txt',

  viewopts: {
    protocol: 'http',
    host: 'localhost',
    port: 8000,
  },

  browseopts: {
    headless: false, // puppeteer.launch
    devtools: false, // puppeteer.launch
    debuggingPort: 9222, // puppeteer.launch
    window: { // puppeteer.launch
      width: 750,
      height: 900,
    },
    fullPage: false,
    delay: 50000, // waitInPromise
    timeout: 50000, // page.goto
    pageSelector: '#viewframe', // page.waitForSelector
    tracing: false,
    tracingpath: 'trace.json',
    screenshots: true,
    closebrowser: 0,
    viewPort: { // page.setViewport
      width: 600 + 8 + 8, // add body margin
      height: 900 + 8 + 8, // add body margin
    },
    browseargs: [
      `--disable-infobars`,
      `--remote-debugging-port=9222`, // from debuggingPort
      `--window-size=767,900`, // Window size from viewPort
    ],
  },

  pageopts: {
    waitUntil: 'networkidle2', // 'domcontentloaded',
    timeout: 5000,
  },

  watchopts: {
    change: `**/gatsby-node*.*`, // GLOBSTAR
    config: {
      ignored: [`node_modules/**/*`],
      persistent: true,
      useFsEvents: false,
    },
  },

  reportopts: {
    blankpad: 0, // blank margin in m.report.doc
    termsep: ':', // term separator in m.report.doc
    parasepsep: '\n', // paragraph separator in m.report.doc
  },

  eventsopts: {
    delay: 2969,
  },

}

module.exports = { ...state }

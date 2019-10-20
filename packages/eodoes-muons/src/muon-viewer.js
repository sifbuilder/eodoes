/**********************
  *     eodoes-muons/muon-viewer
  */
const waitPort = require('wait-port')

// .................. visualizer
const visualizer = async (data, __) => {
  let res, puppeteer
  try {
    puppeteer = require(`puppeteer`)
    res = puppeteer
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      //
    }
  }
  return res
}

// .................. setBrowser
const setBrowser = async (data, __) => {
  const {report} = require('eodoes-muons')

  let { viewopts, browseopts } = __
  let { browseargs } = browseopts

  let { url } = data
  url = url || `${viewopts.protocol}://${viewopts.host}:${viewopts.port}/`

  const { headless, devtools } = browseopts

  let {browser} = __
  if (browser) {
    report.debug({_msg: `browser already defined`}, __)
  } else {
    report.trace({url, browseargs}, __)

    let viewer = await visualizer(data, __)
    browser = await viewer.launch({ // viewer puppeteer
      headless: headless,
      devtools: devtools, // open DevTools when window launches
      // https://chromium.googlesource.com/chromium/src/
      args: browseargs,
    })

    let connected = 0
    browser.on('connected', () => {
      connected = 1
    })

    __ = __.updState({connected}, __)
    __ = __.updState({browser}, __)
  }

  return __
}

// .................. gotoPage
const gotoPage = async function (data, __) {
  const {report} = require('eodoes-muons')

  let {browser } = __
  let {onepage} = __.eonopts

  let viewopts = data.viewopts
    ? Object.assign({}, __.viewopts, data.viewopts)
    : __.viewopts

  let url = data.url
    ? data.url
    // : `${viewopts.protocol}://${viewopts.host}:${viewopts.port}/`
    : `${viewopts.protocol}://${viewopts.host}/`
  let opts = data.opts
    ? Object.assign({}, __.pageopts, data.opts)
    : __.pageopts

  report.trace({url}, __)
  const urlObj = new URL(url)

  let port = urlObj.port

  if (port !== undefined) {
    port = Number(port)
  } else {
    port = Number(viewopts.port)
  }
  const host = urlObj.hostname

  // https://www.npmjs.com/package/wait-port
  // let open = await waitPort(viewopts) // waitPort
  let open = port
    ? await waitPort({ host, port }) // waitPort
    : Promise.resolve(true)

  if (browser && open) { // if open after waiting port
    try {
      const pages = await browser.pages()
      let page
      if (onepage) {
        if (pages.length === 0) await pages.push(await browser.newPage())
        page = pages[0]
      } else {
        page = await browser.newPage()
      }
      await page.goto(url, opts)
      __ = __.updState({ page }, __)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(` ${e} could not connect to server  perhaps develop event is missing `)
    }
  }
  return true
}

let viewer = {
  visualizer,
  setBrowser,
  gotoPage,
  puppeteer: visualizer,
}
module.exports = { viewer }

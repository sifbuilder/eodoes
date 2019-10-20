/**********************
  *    eodoes-muons/muon-convert
  */

const path = require('path')
const {viewer} = require('eodoes-muons')

const { filer } = require('./muon-filer')

/**********************
  * waitInPromise
  */

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)

/**********************
  * convert
  */

const convert = async (data, __) => {
  let { eoroot } = __
  let { pos = '0x0', size = '100x100', imgfile } = Object.assign({}, __.eonopts, data)

  let { headless, devtools, debuggingPort, window } = __.browse
  let { viewPort, timeout, delay } = __.browse
  let { closebrowser } = __

  let imgpos = pos.split('x').map(d => +d)
  let imgsize = size.split('x').map(d => +d)

  let visualizer = await viewer.visualizer(data, __)
  if (visualizer !== undefined && visualizer !== null) { // there is an eovisualizer
    const browser = await visualizer.launch({ // puppeteer
      headless: headless,
      devtools: devtools, // open DevTools when window launches
      args: [
        `--remote-debugging-port=${debuggingPort}`,
        `--window-size=${window.width},${window.height}`, // window size
      ],
    })

    let filePath = path.join(eoroot, imgfile)
    let eonUri = filePath

    const page = await browser.newPage()
    page.setViewport(viewPort) // viewport
    await page.goto(filer.fileuri(eonUri), {
      waitUntil: 'domcontentloaded',
      timeout: timeout, // timeout
    })
    await waitInPromise(delay)(page.content())
    page.on('pageerror', err => { console.log('page error: ' + err.toString()) }) // eslint-disable-line no-console
    page.on('error', err => { console.log('error: ' + err.toString()) }) // eslint-disable-line no-console
    await page.evaluate(() => console.log(`url is ${location.href}`)) // eslint-disable-line no-console

    let itemOpts = Object.assign({}, __.eonopts, {
      path: `${eoroot}/test.png`,
      type: 'png',
      clip: {
        x: imgpos[0],
        y: imgpos[1],
        width: imgsize[0],
        height: imgsize[1],
      },
    })

    await page.screenshot(itemOpts)

    if (closebrowser) await browser.close()
  }
}

module.exports = { convert }

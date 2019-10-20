/**********************
  *    microevent-eofetch
  */

const path = require('path')
const fsExtra = require('fs-extra')
const {report} = require('eodoes-muons')
const {processParcelPod} = require('eodoes-muons')
const util = require(`util`)
const streamPipeline = util.promisify(require('stream').pipeline)
const nodeFetch = require(`node-fetch`)
const { filer } = require('eodoes-muons')
const { resolvepath, dirUpdSync } = filer

// .................. fetch
const fetch = async function (data, __) {
  let {url} = data
  let response = await nodeFetch(url)
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
  return response
}

/**********************
  * eofetch
  */

const eofetch = async (data, __) => {
  let {eoroot} = __
  let {parcel} = data
  let {inland = true} = __

  if (inland) {
    parcel = Array.isArray(parcel) ? parcel : Array.of(parcel) // arrayfy
    for (let item of parcel) {
      if (typeof item === 'string') {
        //
      } else if (typeof item === 'object') {
        item = await processParcelPod({item}, __)
        let {resolve, options} = item

        let url = resolve
        if (filer.isURL(url) === true) {
          let {file} = options

          let filePath = resolvepath(eoroot, file)
          let folderPath = path.dirname(filePath)
          report.debug(`mevent.eofetch:: dirUpdSync ${folderPath}`, __)
          dirUpdSync({
            twd: folderPath, // preventively create target folder
          })
          report.debug(`mevent.eofetch:: fetch ${url}`, __)

          const response = await fetch({url})

          if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)

          report.debug(`mevent.eofetch:: streamPipeline ${filePath}`, __)
          await streamPipeline(response.body, fsExtra.createWriteStream(filePath))
        } else {
          // eslint-disable-next-line no-console
          console.log(`eofetch not url "${url}"`)
        }
      }
    }
  }
}

module.exports = { eofetch }

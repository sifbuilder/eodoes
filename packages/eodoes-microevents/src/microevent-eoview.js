/**********************
  *    microevent-eoview
  */

const url = require('url')
const {report} = require('eodoes-muons')
const {processParcelPod} = require('eodoes-muons')
const {viewer} = require('eodoes-muons')

/**********************
      * eoview
      */
const eoview = async (data, __) => {
  let { parcel } = data
  let { inland = true } = __
  let {view: doview} = __.eonopts

  if (doview && inland) {
    parcel = await processParcelPod({item: parcel}, __)
    report.trace({parcel}, __)

    let uri
    if (typeof parcel === 'string') {
      uri = parcel
    } else if (typeof parcel === 'object') {
      let item = await processParcelPod({item: parcel}, __)
      let {resolve} = item
      uri = resolve
    }
    const viewopts = url.parse(uri)
    data.url = uri
    data.viewopts = viewopts

    let visualizer = await viewer.visualizer(data, __)
    if (visualizer !== undefined && visualizer !== null) { // there is an eoviewer
      let { browser } = __ // set in m.visualizer
      if (browser === undefined) { // try visualizer to get browser
        report.debug(`mevent.eoview: setBrowser`, __)
        await viewer.setBrowser(data, __)
      }
      report.debug(`mevent.eoview: gotoPage ${uri}`, __)
      await viewer.gotoPage(data, __)
    }
  }
}

module.exports = { eoview }

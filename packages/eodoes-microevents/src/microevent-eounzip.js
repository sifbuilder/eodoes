/**********************
  *    eodoes-microevents/microevent-eounzip
  */
const fsExtra = require('fs-extra')
const unzip = require('unzip-stream')
const util = require(`util`)
const streamPipeline = util.promisify(require('stream').pipeline)

const {report} = require('eodoes-muons')
const {processParcelPod} = require('eodoes-muons')
const { filer } = require('eodoes-muons')
const { resolvepath } = filer

/**********************
  * eounzip
  */
const eounzip = async (data, __) => {
  let {parcel} = data
  let {eoroot} = __
  let {inland = true} = __

  if (inland) {
    parcel = Array.isArray(parcel) ? parcel : Array.of(parcel) // arrayfy

    for (let item of parcel) {
      if (typeof item === 'string') {
        //
      } else if (typeof item === 'object') {
        item = await processParcelPod({item}, __)
        let {resolve, options} = item
        let fromFile = resolve
        let {folder} = options
        let toFolder = folder

        let fromFilePath = resolvepath(eoroot, fromFile)
        let srcExists = filer.fileExistsSync(fromFilePath)
        if (srcExists) {
          let toFolderPath = resolvepath(eoroot, toFolder)

          report.trace({fromFile, fromFilePath, toFolder, toFolderPath}, __)
          report.debug(`mevent.eounzip: streamPipeline ${fromFilePath} ${toFolderPath}`, __)

          await streamPipeline(fsExtra.createReadStream(fromFilePath), unzip.Extract({path: toFolderPath }))
        } else {
          // eslint-disable-next-line no-console
          console.info(`tar file "${fromFile}" not found`)
        }
      }
    }
  }
}

module.exports = { eounzip }

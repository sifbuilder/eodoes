/**********************
  *    microevent-eoconfig
  */

const {report} = require('eodoes-muons')
const {processParcelPod} = require('eodoes-muons')
const { filer } = require('eodoes-muons')
const { resolvepath, fileUpdSync } = filer

/**********************
  * eoconfig
  */
const eoconfig = async (data, __) => {
  let { parcel } = data
  let { eoroot } = __
  let { inland = true } = __
  let { cwdDirPath, eodoDirPath, eodoesPath, eodoesLibPath } = __
  let {resolve, options, header, tail} = parcel
  report.trace({eoroot, cwdDirPath, eodoDirPath, eodoesPath, eodoesLibPath}, __)
  report.trace({resolve, options}, __)

  if (inland) {
    let srcPath = '' // file to include path part
    let dstPath = resolvepath(eoroot, resolve)
    report.trace({srcPath, dstPath}, __)
    let contents = header || `` // module.exports = function (data = {}) { \n return
    contents += JSON.stringify(processParcelPod({item: options}, __), null, 2)
    contents += tail || `` // \n }()

    contents = contents.replace(/"`/g, '`') // json to liternal vars
    contents = contents.replace(/`"/g, '`') // json to liternal vars

    report.debug(`mevent.eoconfig: fileUpdSync ${srcPath} ${dstPath} `, __)
    fileUpdSync({
      cwd: srcPath,
      file: dstPath,
      text: contents,
    })
  }
}

module.exports = { eoconfig }

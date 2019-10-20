/**********************
   *    microevent-eofolders
   */

const fsExtra = require('fs-extra')
const {report} = require('eodoes-muons')
const {processParcelPod} = require('eodoes-muons')
const { filer } = require('eodoes-muons')

/**********************
      * eofolders
      */
const eofolders = async (data, __) => {
  let {parcel} = data
  let {eoroot} = __
  let {cwdDirPath, eodoDirPath, eonDirPath, eodoesPath, eodoesDirPath} = __
  let {inland = true} = __

  report.trace({eoroot, cwdDirPath, eodoDirPath, eonDirPath, eodoesPath, eodoesDirPath}, __)

  if (inland) {
    parcel = Array.isArray(parcel) ? parcel : Array.of(parcel) // arrayfy
    for (let item of parcel) {
      if (typeof item === 'string') {
        // --- >
        let folderpath = filer.resolvepath(eoroot, item) // relative to site root
        filer.dirUpdSync({ twd: folderpath })
        // < ---
      } else if (Array.isArray(item)) {
        item.forEach(dir => filer.dirUpdSync({twd: dir}))
      } else if (typeof item === 'object') {
        item = await processParcelPod({item}, __)
        // --- >
        let src = item.options.path
        let dst = item.resolve
        if (!src && dst) { // no src => create dst
          let dstPath = filer.resolvepath(eoroot, dst)
          report.debug(`mevent.eofolders: filer.dirUpdSync ${dstPath}`, __)
          filer.dirUpdSync({
            twd: dstPath,
          })
        } else if (src && (dst === 'null')) { // dst: null => remove src
          let srcPath = filer.resolvepath(eoroot, src)
          report.debug(`mevent.eofolders: removeSync ${srcPath}`, __)
          fsExtra.removeSync(srcPath)
        } else { // copy src => dst
          let srcPath = filer.uritype(src) === 2 ? `${src}/` : filer.resolvepath(eoroot, src)
          let dstPath = filer.uritype(dst) === 2 ? `${dst}/` : filer.resolvepath(eoroot, dst)

          report.debug(`mevent.eofolders: filer.copyFolderRecursiveSync ${srcPath} ${dstPath}`, __)
          console.assert(filer.nodeExistsSync(srcPath), `src dir ${srcPath} does not exist`) // eslint-disable-line no-console

          filer.copyFolderRecursiveSync({
            src: srcPath,
            dst: dstPath,
            nofolder: 1,
          })
        }
      }
      // < ---
    }
  }
}

module.exports = { eofolders }

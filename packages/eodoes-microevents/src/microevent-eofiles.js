/**********************
  *    microevent-eofiles
  */
const fsExtra = require('fs-extra')
const {report} = require('eodoes-muons')
const {processParcelPod} = require('eodoes-muons')
const { filer } = require('eodoes-muons')
const { resolvepath, fileUpdSync, nodeExistsSync } = filer
const { merger } = require('eodoes-muons')

/**********************
  * eofiles
  */
const eofiles = async (data, __) => {
  let {parcel} = data
  let {eoroot} = __
  let {cwdDirPath, eodoDirPath, eodoesDirPath} = __
  let { inland = true } = __
  report.trace({caller: `__eofiles`, eoroot, cwdDirPath, eodoDirPath, eodoesDirPath}, __)

  if (inland) {
    parcel = Array.isArray(parcel) ? parcel : Array.of(parcel) // arrayfy
    for (let item of parcel) {
      if (typeof item === 'string') { // copy file by path
        report.debug(`mevent.eofiles: fileUpdSync ${item}`, __)
        fileUpdSync({
          cwd: ``, // file to include path part
          file: item,
          text: ``,
        })
      } else if (typeof item === 'object') {
        item = await processParcelPod({item}, __) // { resolve, options }

        if (item.options && item.options.content !== undefined) { // contents
          let text = item.options.content
          if (typeof item.options.content === 'object') {
            text = JSON.stringify(item.options.content, null, 2) // assume JSON
          }

          let srcPath = '' // file to include path part
          let dstPath = resolvepath(eoroot, item.resolve)
          report.trace({srcPath, dstPath}, __)
          report.debug(`mevent.eofiles: fileUpdSync ${dstPath}`, __)

          let op = item.options.op || 'replace' // default to replace
          if (op === 'append') {
            console.assert(nodeExistsSync(dstPath), `eofiles: dst node ${dstPath} does not exist`) // eslint-disable-line no-console
            let tocontent = fsExtra.readFileSync(dstPath, 'utf8')
            let parseparator = ''
            text = `${tocontent}${parseparator}${text}`
          } else if (op === 'prepend') {
            console.assert(nodeExistsSync(dstPath), `eofiles: dst node ${dstPath} does not exist`) // eslint-disable-line no-console
            let tocontent = fsExtra.readFileSync(dstPath, 'utf8')
            let parseparator = ''
            text = `${text}${parseparator}${tocontent}`
          } else if (op === 'merge') {
            console.assert(nodeExistsSync(dstPath), `eofiles: dst node ${dstPath} does not exist`) // eslint-disable-line no-console
            let content = item.options.content
            console.assert(typeof content === 'object', `eofiles: content is not object to merge`) // eslint-disable-line no-console
            text = merger.mergeFromFile({file: dstPath, obj: content }, __)
          }

          fileUpdSync({
            cwd: srcPath,
            file: dstPath,
            text: text,
          })
        } else if (item.options && item.options.path !== undefined) { // no contents
          let src = item.options.path
          let dst = item.resolve

          if (!src && dst) { // no src => create dst
            // src is defined
          } else if (src && (dst === 'null')) { // dst: null => remove src
            let srcPath = resolvepath(eoroot, src)
            report.trace({srcPath}, __)
            let srcExists = nodeExistsSync(srcPath)
            if (srcExists) {
              report.debug(`mevent.eofiles: removeSync ${srcPath}`, __)
              fsExtra.removeSync(srcPath)
            } else {
              report.debug(`eofiles: ${srcPath} does not exist`, __)
            }
          } else { // copy src => dst
            let srcPath = resolvepath(eodoesDirPath, src)
            let dstPath = resolvepath(eoroot, dst)
            if (fsExtra.lstatSync(srcPath).isFile()) {
              let fromcontent = fsExtra.readFileSync(srcPath, 'utf8')
              report.verb({fromcontent}, __)
            }
            report.trace({srcPath, dstPath}, __)
            console.assert(nodeExistsSync(srcPath), `eofiles: src node ${srcPath} does not exist`) // eslint-disable-line no-console
            report.debug(`mevent.eofiles: copy ${srcPath}  ${dstPath}`, __)
            await fsExtra.copy(srcPath, dstPath)
          }
        }
      }
    }
  }
}

module.exports = { eofiles }

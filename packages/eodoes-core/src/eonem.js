/**********************
 *    eodoes-core/eonem
 */
const fs = require('fs')
const path = require('path')
const requireUri = require('require-uri')

const {filer} = require('eodoes-muons')

/**********************
 * camelize
 */
const camelize = str => str
  .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
  .replace(/\s+/g, '') // remove white space
  .replace(/-+/g, '') // remove hyphen

/**********************
 * getEocode
 */
function getEocode (data, __) {
  let {eodo} = __.eo_pars // eodo is passed as first in pars

  let _eocode
  let uritype = filer.uritype(eodo)

  if (uritype === 0) { // uri
    let {posixsep} = __
    let eodoesParts = eodo.split(posixsep)
    let eodoesPartFile = eodoesParts.slice(-1)[0]
    _eocode = eodoesPartFile.replace('.js', '')
  } else if (uritype === 1) { // module
    _eocode = eodo
  } else if (uritype === 2 || uritype === 3) { // in file system
    let {posixsep} = __
    let eodoesParts = eodo.split(posixsep)
    let eodoesPartFile = eodoesParts.slice(-1)[0]
    _eocode = eodoesPartFile.replace('.js', '')
  }
  // eodoes-eodo-eocore -> eodoes-eo-eocore
  let eocode = _eocode
  eocode = eocode.replace('-eodo-', '-eo-') // _e_
  eocode = eocode.replace('-do-', '-eo-')
  return eocode
}

/**********************
 * setEodoesFiles
 */
async function getEodoesFiles (data, __) {
  let eodoesFiles = []

  let {uritype} = data
  let {inScopePattern} = __
  let {eodo} = __.eo_pars // eodo is passed as first in pars

  if (uritype === 0) { // uri
    // N/A
  } else if (uritype === 1) { // module
    // N/A
  } else if (uritype === 2 || uritype === 3) { // in file system
    let {posixsep, eodoesDirPath} = __
    let eodoesParts = eodo.split(posixsep)
    let eodoesPartDirPath = eodoesParts.slice(0, -1).join(posixsep)
    let eodoesPartFile = eodoesParts.slice(-1)[0]
    let eodoesCode = eodoesPartFile.replace('.js', '')

    if (eodoesPartDirPath !== undefined && eodoesPartDirPath.trim() !== '') {
      eodoesDirPath = eodoesPartDirPath // upd eodo dir
    }

    eodoesFiles = filer.dirExistsSync(eodoesDirPath)
      ? fs // check if eodo is in folder of calling script
        .readdirSync(eodoesDirPath)
        .filter(d => inScopePattern.test(d))
        .filter(d => d.includes(eodoesCode) === true)
        .filter(d => filer.fileExistsSync(filer.resolvepath(eodoesDirPath, d)))
      : []
  }
  return eodoesFiles
}

/**********************
 * getEonitem
 */
async function getEonitem (data, __) {
  let eodo = __.eo_pars.eodo // eodo is passed as first in pars
  let {cwdDirPath} = __

  // 0:   https://raw.githubusercontent.com/sifbuilder/eodo/master/eodos/eothemeui.js
  // 1:   eothemeui
  // 2:   /e/eodo/eodos/eothemeui
  // 3:   ./eodos/eothemeui

  let uritype = filer.uritype(eodo) // 0: uri, 1: code, 2: abs, 3: relative
  let eonitem //  from uri (uritype: 0), from module (uritype: 1), from file (uritype: 2,3)

  if (uritype === 1) { // in module
    let require$1 = require(`${eodo}`)
    eonitem = await require$1.eonitem()
  } else if (uritype === 2 || uritype === 3) { // in file system
    let {posixsep, eodoesDirPath} = __
    let eodoesParts = eodo.split(posixsep)
    let eodoesPartDirPath = eodoesParts.slice(0, -1).join(posixsep)
    if (eodoesPartDirPath !== undefined && eodoesPartDirPath.trim() !== '') {
      eodoesDirPath = eodoesPartDirPath
      if (uritype === 2) {
        eodoesDirPath = filer.posixify(eodoesPartDirPath) // upd eodo dir
      } else if (uritype === 3) {
        eodoesDirPath = path.join(cwdDirPath, eodoesPartDirPath) // upd eodo dir
      }

      let eodoesFiles = await getEodoesFiles({uritype}, __) // side effect on state

      if (eodoesFiles.length !== 1) { // !one eodo
        //
      } else { // one eodo
        let eodoesFile = eodoesFiles[0] // eodoesFile is first in eodoesFiles
        let eodoesFileName = eodoesFile.replace(/\.[^/.]+$/, '') // remove extension

        let eodoesFullPath = path.format({
          root: '/ignored',
          dir: eodoesDirPath,
          base: eodoesFile,
        })
        const require$eodeos = require(eodoesFullPath)
        eonitem = require$eodeos.eonitem !== undefined
          ? await require$eodeos.eonitem()
          : await require$eodeos[camelize(path.basename(eodoesFileName, '.js'))]()
      }
    } else if (uritype === 0) {
      const require$eodeos = await requireUri(eodo)
      eonitem = require$eodeos.eonitem !== undefined
        ? await require$eodeos.eonitem()
        : await require$eodeos[camelize(path.basename(eodo, '.js'))]()
    }
  }

  return eonitem
}

module.exports = { getEonitem, getEocode }

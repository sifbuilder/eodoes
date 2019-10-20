/**********************
  *    eodoes-muons/muon-filer
  */

const path = require('path')
const fsExtra = require('fs-extra')

const posixify = d => d.replace(/\\/g, '/')

const resolvepath = (d = [], f = []) => {
  console.assert(d !== undefined, `dir part undefined`) // eslint-disable-line no-console
  let sep = '/'

  let da = Array.isArray(d) ? d : [d]
  let fa = Array.isArray(f) ? f : [f]
  let a = [...da, ...fa]
  let res = posixify(path.normalize(a.join(sep)))

  return res
}

const fileuri = (d, a) => `file:///${resolvepath(d, a)}`

let geturi = function (d) {
  let uri
  let httpregex = new RegExp('^((https?:)?\\/\\/)?')
  let fileregex = new RegExp('^((file:)?\\/\\/)?')
  if (httpregex.test(d)) {
    uri = d
  } else if (fileregex.test(d)) {
    uri = d
  } else {
    uri = fileuri(d)
  }
  return uri
}

/**********************
  * dirUpdSync
  */
const dirUpdSync = function (data, __) {
  const {twd, mode} = data // 493

  console.assert(typeof twd === 'string') // eslint-disable-line no-console
  const sep = '/'
  const initDir = path.isAbsolute(twd) ? sep : ''
  twd.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(parentDir, childDir)
    if (!fsExtra.existsSync(curDir)) {
      (mode !== undefined)
        ? fsExtra.mkdirSync(curDir, { mode })
        : fsExtra.mkdirSync(curDir)
    }
    return curDir
  }, initDir)
}
/**********************
  * fileUpdSync
  */
const fileUpdSync = function (data, __) {
  let {cwd, file, text} = data

  let formalpath = resolvepath(file)
  if (typeof cwd === 'string' && cwd !== '') {
    formalpath = resolvepath(path.join(cwd, file))
  }

  const sep = '/'
  let pathParts = formalpath.split(sep)
  let fileName = pathParts.slice(-1)[0]

  let filePath = pathParts.slice(0, -1).join(sep)
  let dirPath = resolvepath(filePath)
  dirUpdSync({
    twd: dirPath,
  })

  // if win remove lead slash
  var isWin = process.platform === 'win32' // _e_
  if (isWin) filePath = filePath.replace(/^\/+/g, '')
  let toWriteFilePath = path.join(filePath, fileName)
  fsExtra.writeFileSync(toWriteFilePath, text)
}

/**********************
  * nodeExistsSync
  *
  *  https://github.com/netlify/cli-utils/blob/master/src/utils/get-config-path.js
  */
const nodeExistsSync = function (filePath) {
  try {
    const stats = fsExtra.lstatSync(filePath)
    return stats
  } catch (e) {
    return false
  }
}
const fileExistsSync = path => {
  return nodeExistsSync(path) && nodeExistsSync(path).isFile()
}
const dirExistsSync = path => {
  return nodeExistsSync(path) && nodeExistsSync(path).isDirectory()
}

// https://stackoverflow.com/questions/13786160/copy-folder-recursively-in-node-js/26038979
function copyFolderRecursiveSync (data) {
  let {src, dst, nofolder} = data

  // check if folder needs to be created or integrated
  let targetFolder
  if (nofolder === 1) {
    targetFolder = dst
  } else {
    targetFolder = path.join(dst, path.basename(src))
  }
  if (!dirExistsSync(targetFolder)) {
    fsExtra.mkdirSync(targetFolder)
  }

  fsExtra.copySync(src, targetFolder)
}

// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

/**********************
  * replaceInText
  */
const replaceInText = function (data, __) {
  let {text, from, to, options = 'g'} = data

  const replacepattern = escapeRegExp(from)
  const searchexp = new RegExp(replacepattern, options)
  let arr = []
  while ((arr = searchexp.exec(text)) != null) {
    text = text.replace(arr[0], to)
  }
  return text
}

/**********************
 *  isURL
 */
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url/43467144
function isURL (str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
  return pattern.test(str)
}

/**********************
 *  uritype
 */
// 0:   uri: https://raw.githubusercontent.com/sifbuilder/eodo/master/eodos/eothemeui.js
// 1:   eodoes package name: eothemeui
// 2:   absolute path: /e/eodo/eodos/eothemeui
// 3:   relative path: ./eodos/eothemeui
let uritype = function (d) { // _e_
  let uripattern = /^https?:\/\//i
  let namepattern = /^[-_0-9a-z]+$/i // has extension
  let isEodoesCode = namepattern.test(d)
  let isEodoesUri = uripattern.test(d)
  let isEodoesAbsolute = path.isAbsolute(d)
  let isEodoesRelative = !isEodoesUri && !isEodoesAbsolute
  let type = 0
  if (isEodoesUri) type = 0
  else if (isEodoesAbsolute) type = 2
  else if (isEodoesCode) type = 1
  else if (isEodoesRelative) type = 3

  return type
}

let filer = {
  escapeRegExp,
  geturi,
  isURL,
  fileuri,
  nodeExistsSync,
  resolvepath,
  posixify,
  dirExistsSync,
  dirUpdSync,
  fileExistsSync,
  fileUpdSync,
  copyFolderRecursiveSync,
  replaceInText,
  uritype,
}
module.exports = { filer }

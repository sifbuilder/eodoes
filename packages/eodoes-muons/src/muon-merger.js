/**********************
   *    eodoes-muons/muon-merger
   */

const fsExtra = require('fs-extra')

/**
  * isObject
  */
function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

/**
  * Deep merge two objects.
  * @param target
  * @param ...sources
  */
function mergeDeep (target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}
/**********************
  * mergeFromFile
  */
const mergeFromFile = function (data, __) {
  let {file, obj} = data
  let fromFilePath = file
  let fromFileExist = fsExtra.existsSync(fromFilePath)
  let text = ''
  if (fromFileExist) {
    let content = fsExtra.readFileSync(fromFilePath, 'utf8')
    let preobj = JSON.parse(content)
    let newobj = mergeDeep(preobj, obj)
    text = JSON.stringify(newobj, null, 2)
  } else {
    text = JSON.stringify(obj, null, 2)
  }

  return text
}

let merger = {
  mergeDeep,
  mergeFromFile,
}

module.exports = { merger }

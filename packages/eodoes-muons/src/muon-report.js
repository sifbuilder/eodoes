/**********************
  *     eodoes-muons/muon-report
  */

const fsExtra = require('fs-extra')
const path = require('path')

// .................. padoc
let padoc = function (d, n = 3) {
  let p = ''.padStart(n, ' ')
  let res = d
    .split('\n')
    .map(d => d.trim())
    .map(d => `${p}${d}`)
    .join('\n')
  return res
}

// .................. logobj
const logobj = ({o = {}, t = '', p = '', pad = 3}) => {
  let txt = padoc(t, pad)
  t = (txt && txt.trim() !== '') ? `${p} ${txt}` : ``
  console.log(t) // eslint-disable-line no-console

  for (let key of Object.keys(o)) {
    let val = o[key]
    console.log(`${p}${key}`, val) // eslint-disable-line no-console
  }

  console.log() // eslint-disable-line no-console
}

// .................. box
const box = (text, frame, minwidth) => {
  text = text
    .replace(RegExp(/^\s*[\r\n]/, 'gm'), '') // remove emptylines
    .split('\n')
    .map(d => d.replace(RegExp('[' + frame.join('') + ']', 'g'), ''))
    .map(d => d.trim())
    .join(`\n`)

  let width = text
    .split('\n')
    .reduce((p, q) => {
      return Math.max(p, q.length)
    }, 0)

  if (minwidth !== undefined) width = Math.max(width, minwidth)

  let length = text
    .split('\n')
    .length

  text = text
    .split('\n')
    .map(d => d.trim())
    .map(d => d.replace(RegExp('[' + frame.join('') + ']', 'g'), ''))
    .map(d => d.trim())
    .map((d, i) => {
      let toPadInLine = width + 1 - d.length
      let contentpad = ' '.padEnd(toPadInLine)
      let marge = 3
      let margepad = ' '.padEnd(marge)
      let line
      if (i === 0) line = frame[0] + frame[5].repeat(width + 2 * marge + 1) + frame[1]
      else if (i === length - 1) line = frame[3] + frame[5].repeat(width + 2 * marge + 1) + frame[2]
      else line = frame[4] + margepad + d + contentpad + margepad + frame[4]
      return line
    })
    .join(`\n`)

  return text
}

// .................. frame
const frame = (data, __) => {
  let {text} = data

  const frames = [
    ['╭', '╮', '╯', '╰', '│', '─', '|', '┊'],
    ['┌', '┐', '┘', '└', '|', '─', '│', '┊'],
    ['╔', '╗', '╝', '╚', '║', '═', '│', '┊'],
  ]
  if (text.indexOf(frames[0][0]) !== -1) {
    text = '\n' + box(text, frames[0], 64)
  } else if (text.indexOf(frames[1][0]) !== -1) {
    text = '\n' + box(text, frames[1], 64)
  } else if (text.indexOf(frames[2][0]) !== -1) {
    text = '\n' + box(text, frames[2], 64)
  }

  let logtext = `${padoc(text, 0)}`
  return logtext
}

// .................. recordfn
const recordfn = (data, __) => {
  let {text, key = ''} = data
  let {eoroot, recordfile} = __

  const restartkey = `000` // key to restart
  const logFilePath = path.resolve(eoroot, recordfile)
  const fileExist = fsExtra.existsSync(logFilePath)
  const recordsep = `----log----\n`

  if (!fileExist || key.includes(restartkey)) {
    fsExtra.writeFileSync(logFilePath, `${recordsep}`)
  }

  fsExtra.appendFile(logFilePath, `${text}`)
}

// .................. track
const track = (data, __) => {
  let {track: dotrack} = __.eonopts
  if (dotrack) {
    let caller = (typeof data === 'object') ? (data._caller || '') : ''

    let text = caller
    if (typeof data === 'string') {
      text += data
    } else if (typeof data === 'object' && typeof data._msg === 'string') {
      text += (data._msg || '')
    }

    data = (typeof data === 'object') ? data : {}

    let _tik = data._tik || '->'
    delete data._msg
    delete data._tik
    logobj({o: data, t: text, p: _tik})
  }
}

// .................. trace
const trace = (data, __) => {
  let {trace: dotrace, record} = __.eonopts
  if (dotrace) {
    let caller = (typeof data === 'object') ? (data._caller || '') : ''

    let text = caller
    if (typeof data === 'string') {
      text += data
    } else if (typeof data === 'object' && typeof data._msg === 'string') {
      text += (data._msg || '')
    }

    data = (typeof data === 'object') ? data : {}

    let _tik = data._tik || ':'
    delete data._msg
    delete data._tik

    if (record) recordfn({text}, __) // output to logfile
    logobj({o: data, t: text, p: _tik}) // output to terminal
  }
}

// .................. debug
const debug = (data = {}, __) => {
  let {debug: dodebug, record} = __.eonopts
  if (dodebug) {
    let caller = (typeof data === 'object') ? (data._caller || '') : ''

    let text = caller
    if (typeof data === 'string') {
      text += data
    } else if (typeof data === 'object' && typeof data._msg === 'string') {
      text += (data._msg || '')
    }

    data = (typeof data === 'object') ? data : {}

    let _tik = data._tik || '::'
    delete data._msg
    delete data._tik

    if (record) recordfn({text: '\n\n' + text}, __) // output to logfile
    logobj({o: data, t: text, p: _tik}) // output to terminal
  }
}

// .................. verb
const verb = (data, __) => {
  let {verb: doverb} = __.eonopts
  if (doverb) {
    let caller = (typeof data === 'object') ? (data._caller || '') : ''

    let _msg = caller
    if (typeof data === 'string') {
      _msg += data
    } else if (typeof data === 'object' && typeof data._msg === 'string') {
      _msg += (data._msg || '')
    }

    data = (typeof data === 'object') ? data : {}

    let _tik = data._tik || ':::'
    delete data._msg
    delete data._tik
    logobj({o: data, t: _msg, p: _tik})
  }
}

// .................. doc
const doc = (data, __) => {
  let {record} = __.eonopts

  let {key, parcel} = data
  let {reportopts} = __
  let { termsep = ':', parasep = '\n'} = reportopts

  let label = key.replace('__eodoc', '')
  let {doc: dodoc} = __.eonopts
  if (dodoc) {
    let text = ''
    if (typeof parcel === 'string') {
      text = parcel
    } else if (typeof parcel === 'function') {
      text = parcel()
    } else if (typeof parcel === 'object') {
      text = parcel.resolve
    }

    let frametext = frame({text}, __)
    if (record) recordfn({text: '\n' + frametext, key}, __)
    logobj({o: {}, t: frametext, p: `${parasep}${label}${termsep}`})
  }
}

module.exports = {
  track,
  doc,
  debug,
  trace,
  verb,
}

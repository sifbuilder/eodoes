/**********************
 *    eodoes-core/arger
 */

let isLongFlag = d => d.startsWith('--')
let isShortFlag = d => d.startsWith('-') && !d.startsWith('--')
let isFlag = d => d && (isLongFlag(d) || isShortFlag(d))
let rmLongTail = d => d.startsWith('--') ? d.substring(2) : d
let rmShortTail = d => d.startsWith('-') ? d.substring(1) : d // eslint-disable-line no-unused-vars
let rmTail = d => rmShortTail(rmLongTail(d))

let isInFlag = (d, a) => {
  const isArray = Array.isArray(a) // is array
  const length = a.length

  const idx = a.indexOf(d)
  const isIn = idx !== -1 // is in array
  const isLast = idx === length - 1 // is last in array
  const isItemFlag = isFlag(d)

  const nextitem = a[idx + 1]
  const isNextItemFlag = isFlag(nextitem)

  return isArray && isIn && isItemFlag && !isLast && !isNextItemFlag
}

let isInTag = (d, a) => {
  const isArray = Array.isArray(a) // is array
  const length = a.length

  const idx = a.indexOf(d)
  const isIn = idx !== -1 // is in array

  const isLast = idx === length - 1 // is last in array

  const isItemFlag = isFlag(d)

  const nextitem = a[idx + 1]
  const isNextItemFlag = isFlag(nextitem)

  return isArray && isIn && isItemFlag && (isLast || isNextItemFlag)
}

// ....................... neoarger
let neoarger = function (data = {}, __ = {}) {
  let { argv = [] } = data // argv is input from command line

  let {
    eopars = [],
    eotags = {},
  } = __

  let _argv = [...argv] // _argv will be reduce while parsing

  let eonopts = {}

  let _eotags = Object.assign({}, eotags)
  for (let i = _argv.length - 1; i > 0; i--) {
    let item = _argv[i]
    let itemnext = _argv[i + 1]

    if (isInFlag(item, _argv)) { // if item is a flag in cli
      let foundeotags = Object.keys(eotags).filter(f => f === item)
      let labName
      if (foundeotags.length === 1) { // if flag is pre-defined, add and reduce
        labName = foundeotags[0] // remove tail is flag defined in cli
      } else if (foundeotags.length === 0) { // if flag is not pre-defined, add to flags and reduce
        labName = item // remove tail is flag defined in cli
      }
      let value = itemnext
      _eotags[labName] = value
      let idx = _argv.indexOf(item)
      _argv.splice(idx, 2) // remove flags
    }
  }

  // convert flags to eonopts
  for (let key in _eotags) {
    eonopts[rmTail(key)] = _eotags[key]
  }

  // ... to eonopts
  for (let i = argv.length - 1; i > 0; i--) { // repeat line processing
    if (isInFlag(argv[i], argv)) { // if it has a long flag
      eonopts[rmTail(argv[i])] = argv[i + 1] // add unflagged to eo_tags
    }
  }

  // ... to eonopts
  for (let i = argv.length - 1; i > 0; i--) { // repeat line processing
    if (isInTag(argv[i], argv)) { // if it has a long flag
      eonopts[rmTail(argv[i])] = true // add unflagged to eo_tags
    }
  }

  let eo_pars = {}, todel = 0
  for (let i = 0; i < eopars.length; i++) { // for each predefined par
    let item = _argv[i]
    let par = eopars[i]
    if (_eotags[par] !== undefined) { // if par is passed flagged
      eo_pars[par] = _eotags[par] // set par from flag
    } else {
      eo_pars[par] = item // set par from the corresponding ordinal line arg
      todel++
    }
  }
  _argv.splice(0, todel) // remove unflagged pars from argv

  // eo_pars to eonopts
  for (let i = 0; i < Object.entries(eo_pars).length; i++) {
    let entry = Object.entries(eo_pars)[i]
    let key = entry[0]
    let value = entry[1]
    if (value !== undefined) {
      eonopts[key] = value
    } else {
      delete eo_pars[key]
    }
  }

  let eo_event_tags = _argv // the remaining args are events

  // eo_event_tags to eovents
  let eoevents = {}
  for (let i = 0; i < eo_event_tags.length; i++) {
    let key = eo_event_tags[i]
    if (__.events[key] !== undefined) { // events set in state
      eoevents[key] = __.events[key]
    }
  }

  let surargs = {
    eo_pars,
    eoevents,
    eonopts,
  }
  return surargs
}

module.exports = {
  neoarger,

}

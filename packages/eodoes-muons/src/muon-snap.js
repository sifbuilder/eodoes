/**********************
   *     eodoes-muons/muon-snap
   */

let objIsEmpty = obj => obj.constructor === Object && Object.entries(obj).length === 0
let objIsNotEmpty = obj => obj.constructor === Object && Object.entries(obj).length > 0
let cmdpattern = new RegExp('^(__[^_]*)(__)?(.*)$', 'i')

/**********************
 * snap
 */
const snap = async (data, __) => {
  let v = data
  let { microevents } = __
  let { microkey } = __.eonopts

  let res = v
  if (v === null) {
    res = null
  } else if (typeof (v) === 'number') {
    res = v
  } else if (typeof (v) === 'string') {
    res = v
  } else if (typeof (v) === 'function') {
    res = v
  } else if (Array.isArray(v)) {
    res = v.reduce(async (p, q) => {
      let snapped = await snap(q, __)
      p = await Promise.resolve(p) // _e_
      let upd = (objIsNotEmpty(q) && objIsEmpty(snapped)) // was an __eodoc object
        ? [...p]
        : [...p, snapped]
      return upd
    }, [])
  } else if (typeof v === 'object') {
    for (let [key, value] of Object.entries(v)) {
      if (microkey === undefined || key.includes(microkey)) { // _e_
        let pars = key.match(cmdpattern)
        //
        // key eg.: __eofiles_a
        // parceevent if key is cmdpattern
        //
        if (pars) {
          let surelem = `${pars[1]}` // prefix first part of cmd to get the microevent
          surelem = surelem.startsWith('__') ? surelem.substring(2) : surelem // deprefix

          if (microevents[surelem] !== undefined) {
            value = await microevents[surelem]({key, parcel: value}, __)
            delete v[key]
          }

          if (key.includes('__eobreak') && microkey === undefined) { // inject __eobrake
            res = null
            break
          }
        } else {
          let snapped = await snap(value, __)
          res[key] = snapped
        }
      }
    }
  }
  return res
}

module.exports = { snap }

/**********************
  *     eodoes-muons/muon-processParcelPod
  */
const processParcelPod = async (data, __) => {
  const {report} = require('eodoes-muons')

  let { item } = data
  let { microevents, inland = true } = __
  report.trace({inland, item}, __)

  if (typeof item === 'object') { // process microevents in parcel pod
    if ('__eoignore' in item || !inland) { // if option includes __eoignore
      await microevents['microevent']({
        '__eoignore': item['__eoignore'],
      }, __)
      item = {}
    } else {
      for (let key of Object.keys(item)) {
        for (let microevent of Object.keys(microevents)) {
          if (key.includes(microevent)) { // if key includes microevent
            await microevents[microevent]({
              key,
              parcel: item[`${key}`],
            }, __)
            delete item[`${key}`]
          }
        }
      }

      if (typeof item.options === 'object') { // process microevents in parcel pod options
        let optsitem = item.options
        for (let key of Object.keys(optsitem)) {
          if (key.includes('__eoignore')) { // if option includes __eoignore
            let subitem = {[`${key}`]: optsitem[`${key}`]}
            await microevents['microevent'](subitem, __)
            delete optsitem[`${key}`]
            break // stop parse options if __eoignore
          } else {
            for (let microevent of Object.keys(microevents)) {
              if (key.includes(microevent)) { // __eoignore passed as option
                await microevents[microevent]({
                  key,
                  parcel: optsitem[`${key}`],
                }, __)
                delete optsitem[`${key}`]
              }
            }
          }
        }
      }
    }
  }
  return item
}

module.exports = { processParcelPod }

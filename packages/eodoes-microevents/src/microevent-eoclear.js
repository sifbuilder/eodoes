/**********************
  *    microevent-eoclear
  */

const eoclear = async (data, __) => {
  let {inland = true} = __

  if (inland) {
    let { events } = __
    let { inland = true} = __
    if (inland) await events.eoclear(data, __)
  }
}

module.exports = { eoclear }

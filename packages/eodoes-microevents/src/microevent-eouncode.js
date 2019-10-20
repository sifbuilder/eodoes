/**********************
   *    microevent-eouncode
   */

const eouncode = async (data, __) => {
  let {inland = true} = __

  if (inland) {
    let { events } = __
    let { inland = true} = __
    if (inland) await events.uncode(data, __)
  }
}

module.exports = { eouncode }

/**********************
   *    microevent-eoyarn
   */

const {exec} = require('eodoes-muons')

/**********************
  * eoyarn
  */
const eoyarn = async (data, __) => {
  let cmd = `yarn`
  exec({cmd, options: {} }, __)
}

module.exports = { eoyarn }

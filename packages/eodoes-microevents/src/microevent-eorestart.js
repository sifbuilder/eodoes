/**********************
   *    microevent-eorestart
   */

const {eostop} = require('./microevent-eostop')
const {eostart} = require('./microevent-eostart')

/**********************
      * eorestart
      */
const eorestart = async (data, __) => {
  await eostop(data, __) // stop port process
  eostart(data, __) // await that yarn is done
}

module.exports = { eorestart }

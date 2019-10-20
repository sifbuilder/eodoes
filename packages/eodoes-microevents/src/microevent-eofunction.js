/**********************
   *    microevent-eofunction
   */

const eofunction = async (data, __) => {
  let { parcel } = data
  let {inland = true} = __

  let fn = parcel.resolve
  if (inland) await fn(data, __)
}

module.exports = { eofunction }

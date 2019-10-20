/**********************
   *    microevent-eoland
   */

const eoland = async (data, __) => {
  let inland = true
  __ = __.updState({inland}, __)
}

module.exports = { eoland }

'use strict'
/**********************
  *    eodoes-events
  */

const { eobreak } = require('./microevent-eobreak')
const { eoconfig } = require('./microevent-eoconfig')
const { eodelay } = require('./microevent-eodelay')
const { eodoc } = require('./microevent-eodoc')
const { eofetch } = require('./microevent-eofetch')
const { eofiles } = require('./microevent-eofiles')
const { eofolders } = require('./microevent-eofolders')
const { eofunction } = require('./microevent-eofunction')
const { eoexec } = require('./microevent-eoexec')
const { eoignore } = require('./microevent-eoignore')
const { eojump } = require('./microevent-eojump')
const { eoland } = require('./microevent-eoland')
const { eouncode } = require('./microevent-eouncode')
const { eorestart } = require('./microevent-eorestart')
const { eorun } = require('./microevent-eorun')
const { eostart } = require('./microevent-eostart')
const { eostop } = require('./microevent-eostop')
const { eoview } = require('./microevent-eoview')
const { eounzip } = require('./microevent-eounzip')
const { eoclear } = require('./microevent-eoclear')
const { eoyarn } = require('./microevent-eoyarn')

module.exports = {
  eobreak,
  eoconfig,
  eodelay,
  eodoc,
  eofetch,
  eofiles,
  eofolders,
  eofunction,
  eoexec,
  eoignore,
  eojump,
  eoland,
  eouncode,
  eorestart,
  eorun,
  eostart,
  eostop,
  eoview,
  eounzip,
  eoclear,
  eoyarn,
}

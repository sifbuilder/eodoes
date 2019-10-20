'use strict'
/**********************
  *    eodoes-events
  */

const { eoclear } = require('./event-eoclear')
const { demod } = require('./event-demod')
const { unspace } = require('./event-unspace')
const { eodev } = require('./event-eodev')
const { eoyarn } = require('./event-eoyarn')
const { eoparse } = require('./event-eoparse')
const { eogit } = require('./event-eogit')
const { eowatch } = require('./event-eowatch')
const { monitor } = require('./event-monitor')
const { netify } = require('./event-netify')
const { eohub } = require('./event-eohub')
const { publish } = require('./event-publish')
const { uncode } = require('./event-uncode')
const { upver } = require('./event-upver')

module.exports = {
  eoclear,
  demod,
  unspace,
  eodev,
  eoyarn,
  eoparse,
  eogit,
  eowatch,
  monitor,
  netify,
  eohub,
  publish,
  uncode,
  upver,
}

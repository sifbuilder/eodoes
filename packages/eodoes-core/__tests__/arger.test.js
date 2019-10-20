/* eslint-disable no-console */
global.fs = require('fs')
global.path = require('path')

const {arger} = require('..')

// ....................... neo argv
test('testargs neo args', async () => {
  let __ = {
    eopars: [
      'eodir',
      'eodoes',
    ],

    eotags: {
      '--debug': false,
      '--help': false,
      '--place': 'here',
      '--sure': false,
      '--really': false,
      '--author': 'thisauthor',
    },
    events: {},
  }
  let data = { argv: [ 'F:/', './eodos/eospace', '--eon', 'e', 'eoparse', '--doc', '--sure' ] }

  let args = arger.neoarger(data, __)

  expect(args.eo_pars).toEqual({ eodir: 'F:/', eodoes: './eodos/eospace' }) // in run

  let {eoevents, eonopts} = args

  expect(eoevents).toEqual({})
  expect(eonopts).toEqual({
    'author': 'thisauthor',
    'debug': false,
    'doc': true,
    'sure': true,
    'eodir': 'F:/',
    'eodoes': './eodos/eospace',
    'eon': 'e',
    'help': false,
    'place': 'here',
    'really': false,
  })
})

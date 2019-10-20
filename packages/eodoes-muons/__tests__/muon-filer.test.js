/* eslint-disable no-console */
global.fs = require('fs')
global.path = require('path')

const { filer } = require('../src/muon-filer')

test('escapeRegExp a', async () => {
  let d = 'this is a slash /, this double //, this back \\, this quote " , '
  // eslint-disable-next-line quotes
  expect(filer.escapeRegExp(d)).toBe("this is a slash /, this double //, this back \\\\, this quote \" , ")
})

// 0:   https://raw.githubusercontent.com/sifbuilder/eodo/master/eodos/eothemeui.js
// 1:   eothemeui
// 2:   /e/eodo/eodos/eothemeui
// 3:   ./eodos/eothemeui

test('uritype 0a', async () => {
  let d = 'https://raw.githubusercontent.com/sifbuilder/eodo/master/eodos/eothemeui.js'
  expect(filer.uritype(d)).toEqual(0)
})

test('uritype 1a', async () => {
  let d = 'eothemeui'
  expect(filer.uritype(d)).toEqual(1)
})

test('uritype 2a', async () => {
  let d = '/e/eodo/eodos/eothemeui'
  expect(filer.uritype(d)).toEqual(2)
})

test('uritype 2c', async () => {
  let d = '/C:/e/eodo/eodos/eothemeui'
  expect(filer.uritype(d)).toEqual(2)
})

test('uritype 3a', async () => {
  let d = './test.js'
  expect(filer.uritype(d)).toEqual(3)
})

test('uritype 3b', async () => {
  let d = '.\test.js'
  expect(filer.uritype(d)).toEqual(3)
})

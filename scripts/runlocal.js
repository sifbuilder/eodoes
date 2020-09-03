#!/usr/bin/env node

const {existsSync} = require(`fs`)
var os = require('os')
var path = require('path')

const cwdDirPath = process.cwd() // current working directory
const dirPath = __dirname 
console.log("cwdDirPath", cwdDirPath) // eodoes
console.log("dirPath", dirPath) // eodoes/scripts

process.chdir(path.join(dirPath, '../packages'))
const pcksDirPath = process.cwd() 
console.log("pcksDirPath", pcksDirPath) // eodoes\packages\eodoes\bin

modulePaths = module.paths
module.paths = [pcksDirPath, ...module.paths]
console.log("modulePaths", modulePaths)

if (existsSync(`${__dirname}/../packages/eodoes/bin/eodo.js`)) {
  require(`${__dirname}/../packages/eodoes/bin/eodo.js`)
} else {
  // eslint-disable-next-line no-console
  console.log(`eodo not found`)
}

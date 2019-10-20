#!/usr/bin/env node

const {existsSync} = require(`fs`)

if (existsSync(`${__dirname}/../packages/eodoes/bin/eodo.js`)) {
  require(`${__dirname}/../packages/eodoes/bin/eodo.js`)
} else {
  // eslint-disable-next-line no-console
  console.log(`eodo not found`)
}

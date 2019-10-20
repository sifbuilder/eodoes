/**********************
   *    event-eogit
   */

const path = require('path')
const fsExtra = require('fs-extra')

const {report} = require('eodoes-muons')
const {exec} = require('eodoes-muons')
const {filer} = require('eodoes-muons')

const {resolvepath, fileUpdSync, fileExistsSync} = filer
const { merger } = require('eodoes-muons')

// packageMerge

const packageMerge = async (data, __ = {}) => {
  let {cwd, npm = {}} = data
  let packageObj = {}

  let filename = 'package.json'
  let file = resolvepath(cwd, filename)
  if (fsExtra.existsSync(file)) {
    try {
      packageObj = fsExtra.readJsonSync(file)
    } catch (e) {
      packageObj = {} // if empty
    }
  }

  packageObj = merger.mergeDeep({}, packageObj, npm)
  let text = JSON.stringify(packageObj, null, 2)

  report.debug(`event.eogit:: fileUpdSync ${filename}`, __)
  fileUpdSync({cwd, file: filename, text})
}

// isAlreadyGitRepository

const isAlreadyGitRepository = async (data, __) => {
  let {eoroot} = __

  let cwd = eoroot
  let cmd = `git rev-parse --is-inside-work-tree`
  report.verb(`cwd: ${cwd}`, __)
  let res
  try {
    report.debug(`event.eogit: exec ${cmd}`, __)
    res = await exec({
      cmd: cmd,
      options: {
        cwd,
      },
    }, __)
  } catch (err) {
    res = false
  }
  report.verb(`res: ${res}`, __)
  return res
}

// Initialize newly cloned directory as a git repo

const gitInit = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot

  let isGit = await isAlreadyGitRepository(data, __)
  if (!isGit) {
    report.debug(`event.eogit:: git init`, __)
    await exec({
      cmd: `git init`,
      options: {
        cwd,
      },
    }, __)
  } else {
    report.verb(`already a git repo`, __)
  }
}

// Create a .gitignore file if it is missing in the new directory

const createGitIgnoreIfAbsent = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot

  if (fileExistsSync(path.join(cwd, `.gitignore`))) {
    return
  }
  let filepath = path.join(cwd, `.gitignore`)
  report.debug(`event.eogit:: writeFile ${filepath}`, __)
  await fsExtra.writeFile(
    filepath,
    `.cache\nnode_modules\npublic\n.netlify\n` // _e_
  )
}

// Create an initial git commit in the new directory

const createGitCommit = async (data, __) => {
  let {eoroot} = __
  let {gitmsg} = __.eonopts
  let cwd = eoroot
  let msg = gitmsg

  report.debug(`event.eogit:: git add -A`, __)
  await exec({
    cmd: `git add -A`,
    options: {
      cwd,
    },
  }, __)
  report.debug(`event.eogit:: git add -m ${msg}`, __)
  await exec({
    cmd: `git commit -m ${msg}`,
    options: {
      cwd, //  { stdio: ['ignore', 'pipe', 'inherit'] }
    },
  }, __)
}

// Git build remote

const gitBuildRemote = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot

  let {site, user, type = 'git'} = data
  report.verb(`Build remote ${cwd}`, __)
  return `${type}@github.com:${user}/${site}.git`
}

// eogit

const eogit = async (data, __) => {
  let {eoroot} = __
  let {eon, author, gitmsg = 'eoninit'} = __.eonopts
  let {type} = data

  report.trace({eoroot, eon, author, gitmsg}, __)

  try {
    await gitInit({}, __)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`failed gitInit in ${eoroot}, ${e}, check if already git`)
  }

  await createGitIgnoreIfAbsent(data, __)

  let remote = await gitBuildRemote({type}, __)
  await packageMerge({
    cwd: eoroot,
    npm: {
      'repository': {
        'type': `${type}`,
        'url': `${remote}`,
      } },
  }, __)

  try {
    await createGitCommit({}, __)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`failed to create git commit, ${e}, check if nothing to commit, working directory clear`)
  }
}

module.exports = { eogit }

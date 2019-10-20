/**********************
   *    event-eohub
   */

const {report} = require('eodoes-muons')
const {exec} = require('eodoes-muons')

// Git build remote

const gitBuildRemote = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot

  let {eon, author} = __.eonopts
  let user = author
  let site = eon
  let type = 'git'

  report.verb(`Build remote ${cwd}`, __)
  return `${type}@github.com:${user}/${site}.git`
}

// Git set remote

const gitSetRemote = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot

  let remote = await gitBuildRemote(data, __)
  report.debug(`event.eohub:: exec git remote`, __)
  await exec({
    cmd: `git remote`,
    options: {
      cwd,
    },
  }, __)
  try {
    report.debug(`event.eohub:: exec git remote rm origin`, __)
    await exec({
      cmd: `git remote rm origin`,
      options: {
        cwd,
      },
    }, __)
  } catch (e) {
    console.log(`${e}`) // eslint-disable-line no-console
  }
  report.debug(`event.eohub:: exec git remote add origin ${remote}`, __)
  await exec({
    cmd: `git remote add origin ${remote}`,
    options: {
      cwd,
    },
  }, __)
}

// Git create remote

const gitCreateRemote = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot

  let {eon, author, pwdgit} = __.eonopts
  let user = author
  let site = eon

  // eslint-disable-next-line no-useless-escape
  let cmd = `curl -i -H "Content-Type: application/json" -u ${user}:${pwdgit} https://api.github.com/user/repos -d {\"name\":\"${site}\"}`
  try {
    report.debug(`event.eohub:: exec ${cmd}`, __)
    await exec({cmd, options: {cwd } }, __)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`create remote repo with curl failed ${e}`)
  }
}

// Git push

const gitPush = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot

  let cmd = `git push -f origin master`
  try {
    report.debug(`event.eohub:: ${cmd}`, __)
    await exec({cmd, options: {cwd } }, __)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`git push failed ${e}`)
  }
}

// Git status

const gitStatus = async (data, __) => {
  let {eoroot} = __
  let cwd = eoroot

  let cmd = `git status`
  try {
    report.debug(`event.eohub:: ${cmd}`, __)
    await exec({cmd, options: {cwd } }, __)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`git status failed ${e}`)
  }
}

/**********************
  * eohub
  */
const eohub = async (data, __) => {
  let {eoroot} = __
  let {eon, author, pwdgit} = __.eonopts

  report.trace({eoroot, eon, author, pwdgit}, __)

  await gitSetRemote({cwd: eoroot, site: eon, user: author}, __)
  await gitCreateRemote({cwd: eoroot, site: eon, user: author, pwdgit}, __)
  await gitPush({cwd: eoroot}, __)
  await gitStatus({cwd: eoroot}, __)
}

module.exports = { eohub }

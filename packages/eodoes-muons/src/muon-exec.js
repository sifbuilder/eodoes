/**********************
  *    eodoes-muons/muon-exec
  */
const exec = async (data, __) => {
  // https://www.npmjs.com/package/execa/v/0.6.2
  const execa = require(`execa`)
  const {report} = require('eodoes-muons')

  let {cmd, options = {}} = data
  report.trace({cmd}, __)

  const [file, ...args] = cmd.split(/\s+/)

  // https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
  // child_process.spawn(command[, args][, options])

  // cwd <string> Current working directory of the child process.
  // env <Object> Environment key-value pairs.
  // argv0 <string> Explicitly set the value of argv[0] sent to the child process. This will be set to command if not specified.
  // stdio <Array> | <string> Child's stdio configuration (see options.stdio).
  // detached <boolean> Prepare child to run independently of its parent process. Specific behavior depends on the platform, see options.detached).
  // uid <number> Sets the user identity of the process (see setuid(2)).
  // gid <number> Sets the group identity of the process (see setgid(2)).
  // shell <boolean> | <string> If true, runs command inside of a shell. Uses '/bin/sh' on UNIX, and process.env.ComSpec on Windows. A different shell can be specified as a string. See Shell Requirements and Default Windows Shell. Default: false (no shell).
  // windowsVerbatimArguments <boolean> No quoting or escaping of arguments is done on Windows. Ignored on Unix. This is set to true automatically when shell is specified and is CMD. Default: false.
  // windowsHide <boolean> Hide the subprocess console window that would normally be created on Windows systems. Default: false.

  let res

  if (file) {
    let execopts = Object.assign({},
      {
        // stdio: `inherit`,
        // preferLocal: false,
      },
      options
    )

    options = execopts
    report.verb({file, args, options}, __)

    /* eslint-disable no-console   */
    try {
      res = await execa(file, args, options) // exec file args options
      let {nomsg, noout, noerr} = __.eonopts
      if (!nomsg) {
        if (res.message !== null && res.message !== undefined) console.log(res.message)
      }
      if (!noout) {
        if (res.stdout !== null && res.stdout !== undefined) console.log(res.stdout)
      }
      if (!noerr) {
        if (res.stderr !== null && res.stderr !== undefined) console.log(res.stderr)
      }
    } catch (e) {
      console.log(`error in exec ${file} ${args} !!!!! ${e}`)
    }

    // https://www.npmjs.com/package/execa
    // Cancelling a spawned process
    if (!file) { // don't do until detached is clear
      const subprocess = execa('node') // eg. pid: 6312,
      setTimeout(() => {
        subprocess.cancel()
      }, 8000)
      try {
        await subprocess
      } catch (error) {
        console.log(subprocess.killed) // true
        console.log(error.isCanceled) // true
      }
    }
  } else {
    report.trace({file, args, options}, __)
  }

  /* eslint-enable no-console   */
  report.trace({res}, __)
  return res
}

module.exports = { exec }

/**********************
  *    eodoes-muons/muon-wstree
  */
const wstree = (data, __) => {
  let useWorkspaces = __.eonopts['useWorkspaces']
  let packages = ``, starter = ``
  if (useWorkspaces) {
    packages = `packages`
    starter = `starter` // name of main package
  }
  let { themes = [] } = __
  let { workspaces } = __
  workspaces = workspaces || [starter, ...themes] // default to starter/themes chart

  let packagesPath = useWorkspaces ? `${packages}/` : `./`
  let starterPath = useWorkspaces ? `${packagesPath}${starter}/` : `./`
  let themePaths = themes.map(theme => useWorkspaces ? `${packagesPath}${theme}/` : `./`)

  return {useWorkspaces, packages, workspaces, starter, themes, packagesPath, starterPath, themePaths}
}

module.exports = { wstree }

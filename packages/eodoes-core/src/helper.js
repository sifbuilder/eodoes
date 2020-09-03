/**********************
 *    eodoes-core/helpmsg
 */
let helpmsg = ` 
  apply eodo events to eosite in eodir

  usage: node eonode {{eodo}} {{eodir}} [...events] [...eotags]

    > node ./scripts/run {{eodo}} {{eodir}} eoparse --doc --view -e {{eon}} -a {{user}} 

    eg:  > node ./scripts/run eodoes-eodo-eorial ../eosites eoparse -a sifbuilder --doc -view    

    eodo: path to eodoes script to get eon from
    eodir: path to dir to place eon into

    eotags (--flag value):
      --author: author of git repo
      --eon: name of the repo and site to create
      --doc: show doc messages
      --debug: show debug messages
      --trace: show trace messages
      --view: view eolife scenes on puppeteer

    events: 
      eoparse: create {{eon}} in {{eodir}}
    `

/**********************
  * eohelp
  */
async function eohelp (data, __) {
  // eslint-disable-next-line no-console
  console.log(`    
  helper.eodoes:
    ${__.helpmsg}
  `)
}

module.exports = { eohelp, helpmsg }

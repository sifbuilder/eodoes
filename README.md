# eodo

eodo is an implementation of the stepify paradigm
    it accompanies textually and graphically the declarative generation of computational artifacts

    eodo from to what how
        eg: node eodo ./eodos/eorial . eoparse --doc

Immediate objectives are:

- automatic creation and deployment of the eons site
- automatic creation and deployment of gatsby eosites to netlify
- tender accompaniment of jason's tutorials

Create new apps using
[eodo eodoes](https://github.com/sifbuilder/eodo/tree/master/eodoes)

eodo creates the package.json and the file system that may include starter and packages

## How to use

eodo is available via [github](https://www.github.com/) and may be used by
`git clone git@github.com:sifbuilder/eodoes.git`
`cd eodo`
`npm install`
`node eodo` to list in-module eodoes

eodo is available via [npm](https://www.npmjs.com/) and may be installed globally by running 
`npm install -g eodo` to use it locally.
`eodo` for a list of in-module eodoes
`eodo <eodir> <eodoes>` for full help on the specific eodoes

#### Additional configuration

Documentary steps of site creation may go along with views of the site as it evolves
`npm install puppeteer` to install puppeteer if not yet installed

## Events

|    Tag      | Description                                       | Default |
| :---------: | ------------------------------------------------- | :-----: |
| `eoclear`   | remove definition files                           |    ``   |
| `eodev`     | launch develop server                             |    ``   |
| `eoparse`   | process eoparces and launch microevents           |    ``   |
| `eogit`     | create git repo                                   |    ``   |
| `eohub`     | git push                                          |    ``   |
| `publish`   | publish eon site to npm                           |    ``   |
| `uncode`    | remove packages                                   |    ``   |
| `unspace`   | remove eon container, with --doit                 |    ``   |


### `eoparse`

`eodo where eodoes eoparse`

will install the package.json and file system as defined in the eodoes' eoparse__parcel
to --view the process, puppeteer must be available and there must be a dev server running

### `eoyarn`

`eodo where eodoes eoyarn` to install parceled site

eohub relies on yarn that must be locally in the path

### `eogit`

`eodo where eodoes eogit` to create local git repo

eohub relies on git that must be locally in the path

### `eohub`

`eodo where eodoes eohub` to push repot to github

eohub relies on curl that must be locally in the path

### `eodev`

`eodo where eodoes develop` to start the development server in the `where` location

### `netify`

`eodo where eodoes netify` to deliver the site to netlify

### `publish`

`eodo where eodoes publish` to publish the package to npm

## Flags

|     Flag     | Description                            | Default      |
| :---------:  | -------------------------------------- | :----------: |
| `--author`   | package.author and git push user       | `thisauthor` |
| `--gitmsg`   | Message into git commit                | `init_git`   |
| `--descr`    | Set site description                   | `thisdescr`  |
| `--eon`      | Nane of the site being created         | `thiseon`    |
| `--folder`   | Alternative to eodir par               |     ``       |
| `--microkey` | Filter microevent                      |     ``       |
| `--license`  | License to go into package.license     | `GPL-3.0`    |
| `--email`    | Email                                  | `none`       |
| `--version`  | Version in package.version             | `0.0.1`      |
| `--eodoes`   | Alternative to eodoes par              | `thiseodoes` |

## Tags

|    Tag       | Description                                      | Default |
| :----------: | ------------------------------------------------ | :-----: |
| `--debug`    | Show debug messages in eodo and lib muons        | `false` |
| `--trace`    | Trace parameters in eodo and lib muons           | `false` |
| `--doc`      | Show doc messages in eoparse and life events     | `false` |
| `--view`     | View life events in brower from develop server   | `false` |
|              | Requires puppeteer installed and server running  |    ``   |
| `--onepage`  | Show view in same plage                          | `false` |

## Pars

|    Par    | Description                                         | Default |
| :-------: | --------------------------------------------------- | :-----: |
| `eodir`   | First unhyphened param passed to eodo               |    ``   |
| `eodoes`  | Second unhyphened param passed to eodo              |    ``   |

## Microevents

|    Tag       | Description                                      |         |
| :---------:  | ------------------------------------------------ | :-----: |
| `__eobreak`  | interrupt eoparcel processing                    |    ``   |
| `__eoconfig` | build gatsbz config                              |    ``   |
| `__eodelay`  | delay event                                      |    ``   |
| `__eodoc`    | show doc messages                                |    ``   |
| `__eorun`    | excec local command (tbd)                        |    ``   |
| `__eofetch`  | fetch item from cdn (tbd)                        |    ``   |
| `__eofiles`  | copy or create files                             |    ``   |
| `__eofolders`| copy or create files                             |    ``   |
| `__eoignore` | ignore microevent                                |    ``   |
| `__eolog`    | trace parcel                                     |    ``   |
| `__eounzip`  | unzip tar                                        |    ``   |
| `__eoview`   | show image in browser with puppeteer             |    ``   |

## Examples

From the eodo folder, eodo will create the eodir ../eosites/folder
1. Inside the eodir, it will create package.json, gatsby.config, gatsby.node and src  
2. Will install the dependencies as per package.json 
3. Will create the local git repo 
4. Will create the orine repo in github 
5. Will launch the develop server 
6. Will publish the site to netlify 

```
node ./scripts/run eodoes-eodo-eorial ../eosites --eon eorial eoparse --doc 
```

Installing eodo locally 
`node ./scripts/run eodoes-eodo-eorial ../eosites --eon eorial eoparse --doc --trace`

Specifying an eodoes as an uri 
`npx eodoes https://raw.githubusercontent.com/sifbuilder/eodoes/master/packages/eodoes-eodo-eocore/eorial.js ../eosites --eon eorial eoparse --doc --trace`

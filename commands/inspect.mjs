import util from 'util'

import devConfig from '../webpack/dev.mjs'
import buildConfig from '../webpack/build.mjs'
import buildDevConfig from '../webpack/static.mjs'

const command = process.argv[2]
const context = process.cwd()

let config

switch (command) {
  case 'dev':
    config = devConfig
    break
  case 'build':
    config = buildConfig
    break
  case 'static':
    config = buildDevConfig
    break
}

config = config({ context }).toConfig()

config = util.inspect(config, {
  colors: true,
  depth: null
})

console.log(config)

import util from 'util'

import devConfig from '../webpack/dev.mjs'
import buildConfig from '../webpack/build.mjs'
import docsConfig from '../webpack/docs.mjs'

export default function ({ context, command }) {
  let config

  if (command === 'dev') {
    config = devConfig
  }

  if (command === 'build') {
    config = buildConfig
  }

  if (command === 'docs') {
    config = docsConfig
  }

  config = config({ context }).toConfig()

  config = util.inspect(config, {
    colors: true,
    depth: null
  })

  console.log(config)
}
